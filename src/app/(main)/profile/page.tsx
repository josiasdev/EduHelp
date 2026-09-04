"use client";

import { User, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User as UserType } from "@/types";

export default function ProfilePage() {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (authUser) {
      setUser({
        id: authUser.id,
        name: authUser.user_metadata?.name || "Usuário",
        email: authUser.email || "",
        phone: authUser.user_metadata?.phone,
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const userInitials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold">Meu Perfil</h1>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="p-6 bg-white text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarFallback className="bg-gray-200 text-gray-600 text-xl">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">{user?.name || "Usuário"}</h2>
          <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
        </Card>

        <Tabs defaultValue="perguntas" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="perguntas" className="data-[state=active]:bg-white text-xs">
              Minhas Perguntas
            </TabsTrigger>
            <TabsTrigger value="amigos" className="data-[state=active]:bg-white text-xs">
              Amigos
            </TabsTrigger>
            <TabsTrigger value="respostas" className="data-[state=active]:bg-white text-xs">
              Minhas Respostas
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          variant="outline"
          className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          Sair da conta
        </Button>
      </div>
    </div>
  );
}
