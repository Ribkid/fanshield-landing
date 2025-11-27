"use client";

import { Badge } from "@/components/ui/badge";

export function SocialProof() {
  const platforms = [
    { name: "OnlyFans", logo: "OF" },
    { name: "Fansly", logo: "FL" },
    { name: "Fanvue", logo: "FV" },
    { name: "LoyalFans", logo: "LF" },
    { name: "Patreon", logo: "PA" },
    { name: "Independent", logo: "IN" },
  ];

  const mediaLogos = [
    "Forbes",
    "TechCrunch",
    "Wired",
    "The Verge",
  ];

  return (
    <section className="border-y border-white/10 backdrop-blur-sm bg-white/5 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400 uppercase tracking-wide mb-4">
            Trusted by creators from
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center font-bold text-white text-sm">
                {platform.logo}
              </div>
              <span className="text-white font-medium">{platform.name}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400 uppercase tracking-wide mb-6">
            As featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {mediaLogos.map((logo, index) => (
              <div
                key={index}
                className="text-2xl font-bold text-gray-600 hover:text-gray-400 transition-colors"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
