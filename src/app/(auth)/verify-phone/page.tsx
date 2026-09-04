"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Phone, Loader2 } from "lucide-react";

export default function VerifyPhonePage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simular envio de código
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#2E9E5A] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
            <svg
              viewBox="0 0 64 64"
              className="w-16 h-16 fill-white"
              aria-hidden="true"
            >
              <path d="M32 8c-2 0-4 1-5 3l-8 20c-1 2 0 4 2 5l6 2v16c0 2 2 4 4 4h2c2 0 4-2 4-4V38l6-2c2-1 3-3 2-5L37 11c-1-2-3-3-5-3z" />
              <circle cx="32" cy="20" r="6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">EduHelp</h1>
        </div>

        <Card className="p-6 bg-white/95 backdrop-blur">
          <form onSubmit={handleSendCode} className="space-y-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Digite o seu telefone
              </h2>
            </div>

            <div className="relative">
              <Input
                type="tel"
                placeholder="(XX) XXXXX-XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 h-12 rounded-full bg-gray-100 border-0"
                required
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <p className="text-sm text-gray-600 text-center">
              Uma mensagem será enviada para o número fornecido com um código de
              confirmação.
            </p>

            <p className="text-sm text-gray-600 text-center">
              Clique no botão "Próximo" para prosseguir.
            </p>

            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-[#7EC8C8] hover:bg-[#6AB8B8] text-white font-semibold"
              disabled={loading || !phone.trim()}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Próximo"
              )}
            </Button>
          </form>
        </Card>

        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <svg
              viewBox="0 0 64 64"
              className="w-10 h-10 fill-white"
              aria-hidden="true"
            >
              <path d="M32 8c-2 0-4 1-5 3l-8 20c-1 2 0 4 2 5l6 2v16c0 2 2 4 4 4h2c2 0 4-2 4-4V38l6-2c2-1 3-3 2-5L37 11c-1-2-3-3-5-3z" />
              <circle cx="32" cy="20" r="6" />
            </svg>
          </div>
          <span className="text-white font-bold">EduHelp</span>
        </div>

        <p className="text-white text-center text-sm mt-4">
          <Link href="/login" className="font-bold hover:underline">
            Voltar para o login
          </Link>
        </p>
      </div>
    </div>
  );
}
