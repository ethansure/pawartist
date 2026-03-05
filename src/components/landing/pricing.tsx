"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    description: "Try it out with watermarked portraits",
    price: "$0",
    period: "forever",
    features: [
      "3 portrait generations",
      "10 art styles",
      "Watermarked downloads",
      "Standard quality",
      "Basic support",
    ],
    cta: "Get Started Free",
    href: "/create",
    popular: false,
    icon: Sparkles,
  },
  {
    name: "Pro",
    description: "Perfect for pet lovers",
    price: "$9.99",
    period: "one-time",
    features: [
      "20 portrait generations",
      "All 50+ art styles",
      "HD downloads (no watermark)",
      "4 variations per style",
      "Priority generation",
      "Email support",
    ],
    cta: "Upgrade to Pro",
    href: "/create?plan=pro",
    popular: true,
    icon: Zap,
  },
  {
    name: "Unlimited",
    description: "For the ultimate pet parent",
    price: "$29.99",
    period: "one-time",
    features: [
      "Unlimited generations",
      "All 50+ art styles",
      "Ultra HD downloads",
      "8 variations per style",
      "Commercial license",
      "Priority support",
      "Early access to new styles",
      "Print-ready files",
    ],
    cta: "Go Unlimited",
    href: "/create?plan=unlimited",
    popular: false,
    icon: Crown,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">
            Simple Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            One-time payment. No subscriptions. Create beautiful pet portraits forever.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular
                  ? "border-primary shadow-xl scale-105 z-10"
                  : "hover:border-primary/50 transition-colors"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="gradient-accent text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  plan.popular ? "gradient-accent" : "bg-muted"
                }`}>
                  <plan.icon className={`h-6 w-6 ${plan.popular ? "text-white" : "text-muted-foreground"}`} />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="text-center flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">/{plan.period}</span>
                </div>

                <ul className="space-y-3 text-left">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Link href={plan.href} className="w-full">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "gradient-accent text-white"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 rounded-full px-6 py-3">
            <Check className="h-5 w-5" />
            <span className="font-medium">30-Day Money Back Guarantee</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Not satisfied? Get a full refund, no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
