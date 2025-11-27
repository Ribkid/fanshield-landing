"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Search,
  Bell,
  Check,
  ArrowRight,
  AlertTriangle,
  DollarSign,
  Eye,
} from "lucide-react";
import { InteractiveNebulaShader } from "@/components/ui/liquid-shader";

// Import all new components
import { FAQSection } from "@/components/landing/faq-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { ComparisonTable } from "@/components/landing/comparison-table";
import { StatsCounter } from "@/components/landing/stats-counter";
import { NewsletterSection } from "@/components/landing/newsletter-section";
import { SecuritySection } from "@/components/landing/security-section";
import { FeaturesTabs } from "@/components/landing/features-tabs";
import { SuccessStories } from "@/components/landing/success-stories";
import { SocialProof } from "@/components/landing/social-proof";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { VideoDemo } from "@/components/landing/video-demo";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="fixed inset-0 z-0" style={{ opacity: 0.3 }}>
        <InteractiveNebulaShader
          disableCenterDimming={true}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-50">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 blur-lg opacity-75" />
                <Shield className="relative h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Inside Ironside
                </span>
                <span className="text-[10px] text-gray-400 -mt-1">by Karlee</span>
              </div>
            </div>
            <nav className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0">
                  Get Protected
                </Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-20 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-2 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-pink-400" />
              <span className="text-sm text-pink-300">Built by a Creator, For Creators</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Your Content.
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Revenue.
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Protected 24/7.
              </span>
            </h1>

            <p className="mb-12 text-lg sm:text-xl text-gray-400 max-w-3xl leading-relaxed">
              Stop losing money to leaks. <span className="text-pink-400 font-semibold">FanShield</span> automatically
              detects your leaked content across the internet and files DMCA takedowns -
              so you can focus on creating.
            </p>

            {/* Problem Stats */}
            <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="backdrop-blur-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <span className="text-2xl font-bold text-white">67%</span>
                </div>
                <p className="text-sm text-gray-400">of creators have been leaked</p>
              </div>
              <div className="backdrop-blur-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5 text-red-400" />
                  <span className="text-2xl font-bold text-white">$2.4k</span>
                </div>
                <p className="text-sm text-gray-400">avg. revenue lost per month</p>
              </div>
              <div className="backdrop-blur-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="h-5 w-5 text-red-400" />
                  <span className="text-2xl font-bold text-white">100k+</span>
                </div>
                <p className="text-sm text-gray-400">views on leaked content daily</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/register">
                <Button
                  size="lg"
                  className="group w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 px-8 py-6 text-lg font-semibold shadow-lg shadow-pink-500/50"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg"
                >
                  See How It Works
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Free 14-day trial • No credit card required • Cancel anytime
            </p>
          </div>
        </section>

        {/* Animated Stats Counter */}
        <StatsCounter />

        {/* Social Proof */}
        <SocialProof />

        {/* How It Works */}
        <section id="how-it-works" className="container mx-auto px-4 sm:px-6 py-20">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
              Protection on Autopilot
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Set it and forget it. FanShield works 24/7 to protect your content
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                step: "1",
                title: "Upload Your Content",
                description: "Simply upload your photos and videos. We create a unique fingerprint for each piece.",
                gradient: "from-pink-500 to-rose-500",
              },
              {
                icon: Search,
                step: "2",
                title: "We Scan The Internet",
                description: "Our AI scans Google, leak sites, forums, and social media daily to find your leaked content.",
                gradient: "from-purple-500 to-indigo-500",
              },
              {
                icon: Bell,
                step: "3",
                title: "Auto DMCA Takedowns",
                description: "We automatically file DMCA notices to remove leaks from Google, Bing, and hosting sites.",
                gradient: "from-blue-500 to-cyan-500",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:border-white/20 transition-all"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-white/5">
                  {feature.step}
                </div>
                <div className="relative">
                  <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dashboard Preview */}
        <DashboardPreview />

        {/* Video Demo */}
        <VideoDemo />

        {/* Features Tabs */}
        <FeaturesTabs />

        {/* Success Stories */}
        <SuccessStories />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Pricing */}
        <section className="container mx-auto px-4 sm:px-6 py-20">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 text-lg">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                name: "Basic",
                price: "$19",
                description: "Perfect for new creators",
                features: [
                  "50 protected items",
                  "Scan every 3 days",
                  "25 takedowns/month",
                  "Google & Bing delisting",
                  "Email support",
                ],
                highlighted: false,
              },
              {
                name: "Pro",
                price: "$49",
                description: "Most popular",
                features: [
                  "200 protected items",
                  "Daily scans",
                  "Unlimited takedowns",
                  "Telegram monitoring",
                  "Anonymous filing",
                  "Priority support",
                ],
                highlighted: true,
              },
              {
                name: "Agency",
                price: "$149",
                description: "For agencies & teams",
                features: [
                  "1000 protected items",
                  "Twice-daily scans",
                  "Unlimited takedowns",
                  "10 sub-accounts",
                  "API access",
                  "Dedicated support",
                ],
                highlighted: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl border ${
                  plan.highlighted
                    ? "border-pink-500/50 bg-gradient-to-br from-pink-500/10 to-purple-500/10"
                    : "border-white/10 bg-white/5"
                } p-8 backdrop-blur-sm`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-1 text-xs font-semibold text-white">
                    POPULAR
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="text-sm text-gray-400">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Security Section */}
        <SecuritySection />

        {/* FAQ */}
        <FAQSection />

        {/* Newsletter */}
        <NewsletterSection />

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 py-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-12 text-center backdrop-blur-sm">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative">
              <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
                Ready to Protect Your Content?
              </h2>
              <p className="mb-8 text-lg text-gray-300 max-w-2xl mx-auto">
                Join hundreds of creators who have taken back control of their content
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
                  >
                    Start Free 14-Day Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-gray-400">
                No credit card required • Setup in 5 minutes
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 backdrop-blur-sm bg-white/5">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-pink-400" />
                  <span className="font-semibold text-white">Inside Ironside</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Built by creators, for creators. Protecting your content and revenue 24/7.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Features</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                  <li><a href="#" className="hover:text-white">How It Works</a></li>
                  <li><a href="#" className="hover:text-white">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white">DMCA Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Connect</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Twitter</a></li>
                  <li><a href="#" className="hover:text-white">Instagram</a></li>
                  <li><a href="#" className="hover:text-white">Support</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
              <p>© 2025 Inside Ironside. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
