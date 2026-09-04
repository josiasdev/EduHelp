"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bell, BookOpen, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/notifications", label: "Notificação", icon: Bell },
  { href: "/cadeiras", label: "Cadeiras", icon: BookOpen },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/profile", label: "Eu", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-full h-full",
                "text-xs font-medium transition-colors",
                isActive ? "text-black" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <item.icon
                className={cn("w-6 h-6", isActive && "fill-current")}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
