import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - Pet Portrait Tips & Inspiration",
  description:
    "Discover tips for perfect pet photos, art style guides, and inspiration for your next AI-generated pet portrait.",
};

const blogPosts = [
  {
    slug: "best-photos-for-pet-portraits",
    title: "How to Take the Perfect Photo for Your Pet Portrait",
    excerpt:
      "Learn the secrets to capturing the perfect pet photo that will make your AI-generated portrait look absolutely stunning.",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600",
    category: "Tips",
    date: "Mar 1, 2026",
    readTime: "5 min read",
  },
  {
    slug: "royal-portrait-guide",
    title: "The Ultimate Guide to Royal Pet Portraits",
    excerpt:
      "Everything you need to know about creating majestic royal portraits of your furry friends, from style selection to perfect poses.",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600",
    category: "Styles",
    date: "Feb 28, 2026",
    readTime: "8 min read",
  },
  {
    slug: "pet-memorial-portraits",
    title: "Creating Meaningful Memorial Portraits for Beloved Pets",
    excerpt:
      "How AI pet portraits can help celebrate and remember your furry family members who have crossed the rainbow bridge.",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600",
    category: "Inspiration",
    date: "Feb 25, 2026",
    readTime: "6 min read",
  },
  {
    slug: "trending-art-styles-2026",
    title: "Top 10 Trending Pet Portrait Styles in 2026",
    excerpt:
      "From Studio Ghibli-inspired anime to minimalist line art, discover the hottest pet portrait trends this year.",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600",
    category: "Trends",
    date: "Feb 20, 2026",
    readTime: "7 min read",
  },
  {
    slug: "gift-ideas-pet-lovers",
    title: "10 Creative Gift Ideas for Pet Lovers",
    excerpt:
      "Looking for the perfect gift? Custom pet portraits make unforgettable presents for any pet parent in your life.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600",
    category: "Gifts",
    date: "Feb 15, 2026",
    readTime: "4 min read",
  },
  {
    slug: "ai-art-explained",
    title: "How AI Creates Stunning Pet Portraits: A Behind-the-Scenes Look",
    excerpt:
      "Curious about the technology? Learn how our AI transforms your pet photos into beautiful works of art.",
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600",
    category: "Technology",
    date: "Feb 10, 2026",
    readTime: "10 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">
            Blog
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Pet Portrait{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Tips & Inspiration
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover photography tips, style guides, and creative ideas for your next pet portrait.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-foreground">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <h2 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <Card className="p-8 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
            <h3 className="text-xl font-bold mb-2">Get Pet Portrait Tips in Your Inbox</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe for weekly tips, new styles, and exclusive offers!
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-2 gradient-accent text-white rounded-lg font-medium">
                Subscribe
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
