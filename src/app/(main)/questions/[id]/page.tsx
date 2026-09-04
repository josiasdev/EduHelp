"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2, MessageSquare } from "lucide-react";
import { AnswerCard } from "@/components/AnswerCard";
import { createClient } from "@/lib/supabase/client";
import type { Question, Answer } from "@/types";
import Link from "next/link";

export default function QuestionDetailPage() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const questionId = params.id as string;

  useEffect(() => {
    fetchQuestionAndAnswers();
  }, [questionId]);

  const fetchQuestionAndAnswers = async () => {
    try {
      const supabase = createClient();
      const { data: questionData } = await supabase
        .from("questions")
        .select(`
          *,
          user:users(*),
          discipline:disciplines(*)
        `)
        .eq("id", questionId)
        .single();

      if (questionData) {
        setQuestion(questionData);
      }

      const { data: answersData } = await supabase
        .from("answers")
        .select(`
          *,
          user:users(*)
        `)
        .eq("question_id", questionId)
        .order("is_best", { ascending: false })
        .order("created_at", { ascending: false });

      if (answersData) {
        setAnswers(answersData);
      }
    } catch (err) {
      console.error("Erro ao buscar pergunta:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (answerId: string) => {
    try {
      const supabase = createClient();
      const answer = answers.find((a) => a.id === answerId);
      if (!answer) return;

      await supabase
        .from("answers")
        .update({ likes_count: answer.likes_count + 1 })
        .eq("id", answerId);

      fetchQuestionAndAnswers();
    } catch (err) {
      console.error("Erro ao curtir:", err);
    }
  };

  const handleMarkBest = async (answerId: string) => {
    try {
      const supabase = createClient();
      await supabase
        .from("answers")
        .update({ is_best: true })
        .eq("id", answerId)
        .eq("question_id", questionId);

      fetchQuestionAndAnswers();
    } catch (err) {
      console.error("Erro ao marcar melhor resposta:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#2E9E5A]" />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-200">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Pergunta não encontrada</h1>
        </div>
      </div>
    );
  }

  const disciplineName = question.discipline?.name || "Disciplina";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Pergunta</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-start gap-2 mb-2">
            <span className="font-bold text-gray-800">{disciplineName}:</span>
          </div>
          <p className="text-gray-800">{question.content}</p>
        </Card>

        <div className="space-y-3">
          {answers.map((answer) => (
            <AnswerCard
              key={answer.id}
              answer={answer}
              onLike={() => handleLike(answer.id)}
              onMarkBest={() => handleMarkBest(answer.id)}
            />
          ))}

          {answers.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Nenhuma resposta ainda. Seja o primeiro a responder!
            </p>
          )}
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <Link href={`/questions/${questionId}/answer`}>
          <Button className="w-full h-12 rounded-full bg-[#7EC8C8] hover:bg-[#6AB8B8] text-white font-semibold">
            <MessageSquare className="w-5 h-5 mr-2" />
            Responder
          </Button>
        </Link>
      </div>
    </div>
  );
}
