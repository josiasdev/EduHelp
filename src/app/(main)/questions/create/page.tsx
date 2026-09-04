"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Discipline } from "@/types";

export default function CreateQuestionPage() {
  const [content, setContent] = useState("");
  const [disciplineId, setDisciplineId] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "private">("public");
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDisciplines, setLoadingDisciplines] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchDisciplines();
  }, []);

  const fetchDisciplines = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("disciplines")
        .select("*")
        .order("name");

      if (data) {
        setDisciplines(data);
      }
    } catch (err) {
      console.error("Erro ao buscar disciplinas:", err);
    } finally {
      setLoadingDisciplines(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !disciplineId) return;

    setLoading(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { error } = await supabase.from("questions").insert({
        user_id: user.id,
        discipline_id: disciplineId,
        content: content.trim(),
        privacy,
      });

      if (!error) {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Erro ao criar pergunta:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Nova Pergunta</h1>
        </div>
      </div>

      <div className="p-4">
        <Card className="p-4 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Textarea
                placeholder="Faça a sua pergunta aqui"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] rounded-xl border-gray-200"
                required
              />
            </div>

            <div>
              <Select
                value={disciplineId}
                onValueChange={(value) => setDisciplineId(value ?? "")}
                disabled={loadingDisciplines}
              >
                <SelectTrigger className="h-12 rounded-full bg-gray-100 border-0">
                  <SelectValue
                    placeholder={
                      loadingDisciplines
                        ? "Carregando disciplinas..."
                        : "Disciplina"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {disciplines.map((discipline) => (
                    <SelectItem key={discipline.id} value={discipline.id}>
                      {discipline.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select
                value={privacy}
                onValueChange={(v) => setPrivacy((v as "public" | "private") ?? "public")}
              >
                <SelectTrigger className="h-12 rounded-full bg-gray-100 border-0">
                  <SelectValue placeholder="Privacidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Pública</SelectItem>
                  <SelectItem value="private">Privada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-[#7EC8C8] hover:bg-[#6AB8B8] text-white font-semibold"
              disabled={loading || !content.trim() || !disciplineId}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Adicionar"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
