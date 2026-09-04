"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Eye } from "lucide-react";
import type { Question } from "@/types";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const disciplineName = question.discipline?.name || "Disciplina";
  const userInitials = question.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

  return (
    <Card className="p-4 bg-white shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={question.user?.avatar_url} />
          <AvatarFallback className="bg-gray-200 text-gray-600">
            {userInitials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="text-xs font-semibold bg-gray-100">
              {disciplineName}:
            </Badge>
          </div>
          <p className="text-sm text-gray-800 line-clamp-2">{question.content}</p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <Link href={`/questions/${question.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-[#7EC8C8] hover:bg-[#6AB8B8] text-white border-0"
          >
            <Eye className="w-4 h-4 mr-1" />
            Ver
          </Button>
        </Link>
        <Link href={`/questions/${question.id}/answer`}>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-[#7EC8C8] hover:bg-[#6AB8B8] text-white border-0"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Responder
          </Button>
        </Link>
      </div>
    </Card>
  );
}
