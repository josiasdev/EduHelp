"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simular envio de email de recuperação
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#2E9E5A] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/login">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-white">Esqueceu a senha</h1>
        </div>

        <Card className="p-6 bg-white/95 backdrop-blur">
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              Digite seu email para receber um link de recuperação de senha.
            </p>

            <div className="relative">
              <Input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 rounded-full bg-gray-100 border-0"
                required
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-[#7EC8C8] hover:bg-[#6AB8B8] text-white font-semibold"
              disabled={loading || !email.trim()}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Enviar link de recuperação"
              )}
            </Button>
          </form>
        </Card>

        <p className="text-white text-center text-sm">
          Lembrou a senha?{" "}
          <Link href="/login" className="font-bold hover:underline">
            Voltar para o login
          </Link>
        </p>
      </div>
    </div>
  );
}
