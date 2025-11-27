"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, MessageSquare, Settings } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Chatbot {
  id: string;
  name: string;
  createdAt: string;
  isActive: boolean;
}

export default function ChatbotsPage() {
  const router = useRouter();
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newChatbotName, setNewChatbotName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchChatbots();
  }, []);

  const fetchChatbots = async () => {
    try {
      const res = await fetch("/api/chatbots");
      const data = await res.json();
      setChatbots(data);
    } catch (error) {
      toast.error("Failed to fetch chatbots");
    } finally {
      setIsLoading(false);
    }
  };

  const createChatbot = async () => {
    if (!newChatbotName.trim()) return;

    setIsCreating(true);
    try {
      const res = await fetch("/api/chatbots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newChatbotName }),
      });

      if (!res.ok) throw new Error("Failed to create chatbot");

      const chatbot = await res.json();
      setChatbots([chatbot, ...chatbots]);
      setNewChatbotName("");
      setIsDialogOpen(false);
      toast.success("Chatbot created");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Chatbots</h2>
          <p className="text-muted-foreground">
            Manage your AI assistants here.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Chatbot
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Chatbot</DialogTitle>
              <DialogDescription>
                Give your new AI assistant a name.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newChatbotName}
                  onChange={(e) => setNewChatbotName(e.target.value)}
                  placeholder="My Support Bot"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={createChatbot} disabled={isCreating}>
                {isCreating ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-24 bg-muted/50" />
              <CardContent className="h-32" />
            </Card>
          ))}
        </div>
      ) : chatbots.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-lg border border-dashed">
          <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No chatbots yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first chatbot to get started.
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>Create Chatbot</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatbots.map((chatbot) => (
            <Card key={chatbot.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  {chatbot.name}
                </CardTitle>
                <div
                  className={`w-3 h-3 rounded-full ${
                    chatbot.isActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Created on {new Date(chatbot.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/dashboard/chatbots/${chatbot.id}`}>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" /> Manage
                  </Button>
                </Link>
                <Link href={`/dashboard/chatbots/${chatbot.id}/conversations`}>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" /> Chats
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
