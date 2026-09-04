"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  UserCog,
  KeyRound,
  Shield,
  Eye,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [anonQuestions, setAnonQuestions] = useState(false);
  const [anonAnswers, setAnonAnswers] = useState(false);
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Configurações</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Conta */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <UserCog className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-bold">Conta</h2>
          </div>

          <Card className="bg-white divide-y divide-gray-100">
            <Link
              href="/profile/settings/edit-profile"
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm">Editar perfil</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link
              href="/profile/settings/change-password"
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm">Alterar a senha</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <button className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors w-full text-left">
              <span className="text-sm">Google</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <div className="flex items-center justify-between p-4">
              <span className="text-sm">Verificação de duas etapas</span>
              <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
            </div>
          </Card>
        </div>

        {/* Privacidade */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-bold">Privacidade</h2>
          </div>

          <Card className="bg-white divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4">
              <span className="text-sm">Minhas perguntas</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Anonimato</span>
                <Switch checked={anonQuestions} onCheckedChange={setAnonQuestions} />
              </div>
            </div>

            <div className="flex items-center justify-between p-4">
              <span className="text-sm">Minhas respostas</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Anonimato</span>
                <Switch checked={anonAnswers} onCheckedChange={setAnonAnswers} />
              </div>
            </div>
          </Card>
        </div>

        {/* Sair */}
        <div className="pt-4">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-red-500 hover:bg-red-50 h-14"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Sair</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
