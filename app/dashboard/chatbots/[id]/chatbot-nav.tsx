"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Settings,
  MessageSquare,
  BookOpen,
  Palette,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatbotNav({ id }: { id: string }) {
  const pathname = usePathname();
  const baseUrl = `/dashboard/chatbots/${id}`;

  const tabs = [
    {
      label: "Settings",
      href: baseUrl,
      icon: Settings,
      active: pathname === baseUrl,
    },
    {
      label: "Customize",
      href: `${baseUrl}/customize`,
      icon: Palette,
      active: pathname === `${baseUrl}/customize`,
    },
    {
      label: "Knowledge Base",
      href: `${baseUrl}/knowledge`,
      icon: BookOpen,
      active: pathname === `${baseUrl}/knowledge`,
    },
    {
      label: "Conversations",
      href: `${baseUrl}/conversations`,
      icon: MessageSquare,
      active: pathname === `${baseUrl}/conversations`,
    },
  ];

  return (
    <div className="border-b bg-background px-4 py-3 flex items-center gap-4">
      <Link href="/dashboard/chatbots">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </Link>
      <div className="h-6 w-px bg-border" />
      <nav className="flex items-center space-x-4">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              tab.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            <tab.icon className="mr-2 h-4 w-4" />
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
