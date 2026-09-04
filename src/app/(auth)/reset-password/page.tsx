"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validSession, setValidSession] = useState<boolean | null>(null);
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setValidSession(!!session);
    };
    checkSession();
  }, [supabase]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  if (validSession === null) {
    return (
      <div className="min-h-screen bg-[#2E9E5A] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  if (!validSession) {
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
            <div className="flex flex-col items-center gap-4 py-4">
              <AlertCircle className="w-16 h-16 text-orange-500" />
              <p className="text-lg font-semibold text-gray-800 text-center">
                Link expirado ou inválido
              </p>
              <p className="text-sm text-gray-600 text-center">
                Solicite um novo link de recuperação de senha.
              </p>
              <Link href="/forgot-password">
                <Button className="mt-2 rounded-full bg-[#7EC8C8] hover:bg-[#6AB8B8] text-white">
                  Solicitar novo link
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
          {success ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <CheckCircle className="w-16 h-16 text-[#2E9E5A]" />
              <p className="text-lg font-semibold text-gray-800 text-center">
                Senha redefinida com sucesso!
              </p>
              <p className="text-sm text-gray-600 text-center">
                Redirecionando para o login...
              </p>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 text-center">
                Recupere a senha abaixo
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nova senha:
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nova senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-full bg-gray-100 border-0 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirme a nova senha:
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmar nova senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 rounded-full bg-gray-100 border-0 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full h-12 rounded-full bg-[#7EC8C8] hover:bg-[#6AB8B8] text-white font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Salvar"
                )}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
