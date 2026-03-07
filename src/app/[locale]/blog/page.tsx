import { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "AI Photo Tools Blog - Tips, Guides & Tutorials",
  description: "Learn how to use AI for photo editing. Guides for pet portraits, photo restoration, image upscaling, background removal, style transfer, and professional headshots.",
  keywords: ["AI photo editing", "photo tips", "image editing guide", "AI art tutorial", "photo restoration guide"],
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-lg">
              📸
            </div>
            <span className="text-xl font-bold">AI Photo Tools</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/pet-portrait" className="hover:text-white transition">Pet Portrait</Link>
            <Link href="/photo-restore" className="hover:text-white transition">Restore</Link>
            <Link href="/blog" className="text-white">Blog</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            AI Photo Tools{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tips, tutorials, and guides for getting the most out of AI photo editing tools.
          </p>
        </div>

        {/* Featured Post */}
        {posts.length > 0 && (
          <Link
            href={`/blog/${posts[0].slug}`}
            className="block mb-16 group"
          >
            <div className="relative p-8 bg-gradient-to-br from-violet-950/50 to-fuchsia-950/30 rounded-3xl border border-violet-500/20 hover:border-violet-500/40 transition">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-violet-500/20 text-violet-400 rounded-full text-sm mb-4">
                    Featured
                  </div>
                  <h2 className="text-3xl font-bold mb-4 group-hover:text-violet-400 transition">
                    {posts[0].title}
                  </h2>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {posts[0].description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{posts[0].category}</span>
                    <span>•</span>
                    <time>{new Date(posts[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                  </div>
                </div>
                <div className="w-full lg:w-80 h-48 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl flex items-center justify-center text-6xl">
                  📸
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="h-full p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-violet-500/50 transition flex flex-col">
                <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-6 flex items-center justify-center text-4xl">
                  {post.category === "Pet Portrait" && "🐾"}
                  {post.category === "Photo Restore" && "📸"}
                  {post.category === "Photo Enhance" && "✨"}
                  {post.category === "Background Remove" && "✂️"}
                  {post.category === "Style Transfer" && "🎨"}
                  {post.category === "AI Headshots" && "👔"}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-violet-400 mb-2">{post.category}</div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-violet-400 transition line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                    {post.description}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Try?</h2>
          <p className="text-gray-400 mb-8">
            Transform your photos with AI—free, no signup required.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl font-semibold text-lg hover:scale-105 transition"
          >
            Explore Tools →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          © 2026 AI Photo Tools. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
