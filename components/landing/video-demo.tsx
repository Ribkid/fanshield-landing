"use client";

import { Button } from "@/components/ui/button";
import { Play, Check } from "lucide-react";
import { useState } from "react";

export function VideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false);

  const highlights = [
    "See how easy it is to upload and protect your content",
    "Watch leaks get detected in real-time",
    "Learn how DMCA takedowns are automated",
    "Explore the creator dashboard",
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6 text-3xl sm:text-4xl font-bold text-white">
              See FanShield In Action
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Watch this 2-minute demo to see how FanShield protects your content
              and makes DMCA takedowns effortless.
            </p>

            <ul className="space-y-4 mb-8">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <div className="mt-1 h-5 w-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0">
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                Schedule Demo Call
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 blur-3xl" />
            <div
              className="relative aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 to-slate-900 overflow-hidden cursor-pointer group"
              onClick={() => setIsPlaying(true)}
            >
              {!isPlaying ? (
                <>
                  {/* Video Thumbnail */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-pink-500/50 blur-2xl animate-pulse" />
                      <div className="relative h-20 w-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-white text-sm font-medium">2:14</span>
                    </div>
                    <p className="text-white font-semibold">
                      FanShield Platform Walkthrough
                    </p>
                    <p className="text-gray-400 text-sm">
                      Complete guide to protecting your content
                    </p>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <p className="text-white">Video Player (Demo)</p>
                  {/* Replace with actual video embed */}
                </div>
              )}
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-6 -right-6 flex gap-4">
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-1">4.9★</div>
                <div className="text-xs text-gray-400">User Rating</div>
              </div>
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-1">10k+</div>
                <div className="text-xs text-gray-400">Views</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
