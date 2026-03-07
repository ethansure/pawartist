import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-posts";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

interface Props {
  params: { slug: string; locale: string };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  const locales = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko'];
  
  return locales.flatMap(locale =>
    posts.map(post => ({
      locale,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const baseUrl = "https://aiphotos.icu";
  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: "Blog", url: `${baseUrl}/blog` },
    { name: post.title, url: `${baseUrl}/blog/${post.slug}` },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <BreadcrumbJsonLd items={breadcrumbs} />
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-lg">
              📸
            </div>
            <span className="text-xl font-bold">AI Photo Tools</span>
          </Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-400">{post.category}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="inline-block px-3 py-1 bg-violet-500/20 text-violet-400 rounded-full text-sm mb-4">
            {post.category}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            {post.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </header>

        {/* Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-white
            prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-li:text-gray-300
            prose-strong:text-white
            prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline"
        >
          {post.content.split('\n').map((paragraph, i) => {
            if (paragraph.startsWith('# ')) {
              return <h1 key={i} className="mt-8 mb-4">{paragraph.slice(2)}</h1>;
            }
            if (paragraph.startsWith('## ')) {
              return <h2 key={i} className="mt-8 mb-4">{paragraph.slice(3)}</h2>;
            }
            if (paragraph.startsWith('- **')) {
              const match = paragraph.match(/- \*\*(.+?)\*\* - (.+)/);
              if (match) {
                return (
                  <li key={i} className="ml-6">
                    <strong>{match[1]}</strong> - {match[2]}
                  </li>
                );
              }
            }
            if (paragraph.startsWith('- ')) {
              return <li key={i} className="ml-6">{paragraph.slice(2)}</li>;
            }
            if (paragraph.match(/^\d+\. /)) {
              return <li key={i} className="ml-6 list-decimal">{paragraph.slice(3)}</li>;
            }
            if (paragraph.trim()) {
              return <p key={i}>{paragraph}</p>;
            }
            return null;
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-br from-violet-950/50 to-fuchsia-950/30 rounded-3xl border border-violet-500/20">
          <h3 className="text-2xl font-bold mb-4">Try It Free</h3>
          <p className="text-gray-400 mb-6">
            Ready to transform your photos? Try our AI tools for free—no signup required.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium hover:scale-105 transition"
          >
            Get Started Free →
          </Link>
        </div>

        {/* Related Posts */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">More Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {getAllBlogPosts()
              .filter(p => p.slug !== post.slug)
              .slice(0, 2)
              .map(relatedPost => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-violet-500/50 transition"
                >
                  <div className="text-sm text-violet-400 mb-2">{relatedPost.category}</div>
                  <h4 className="font-semibold mb-2 line-clamp-2">{relatedPost.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2">{relatedPost.description}</p>
                </Link>
              ))}
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          © 2026 AI Photo Tools. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
