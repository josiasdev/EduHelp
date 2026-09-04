-- ============================================
-- EduHelp - Schema do Banco de Dados
-- ============================================

-- 1. Tabela de perfis (estende auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  phone TEXT,
  avatar_url TEXT,
  university TEXT,
  semester TEXT,
  course TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Perfis são públicos para todos os usuários"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem inserir seu próprio perfil"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Trigger para criar perfil automaticamente após signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 2. Tabela de disciplinas
-- ============================================
CREATE TABLE disciplines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE disciplines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Disciplinas são públicas"
  ON disciplines FOR SELECT
  USING (true);

-- Inserir disciplinas padrão
INSERT INTO disciplines (name, description) VALUES
  ('Fundamentos da programação', 'Conceitos básicos de programação e lógica'),
  ('Programação Orientada a Objetos', 'POO - Classes, objetos, herança, polimorfismo'),
  ('Linguagens de Programação', 'Tipagem, compiladores e interpretes'),
  ('Estruturas de Dados', 'Listas, árvores, grafos e algoritmos'),
  ('Banco de Dados', 'SQL, NoSQL e modelagem de dados'),
  ('Redes de Computadores', 'Protocolos, topologias e segurança de redes'),
  ('Engenharia de Software', 'Metodologias ágeis e ciclo de vida do software'),
  ('Inteligência Artificial', 'Machine Learning, Deep Learning e IA'),
  ('Sistemas Operacionais', 'Processos, memória e gerenciamento de recursos'),
  ('Probabilidade e Estatística', 'Probabilidade, estatística e análise de dados');


-- 3. Tabela de perguntas
-- ============================================
CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  discipline_id UUID REFERENCES disciplines(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  privacy TEXT CHECK (privacy IN ('public', 'private')) DEFAULT 'public',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perguntas públicas são visíveis para todos"
  ON questions FOR SELECT
  USING (privacy = 'public' OR user_id = auth.uid());

CREATE POLICY "Usuários podem criar perguntas"
  ON questions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias perguntas"
  ON questions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias perguntas"
  ON questions FOR DELETE
  USING (auth.uid() = user_id);


-- 4. Tabela de respostas
-- ============================================
CREATE TABLE answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  pdf_url TEXT,
  is_best BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Respostas são visíveis para todos"
  ON answers FOR SELECT
  USING (true);

CREATE POLICY "Usuários podem criar respostas"
  ON answers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias respostas"
  ON answers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias respostas"
  ON answers FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_questions_updated_at
  BEFORE UPDATE ON questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_answers_updated_at
  BEFORE UPDATE ON answers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- 5. Tabela de amigos
-- ============================================
CREATE TABLE friends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  friend_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'accepted')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

ALTER TABLE friends ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver suas amizades"
  ON friends FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Usuários podem enviar solicitações de amizade"
  ON friends FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar solicitações de amizade"
  ON friends FOR UPDATE
  USING (auth.uid() = friend_id);

CREATE POLICY "Usuários podem remover amizades"
  ON friends FOR DELETE
  USING (auth.uid() = user_id OR auth.uid() = friend_id);


-- 6. Tabela de mensagens
-- ============================================
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver suas mensagens"
  ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Usuários podem enviar mensagens"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Usuários podem marcar mensagens como lidas"
  ON messages FOR UPDATE
  USING (auth.uid() = receiver_id);


-- 7. Tabela de notificações
-- ============================================
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT CHECK (type IN ('answer', 'friend_request', 'friend_accept', 'message', 'like', 'favorite')) NOT NULL,
  reference_id UUID NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver suas notificações"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Sistema pode criar notificações"
  ON notifications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Usuários podem marcar notificações como lidas"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas notificações"
  ON notifications FOR DELETE
  USING (auth.uid() = user_id);


-- 8. Bucket para uploads de PDF
-- ============================================
-- Executar no Supabase Dashboard > Storage > New Bucket
-- Nome: answers
-- Tamanho máximo: 10MB
-- Tipos permitidos: application/pdf


-- 9. Índices para performance
-- ============================================
CREATE INDEX idx_questions_user_id ON questions(user_id);
CREATE INDEX idx_questions_discipline_id ON questions(discipline_id);
CREATE INDEX idx_questions_created_at ON questions(created_at DESC);
CREATE INDEX idx_answers_question_id ON answers(question_id);
CREATE INDEX idx_answers_user_id ON answers(user_id);
CREATE INDEX idx_friends_user_id ON friends(user_id);
CREATE INDEX idx_friends_friend_id ON friends(friend_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
