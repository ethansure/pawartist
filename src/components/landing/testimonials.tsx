"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    pet: "Max the Golden Retriever",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    content: "I was blown away by how beautiful Max looks as a royal portrait! The quality is incredible and it now hangs proudly in our living room. Worth every penny!",
    rating: 5,
    style: "Royal Portrait",
  },
  {
    name: "Michael Chen",
    pet: "Luna the Siamese Cat",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    content: "The Van Gogh style portrait of my Luna is absolutely stunning. My wife cried happy tears when she saw it as her birthday gift. The AI captured Luna's personality perfectly!",
    rating: 5,
    style: "Van Gogh Style",
  },
  {
    name: "Emily Rodriguez",
    pet: "Buddy the Beagle",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    content: "I ordered the Disney/Pixar style for my daughter's birthday and she absolutely LOVED seeing Buddy as a cartoon character. The details are amazing!",
    rating: 5,
    style: "Disney/Pixar",
  },
  {
    name: "David Thompson",
    pet: "Charlie the Tabby",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    content: "As an artist myself, I was skeptical about AI art. But WOW - the watercolor portrait of Charlie exceeded all my expectations. The brush strokes look authentic!",
    rating: 5,
    style: "Watercolor",
  },
  {
    name: "Jennifer Martinez",
    pet: "Rocky the Bulldog",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    content: "Rocky passed away last year, and having his portrait done as a wizard made our family smile through the tears. It's the perfect memorial for our magical boy.",
    rating: 5,
    style: "Wizard",
  },
  {
    name: "James Wilson",
    pet: "Whiskers the Persian",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    content: "The anime style portrait is SO cute! Whiskers looks like a character from Studio Ghibli. I've already ordered 3 more styles. Totally addicted!",
    rating: 5,
    style: "Anime/Manga",
  },
];

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">
            <Star className="mr-1 h-3 w-3 fill-current" />
            50,000+ Happy Customers
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Pet{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Parents Everywhere
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our community is saying about their PetPortraitAI experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/20 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.pet}</p>
                  </div>
                </div>

                {/* Style Badge */}
                <Badge variant="secondary" className="mt-4">
                  Style: {testimonial.style}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-primary">50K+</p>
            <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-primary">250K+</p>
            <p className="text-sm text-muted-foreground mt-1">Portraits Created</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-primary">4.9</p>
            <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-primary">50+</p>
            <p className="text-sm text-muted-foreground mt-1">Art Styles</p>
          </div>
        </div>
      </div>
    </section>
  );
}
