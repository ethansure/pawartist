"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { artStyles, styleCategories, StyleCategory } from "@/lib/styles";
import { ArrowRight, Sparkles, Star, Flame } from "lucide-react";

export function StyleGallery() {
  const [activeCategory, setActiveCategory] = useState<StyleCategory | "all">("all");

  const filteredStyles = activeCategory === "all" 
    ? artStyles 
    : artStyles.filter(style => style.category === activeCategory);

  return (
    <section id="styles" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">
            <Star className="mr-1 h-3 w-3" />
            50+ Art Styles
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Perfect{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Art Style
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From Renaissance royalty to Disney magic, we have the perfect style to capture your pet&apos;s personality.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-10">
          <TabsList className="flex flex-wrap justify-center h-auto gap-2 bg-transparent">
            <TabsTrigger
              value="all"
              onClick={() => setActiveCategory("all")}
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-full px-6"
            >
              All Styles
            </TabsTrigger>
            {Object.entries(styleCategories).map(([key, category]) => (
              <TabsTrigger
                key={key}
                value={key}
                onClick={() => setActiveCategory(key as StyleCategory)}
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-full px-6"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredStyles.map((style) => (
            <Link
              key={style.id}
              href={`/create?style=${style.id}`}
              className="group"
            >
              <div className="style-card relative bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-xl">
                <div className="relative aspect-square">
                  <Image
                    src={style.preview}
                    alt={style.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex gap-2">
                    {style.popular && (
                      <Badge className="bg-orange-500 text-white text-xs">
                        <Flame className="mr-1 h-3 w-3" />
                        Popular
                      </Badge>
                    )}
                    {style.new && (
                      <Badge className="bg-green-500 text-white text-xs">
                        New
                      </Badge>
                    )}
                  </div>

                  {/* Hover Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-sm text-white/80">{style.description}</p>
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-semibold text-sm truncate">{style.name}</h3>
                  <p className="text-xs text-muted-foreground truncate capitalize">
                    {styleCategories[style.category]?.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/create">
            <Button size="lg" className="gradient-accent text-white font-semibold">
              <Sparkles className="mr-2 h-5 w-5" />
              Start Creating Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
