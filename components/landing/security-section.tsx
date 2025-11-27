"use client";

import { Shield, Lock, Eye, Server, FileCheck, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Bank-Level Encryption",
      description:
        "All your content and personal data is encrypted with AES-256 encryption at rest and in transit.",
    },
    {
      icon: Eye,
      title: "Anonymous Protection",
      description:
        "File DMCAs without revealing your identity. We act as your authorized agent to protect your privacy.",
    },
    {
      icon: Server,
      title: "Secure Storage",
      description:
        "Your content fingerprints are stored in military-grade secure servers with regular security audits.",
    },
    {
      icon: FileCheck,
      title: "GDPR Compliant",
      description:
        "Full compliance with GDPR, CCPA, and data protection regulations. You own your data, always.",
    },
    {
      icon: UserCheck,
      title: "2FA Authentication",
      description:
        "Protect your account with two-factor authentication and advanced security settings.",
    },
    {
      icon: Shield,
      title: "SOC 2 Certified",
      description:
        "Working towards SOC 2 Type II certification for enterprise-grade security standards.",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
          Your Privacy & Security Matter
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          We understand the importance of privacy for creators. Your trust is our priority.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {securityFeatures.map((feature, index) => (
          <Card
            key={index}
            className="border border-white/10 bg-white/5 backdrop-blur-sm hover:border-pink-500/30 transition-all"
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500/20 to-purple-500/20">
                  <feature.icon className="h-6 w-6 text-pink-400" />
                </div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-6 py-3 backdrop-blur-sm">
          <Shield className="h-5 w-5 text-green-400" />
          <span className="text-sm text-green-300 font-medium">
            🛡️ Trusted by 500+ creators • Zero data breaches • 99.9% uptime
          </span>
        </div>
      </div>
    </section>
  );
}
