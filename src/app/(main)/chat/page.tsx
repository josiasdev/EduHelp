"use client";

import { MessageCircle } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-center p-4">
          <h1 className="text-lg font-semibold">Mensagens</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <MessageCircle className="w-12 h-12 mb-4" />
          <p>Nenhuma mensagem</p>
          <p className="text-sm mt-2">Inicie uma conversa com seus colegas!</p>
        </div>
      </div>
    </div>
  );
}
