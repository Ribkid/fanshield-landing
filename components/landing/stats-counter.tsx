"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Shield, AlertCircle, DollarSign } from "lucide-react";

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function Counter({ end, duration = 2000, prefix = "", suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsCounter() {
  const stats = [
    {
      icon: Shield,
      value: 500,
      suffix: "+",
      label: "Creators Protected",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: TrendingUp,
      value: 10000,
      suffix: "+",
      label: "Takedowns Filed",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: AlertCircle,
      value: 50000,
      suffix: "+",
      label: "Leaks Detected",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: DollarSign,
      value: 2,
      prefix: "$",
      suffix: "M+",
      label: "Revenue Protected",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="border-y border-white/10 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-purple-500/10 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${stat.gradient} mb-4 shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                <Counter
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
