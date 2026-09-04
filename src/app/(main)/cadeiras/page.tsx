"use client";

import { BookOpen } from "lucide-react";

export default function CadeirasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-center p-4">
          <h1 className="text-lg font-semibold">Cadeiras</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <BookOpen className="w-12 h-12 mb-4" />
          <p>Nenhuma cadeira encontrada</p>
          <p className="text-sm mt-2">Em breve você verá suas disciplinas aqui!</p>
        </div>
      </div>
    </div>
  );
}
