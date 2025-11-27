"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 p-12 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 mb-6 shadow-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
              Stay Protected & Informed
            </h2>
            <p className="mb-8 text-lg text-gray-300 max-w-xl mx-auto">
              Get creator tips, leak prevention strategies, and FanShield updates delivered to your inbox weekly
            </p>

            {isSubmitted ? (
              <div className="flex items-center justify-center gap-2 text-green-400 text-lg">
                <CheckCircle2 className="h-6 w-6" />
                <span>Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-pink-500"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </form>
            )}

            <p className="mt-4 text-sm text-gray-400">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
