"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Loader2 } from "lucide-react";
import { QuestionCard } from "@/components/QuestionCard";
import { createClient } from "@/lib/supabase/client";
import type { Question } from "@/types";
import Link from "next/link";

export default function HomePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("questions")
        .select(`
          *,
          user:users(*),
          discipline:disciplines(*)
        `)
      .order("created_at", { ascending: false })
      .limit(20);

      if (data) {
        setQuestions(data);
      }
    } catch (err) {
      console.error("Erro ao buscar perguntas:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <Tabs defaultValue="todos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="todos" className="data-[state=active]:bg-white">
                Todos
              </TabsTrigger>
              <TabsTrigger value="estudando" className="data-[state=active]:bg-white">
                Estudando
              </TabsTrigger>
              <TabsTrigger value="salvos" className="data-[state=active]:bg-white">
                Salvos
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="ghost" size="icon" className="ml-2">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#2E9E5A]" />
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Nenhuma pergunta encontrada.</p>
            <p className="text-sm mt-2">Seja o primeiro a fazer uma pergunta!</p>
          </div>
        ) : (
          questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        )}
      </div>

      <Link
        href="/questions/create"
        className="fixed bottom-20 right-4 z-50"
      >
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-[#2E9E5A] hover:bg-[#1E7A42] shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </Link>
    </div>
  );
}
