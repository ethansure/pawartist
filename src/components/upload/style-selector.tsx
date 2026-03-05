"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { artStyles, styleCategories, StyleCategory, ArtStyle } from "@/lib/styles";
import { Search, Flame, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StyleSelectorProps {
  selectedStyle: ArtStyle | null;
  onSelectStyle: (style: ArtStyle) => void;
}

export function StyleSelector({ selectedStyle, onSelectStyle }: StyleSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<StyleCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStyles = artStyles.filter((style) => {
    const matchesCategory = activeCategory === "all" || style.category === activeCategory;
    const matchesSearch = style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search styles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="all" className="mb-4">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0">
          <TabsTrigger
            value="all"
            onClick={() => setActiveCategory("all")}
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-full px-4 py-1.5 text-xs"
          >
            All
          </TabsTrigger>
          {Object.entries(styleCategories).map(([key, category]) => (
            <TabsTrigger
              key={key}
              value={key}
              onClick={() => setActiveCategory(key as StyleCategory)}
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-full px-4 py-1.5 text-xs"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Style Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto pr-2">
        {filteredStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelectStyle(style)}
            className={cn(
              "group relative rounded-xl overflow-hidden border-2 transition-all text-left",
              selectedStyle?.id === style.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent hover:border-primary/50"
            )}
          >
            <div className="relative aspect-square">
              <Image
                src={style.preview}
                alt={style.name}
                fill
                className="object-cover"
              />
              
              {/* Selected Overlay */}
              {selectedStyle?.id === style.id && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-1 left-1 flex gap-1">
                {style.popular && (
                  <Badge className="bg-orange-500 text-white text-[10px] px-1.5 py-0">
                    <Flame className="mr-0.5 h-2.5 w-2.5" />
                    Hot
                  </Badge>
                )}
                {style.new && (
                  <Badge className="bg-green-500 text-white text-[10px] px-1.5 py-0">
                    New
                  </Badge>
                )}
              </div>
            </div>

            <div className="p-2 bg-card">
              <p className="text-xs font-medium truncate">{style.name}</p>
            </div>
          </button>
        ))}
      </div>

      {filteredStyles.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No styles found matching &quot;{searchQuery}&quot;</p>
        </div>
      )}

      {/* Selected Style Info */}
      {selectedStyle && (
        <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
              <Image
                src={selectedStyle.preview}
                alt={selectedStyle.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold">{selectedStyle.name}</h4>
              <p className="text-sm text-muted-foreground">{selectedStyle.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
