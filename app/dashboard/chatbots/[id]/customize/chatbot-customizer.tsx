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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Chatbot {
  id: string;
  name: string;
  welcomeMessage: string;
  primaryColor: string;
  position: "bottom-right" | "bottom-left";
}

export default function ChatbotCustomizer({ id }: { id: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const [previewOpen, setPreviewOpen] = useState(true);

  useEffect(() => {
    fetchChatbot();
  }, []);

  const fetchChatbot = async () => {
    try {
      const res = await fetch(`/api/chatbots/${id}`);
      if (!res.ok) throw new Error("Failed to fetch chatbot");
      const data = await res.json();
      setChatbot(data);
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatbot) return;
    setIsSaving(true);

    try {
      const res = await fetch(`/api/chatbots/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: chatbot.name,
          welcomeMessage: chatbot.welcomeMessage,
          primaryColor: chatbot.primaryColor,
          position: chatbot.position,
        }),
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success("Customization saved");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!chatbot) return <div>Chatbot not found</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-10rem)]">
      {/* Settings Form */}
      <div className="overflow-y-auto pr-4">
        <form onSubmit={onSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how your chatbot looks and behaves.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Bot Name</Label>
                <Input
                  id="name"
                  value={chatbot.name}
                  onChange={(e) =>
                    setChatbot({ ...chatbot, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Textarea
                  id="welcomeMessage"
                  value={chatbot.welcomeMessage}
                  onChange={(e) =>
                    setChatbot({ ...chatbot, welcomeMessage: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Brand Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={chatbot.primaryColor}
                    onChange={(e) =>
                      setChatbot({ ...chatbot, primaryColor: e.target.value })
                    }
                    className="w-12 h-12 p-1"
                  />
                  <Input
                    value={chatbot.primaryColor}
                    onChange={(e) =>
                      setChatbot({ ...chatbot, primaryColor: e.target.value })
                    }
                    className="w-32"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select
                  value={chatbot.position}
                  onValueChange={(value: any) =>
                    setChatbot({ ...chatbot, position: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>

      {/* Live Preview */}
      <div className="bg-muted/30 rounded-xl border-2 border-dashed border-muted p-8 relative overflow-hidden flex flex-col">
        <div className="absolute top-4 left-4 right-4 text-center text-muted-foreground text-sm font-medium">
          Live Preview
        </div>
        
        {/* Mock Website Content */}
        <div className="flex-1 space-y-4 opacity-20 pointer-events-none mt-8">
          <div className="h-32 bg-gray-200 rounded-lg w-full" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
        </div>

        {/* Chat Widget Preview */}
        <div
          className={`absolute flex flex-col items-end gap-4 transition-all duration-300 ${
            chatbot.position === "bottom-left"
              ? "bottom-6 left-6 items-start"
              : "bottom-6 right-6 items-end"
          }`}
        >
          {/* Chat Window */}
          {previewOpen && (
            <div className="w-[350px] h-[500px] bg-white rounded-lg shadow-xl border flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
              {/* Header */}
              <div
                className="p-4 flex items-center justify-between text-white"
                style={{ backgroundColor: chatbot.primaryColor }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{chatbot.name}</h3>
                    <p className="text-xs opacity-90">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="hover:bg-white/20 p-1 rounded transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4">
                <div className="flex gap-2 max-w-[80%]">
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs"
                    style={{ backgroundColor: chatbot.primaryColor }}
                  >
                    AI
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800 border">
                    {chatbot.welcomeMessage}
                  </div>
                </div>
                <div className="flex gap-2 max-w-[80%] ml-auto flex-row-reverse">
                  <div className="bg-gray-800 text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm">
                    Hi! I have a question about your services.
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="p-3 border-t bg-white">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 text-sm bg-transparent outline-none px-2"
                    disabled
                  />
                  <button
                    className="p-2 rounded-full text-white transition hover:opacity-90"
                    style={{ backgroundColor: chatbot.primaryColor }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[10px] text-center text-gray-400 mt-2">
                  Powered by ChatAssist
                </div>
              </div>
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setPreviewOpen(!previewOpen)}
            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: chatbot.primaryColor }}
          >
            {previewOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageSquare className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
