"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Question } from "@/types";

export default function AnswerQuestionPage() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [content, setContent] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const supabase = useMemo(() => createClient(), []);
  const questionId = params.id as string;

  useEffect(() => {
    fetchQuestion();
  }, [questionId]);

  const fetchQuestion = async () => {
    const { data } = await supabase
      .from("questions")
      .select(`
        *,
        discipline:disciplines(*)
      `)
      .eq("id", questionId)
      .single();

    if (data) {
      setQuestion(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    let pdfUrl = null;

    if (pdfFile) {
      const fileName = `${user.id}/${Date.now()}_${pdfFile.name}`;
      const { data: uploadData } = await supabase.storage
        .from("answers")
        .upload(fileName, pdfFile);

      if (uploadData) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("answers").getPublicUrl(uploadData.path);
        pdfUrl = publicUrl;
      }
    }

    const { error } = await supabase.from("answers").insert({
      question_id: questionId,
      user_id: user.id,
      content: content.trim(),
      pdf_url: pdfUrl,
    });

    if (!error) {
      router.push(`/questions/${questionId}`);
      router.refresh();
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#2E9E5A]" />
      </div>
    );
  }

  const disciplineName = question?.discipline?.name || "Disciplina";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Responder</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {question && (
          <Card className="p-4 bg-white shadow-sm">
            <div className="flex items-start gap-2 mb-2">
              <span className="font-bold text-gray-800">{disciplineName}:</span>
            </div>
            <p className="text-gray-800">{question.content}</p>
          </Card>
        )}

        <Card className="p-4 bg-white shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Textarea
                placeholder="Escreva sua resposta aqui..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] rounded-xl border-gray-200"
                required
              />
            </div>

            <div>
              <label className="flex items-center justify-center gap-2 w-full h-12 rounded-full border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#2E9E5A] transition-colors">
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {pdfFile ? pdfFile.name : "Anexar PDF (opcional)"}
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-[#7EC8C8] hover:bg-[#6AB8B8] text-white font-semibold"
              disabled={submitting || !content.trim()}
            >
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Enviar Resposta"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
