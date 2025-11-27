"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "How does FanShield detect leaked content?",
      answer:
        "We use advanced perceptual hashing technology to create unique fingerprints of your content. Our AI then scans 50+ leak sites, Google, Bing, Reddit, Telegram, and file hosting platforms daily to find matches. Even if someone crops, resizes, or adds watermarks to your content, we can still detect it.",
    },
    {
      question: "Will my personal information be revealed when filing DMCAs?",
      answer:
        "No! We offer anonymous DMCA filing. FanShield acts as your authorized agent, so only our company details appear on takedown notices. Your legal name and address are encrypted and only disclosed if legally required (very rare).",
    },
    {
      question: "How long does it take to remove leaked content?",
      answer:
        "Google and Bing typically delist URLs within 24-48 hours. Direct hosting site takedowns vary - most sites respond within 3-7 days. We automatically follow up on all submissions and notify you of status changes.",
    },
    {
      question: "What if I'm not on OnlyFans?",
      answer:
        "FanShield works for creators on any platform! We protect content from Fansly, Fanvue, LoyalFans, Patreon, or independent creators. As long as you own the copyright, we can help protect it.",
    },
    {
      question: "Can I upload old content that's already been leaked?",
      answer:
        "Absolutely! Upload your entire content library and we'll scan for existing leaks immediately. Many creators recover thousands of dollars in lost revenue by removing old leaks that are still circulating.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes! We offer a 14-day free trial (no credit card required). If you're not satisfied within 30 days of your paid subscription, we'll refund your money, no questions asked.",
    },
    {
      question: "How is this different from hiring a DMCA service?",
      answer:
        "Traditional DMCA services charge $50-200/month and often require you to find the leaks yourself. FanShield automatically scans the entire internet daily, detects leaks, AND files takedowns - all for a fraction of the cost. Plus, we're built by a creator who understands your needs.",
    },
    {
      question: "Will this work for videos too?",
      answer:
        "Yes! Our system extracts keyframes from videos and creates fingerprints for each frame. We can detect leaked videos even if they've been re-encoded, trimmed, or have different quality settings.",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about protecting your content
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg px-6 data-[state=open]:border-pink-500/30"
            >
              <AccordionTrigger className="text-left text-white hover:text-pink-400 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
