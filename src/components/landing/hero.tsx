"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

const beforeAfterPairs = [
  {
    before: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300",
    after: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=300",
    style: "Royal Portrait",
  },
  {
    before: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300",
    after: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=300",
    style: "Van Gogh Style",
  },
];

const trustBadges = [
  { icon: Zap, text: "AI-Powered" },
  { icon: Shield, text: "100% Safe" },
  { icon: Star, text: "50+ Styles" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero py-20 lg:py-28">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute top-60 -left-40 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">
              <Sparkles className="mr-1 h-3 w-3" />
              #1 AI Pet Portrait Generator
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Transform Your Pet Into{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Stunning Art
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Create beautiful AI-generated portraits of your beloved pets in over 50 artistic styles. 
              Royal portraits, Disney magic, oil paintings, and so much more!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link href="/create">
                <Button size="lg" className="gradient-accent text-white font-semibold text-lg px-8 shadow-lg hover:shadow-xl transition-all">
                  Create Your Portrait
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#styles">
                <Button size="lg" variant="outline" className="font-semibold text-lg px-8">
                  View All Styles
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <badge.icon className="h-4 w-4 text-primary" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-amber-300 border-2 border-white"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground">50,000+ happy pet parents</p>
              </div>
            </div>
          </div>

          {/* Right Content - Before/After Gallery */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-6">
              {beforeAfterPairs.map((pair, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl shadow-2xl p-4 transform hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Image
                        src={pair.before}
                        alt="Original pet photo"
                        width={200}
                        height={200}
                        className="rounded-xl object-cover w-full aspect-square"
                      />
                      <Badge className="absolute bottom-2 left-2 bg-black/70 text-white">
                        Before
                      </Badge>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <Image
                        src={pair.after}
                        alt={`Pet portrait in ${pair.style}`}
                        width={200}
                        height={200}
                        className="rounded-xl object-cover w-full aspect-square"
                      />
                      <Badge className="absolute bottom-2 left-2 bg-primary text-white">
                        {pair.style}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -left-4 bg-white rounded-full px-4 py-2 shadow-lg animate-float">
              <span className="text-2xl">🎨</span>
              <span className="ml-2 font-medium">50+ Styles</span>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-full px-4 py-2 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
              <span className="text-2xl">⚡</span>
              <span className="ml-2 font-medium">30 Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
