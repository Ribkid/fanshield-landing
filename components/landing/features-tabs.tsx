"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Bell,
  FileText,
  BarChart3,
  Globe,
  Users,
} from "lucide-react";

export function FeaturesTabs() {
  const features = [
    {
      id: "scanning",
      label: "Smart Scanning",
      icon: Search,
      title: "AI-Powered Content Detection",
      description:
        "Our advanced perceptual hashing technology creates unique fingerprints for your content that can detect leaks even if they've been cropped, resized, or watermarked.",
      points: [
        "Scans 50+ known leak sites daily",
        "Google & Bing reverse image search",
        "Reddit, Telegram, and social media monitoring",
        "Video keyframe extraction and matching",
        "Real-time leak detection alerts",
      ],
      image: "/features/scanning.jpg",
    },
    {
      id: "takedowns",
      label: "Auto Takedowns",
      icon: FileText,
      title: "Automated DMCA Filing",
      description:
        "We automatically generate and file DMCA takedown notices to Google, Bing, and hosting providers the moment we detect a leak. No manual work required.",
      points: [
        "Instant DMCA generation",
        "Google Search delisting in 24-48hrs",
        "Direct hosting provider contact",
        "Automated follow-ups",
        "95% success rate",
      ],
      image: "/features/takedowns.jpg",
    },
    {
      id: "privacy",
      label: "Privacy First",
      icon: Users,
      title: "Anonymous Protection",
      description:
        "File DMCAs without revealing your identity. FanShield acts as your authorized DMCA agent, keeping your personal information private and secure.",
      points: [
        "Anonymous DMCA filing",
        "Encrypted personal data storage",
        "GDPR & CCPA compliant",
        "No public record of your identity",
        "Optional public filing available",
      ],
      image: "/features/privacy.jpg",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      title: "Powerful Insights",
      description:
        "Track your protection status with detailed analytics. See where leaks are coming from, how quickly they're being removed, and estimated revenue protected.",
      points: [
        "Real-time leak detection dashboard",
        "Takedown success metrics",
        "Revenue protection calculator",
        "Top leak source identification",
        "Historical trend analysis",
      ],
      image: "/features/analytics.jpg",
    },
    {
      id: "alerts",
      label: "Instant Alerts",
      icon: Bell,
      title: "Never Miss a Leak",
      description:
        "Get notified immediately when we detect your content on unauthorized sites. Choose email, SMS, or Telegram notifications based on your preference.",
      points: [
        "Real-time email notifications",
        "SMS alerts (Pro plan)",
        "Telegram bot integration",
        "Customizable alert settings",
        "Weekly summary reports",
      ],
      image: "/features/alerts.jpg",
    },
    {
      id: "global",
      label: "Global Coverage",
      icon: Globe,
      title: "Worldwide Protection",
      description:
        "We monitor leak sites across the globe, supporting multiple languages and regional platforms to ensure comprehensive protection no matter where you are.",
      points: [
        "Multi-language support",
        "International leak site coverage",
        "Regional DMCA compliance",
        "24/7 automated scanning",
        "Global hosting provider database",
      ],
      image: "/features/global.jpg",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
          Features That Work For You
        </h2>
        <p className="text-gray-400 text-lg">
          Explore everything FanShield has to offer
        </p>
      </div>

      <Tabs defaultValue="scanning" className="max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-white/5 border border-white/10 p-1">
          {features.map((feature) => (
            <TabsTrigger
              key={feature.id}
              value={feature.id}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-gray-400"
            >
              <feature.icon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{feature.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {features.map((feature) => (
          <TabsContent key={feature.id} value={feature.id} className="mt-8">
            <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 mb-6 shadow-lg">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.points.map((point, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <div className="mt-1 h-5 w-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-white" />
                          </div>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl" />
                    <div className="relative aspect-video rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <feature.icon className="h-24 w-24 text-white/10" />
                      </div>
                      {/* Placeholder for actual feature screenshot/demo */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                        <p className="text-white text-sm">Feature Demo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
