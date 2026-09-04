"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, CheckCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Answer } from "@/types";

interface AnswerCardProps {
  answer: Answer;
  onLike?: () => void;
  onBookmark?: () => void;
  onMarkBest?: () => void;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export function AnswerCard({
  answer,
  onLike,
  onBookmark,
  onMarkBest,
  isLiked = false,
  isBookmarked = false,
}: AnswerCardProps) {
  return (
    <Card className="p-4 bg-white shadow-sm">
      <p className="text-sm text-gray-800 whitespace-pre-wrap">{answer.content}</p>

      {answer.pdf_url && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
          <FileText className="w-4 h-4" />
          <span>PDF anexado</span>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onLike}
          className={cn(
            "h-8 px-3 rounded-full",
            isLiked && "text-red-500"
          )}
        >
          <Heart
            className={cn("w-4 h-4 mr-1", isLiked && "fill-current")}
          />
          {answer.likes_count > 0 && answer.likes_count}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onBookmark}
          className={cn(
            "h-8 px-3 rounded-full",
            isBookmarked && "text-yellow-500"
          )}
        >
          <Bookmark
            className={cn("w-4 h-4", isBookmarked && "fill-current")}
          />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onMarkBest}
          className={cn(
            "h-8 px-3 rounded-full",
            answer.is_best && "text-[#2E9E5A]"
          )}
        >
          <CheckCircle
            className={cn("w-5 h-5", answer.is_best && "fill-current")}
          />
        </Button>
      </div>
    </Card>
  );
}
