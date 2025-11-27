"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Shield, Clock } from "lucide-react";

export function SuccessStories() {
  const stories = [
    {
      creatorType: "Solo Creator",
      tier: "Pro",
      results: {
        leaksRemoved: 127,
        timeframe: "3 months",
        revenueSaved: "$8,400",
        responseTime: "36 hours avg",
      },
      quote:
        "I was spending 10+ hours a week searching for leaks and filing DMCAs myself. FanShield has completely automated this and I've recovered so much lost revenue. Best investment I've made!",
      metrics: [
        { label: "Leaks Detected", value: "127", icon: Shield },
        { label: "Avg Response Time", value: "36h", icon: Clock },
        { label: "Revenue Protected", value: "$8.4k", icon: DollarSign },
        { label: "ROI", value: "1,714%", icon: TrendingUp },
      ],
    },
    {
      creatorType: "Agency (12 Creators)",
      tier: "Agency",
      results: {
        leaksRemoved: 834,
        timeframe: "6 months",
        revenueSaved: "$47,200",
        responseTime: "24 hours avg",
      },
      quote:
        "Managing DMCA for our talent was a full-time job. FanShield's Agency plan with API access lets us protect all 12 creators seamlessly. The ROI is incredible.",
      metrics: [
        { label: "Total Leaks Removed", value: "834", icon: Shield },
        { label: "Avg Response Time", value: "24h", icon: Clock },
        { label: "Revenue Protected", value: "$47k", icon: DollarSign },
        { label: "Time Saved", value: "240h", icon: TrendingUp },
      ],
    },
    {
      creatorType: "New Creator",
      tier: "Basic",
      results: {
        leaksRemoved: 23,
        timeframe: "1 month",
        revenueSaved: "$1,200",
        responseTime: "48 hours avg",
      },
      quote:
        "I'm new to OF and didn't even know my content was being leaked until I tried FanShield's free trial. They found 23 leaks in the first week! Now I'm a paying customer for life.",
      metrics: [
        { label: "Leaks Found", value: "23", icon: Shield },
        { label: "First Detection", value: "3 days", icon: Clock },
        { label: "Revenue Saved", value: "$1.2k", icon: DollarSign },
        { label: "Peace of Mind", value: "100%", icon: TrendingUp },
      ],
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
          Real Creators, Real Results
        </h2>
        <p className="text-gray-400 text-lg">
          See how FanShield has helped creators protect their content and revenue
        </p>
      </div>

      <div className="space-y-8 max-w-6xl mx-auto">
        {stories.map((story, index) => (
          <Card
            key={index}
            className="border border-white/10 bg-white/5 backdrop-blur-sm hover:border-pink-500/30 transition-all"
          >
            <CardContent className="p-8">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
                  {story.creatorType}
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white">
                  {story.tier} Plan
                </Badge>
                <span className="text-sm text-gray-400">
                  • {story.results.timeframe}
                </span>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mb-6">
                {story.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="text-center p-4 rounded-lg border border-white/10 bg-white/5"
                  >
                    <metric.icon className="h-6 w-6 text-pink-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-400">{metric.label}</div>
                  </div>
                ))}
              </div>

              <blockquote className="relative">
                <div className="absolute -top-2 -left-2 text-6xl text-pink-500/20 font-serif">
                  "
                </div>
                <p className="text-gray-300 italic leading-relaxed pl-8">
                  {story.quote}
                </p>
              </blockquote>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
