"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Jessica M.",
      role: "OnlyFans Creator",
      avatar: "/avatars/1.jpg",
      initials: "JM",
      rating: 5,
      text: "FanShield saved my business. I was losing $3k/month to leaks and didn't know where to start. Within the first week, they found and removed 47 leaked posts. Worth every penny!",
    },
    {
      name: "Taylor R.",
      role: "Fansly Top 1%",
      avatar: "/avatars/2.jpg",
      initials: "TR",
      rating: 5,
      text: "Finally, a DMCA service that actually works! The dashboard is so easy to use and I love getting instant alerts. Karlee really knows what creators need.",
    },
    {
      name: "Morgan K.",
      role: "Independent Creator",
      avatar: "/avatars/3.jpg",
      initials: "MK",
      rating: 5,
      text: "I tried other services but they were confusing and expensive. FanShield is affordable, automatic, and the anonymous filing feature is a game-changer for my privacy.",
    },
    {
      name: "Alex Chen",
      role: "Creator Agency Owner",
      avatar: "/avatars/4.jpg",
      initials: "AC",
      rating: 5,
      text: "Managing DMCA for 12 clients was a nightmare. FanShield's Agency plan lets me protect all of them from one dashboard. The API integration is perfect for our workflow.",
    },
    {
      name: "Sam B.",
      role: "OnlyFans Creator",
      avatar: "/avatars/5.jpg",
      initials: "SB",
      rating: 5,
      text: "The impersonator detection feature caught someone using my photos to scam my fans. FanShield got it shut down in 48 hours. This service pays for itself!",
    },
    {
      name: "Riley P.",
      role: "Fanvue Creator",
      avatar: "/avatars/6.jpg",
      initials: "RP",
      rating: 5,
      text: "I was skeptical at first, but the free trial convinced me. They found leaks on sites I didn't even know existed. Now I sleep better knowing my content is protected 24/7.",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
          Loved by Creators
        </h2>
        <p className="text-gray-400 text-lg">
          See what creators are saying about FanShield
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="border border-white/10 bg-white/5 backdrop-blur-sm hover:border-pink-500/30 transition-all"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12 border-2 border-pink-500/30">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
