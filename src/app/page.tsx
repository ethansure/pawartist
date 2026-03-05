"use client";

import { useState } from "react";

const artStyles = [
  { id: "royal", name: "Royal Portrait", emoji: "👑", description: "Majestic renaissance style" },
  { id: "disney", name: "Disney Style", emoji: "✨", description: "Pixar-like 3D character" },
  { id: "oil", name: "Oil Painting", emoji: "🎨", description: "Classic fine art" },
  { id: "watercolor", name: "Watercolor", emoji: "💧", description: "Soft, dreamy artwork" },
  { id: "anime", name: "Anime Style", emoji: "🌸", description: "Japanese animation" },
  { id: "popart", name: "Pop Art", emoji: "🔴", description: "Warhol-inspired" },
  { id: "sketch", name: "Pencil Sketch", emoji: "✏️", description: "Hand-drawn look" },
  { id: "fantasy", name: "Fantasy Hero", emoji: "⚔️", description: "Epic adventure style" },
  { id: "space", name: "Space Explorer", emoji: "🚀", description: "Cosmic adventure" },
  { id: "vintage", name: "Vintage Photo", emoji: "📷", description: "Classic sepia tone" },
  { id: "stained", name: "Stained Glass", emoji: "🪟", description: "Cathedral art" },
  { id: "vangogh", name: "Van Gogh", emoji: "🌻", description: "Starry night style" },
];

const testimonials = [
  { name: "Sarah M.", text: "My dog looks like royalty! Worth every penny.", rating: 5 },
  { name: "James K.", text: "Got this for my mom - she cried happy tears!", rating: 5 },
  { name: "Emma L.", text: "The Disney style portrait is now framed in our living room.", rating: 5 },
];

const pricingPlans = [
  { name: "Starter", price: 9.99, portraits: 10, features: ["10 AI Portraits", "Standard Quality", "5 Art Styles", "Email Delivery"] },
  { name: "Popular", price: 19.99, portraits: 30, features: ["30 AI Portraits", "HD Quality", "All 50+ Styles", "Instant Download", "Commercial Use"], popular: true },
  { name: "Ultimate", price: 39.99, portraits: 100, features: ["100 AI Portraits", "4K Quality", "All Styles + Custom", "Priority Generation", "Print-Ready Files", "Lifetime Access"] },
];

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState("royal");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🐾</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              PawArtist
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#styles" className="text-gray-600 hover:text-amber-600 transition">Styles</a>
            <a href="#pricing" className="text-gray-600 hover:text-amber-600 transition">Pricing</a>
            <a href="#faq" className="text-gray-600 hover:text-amber-600 transition">FAQ</a>
          </nav>
          <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🎉</span> Over 50,000 happy pet parents!
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Turn Your Pet Into
            <br />
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Stunning Artwork
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Transform your beloved furry friend into museum-quality portraits with AI.
            50+ art styles, instant delivery, starting at just $9.99
          </p>
          
          {/* Upload Area */}
          <div 
            className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl shadow-amber-500/10 p-8 border-2 border-dashed border-amber-200 hover:border-amber-400 transition cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <input 
              id="fileInput"
              type="file" 
              accept="image/*" 
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => setUploadedImage(e.target?.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
            {uploadedImage ? (
              <div className="relative">
                <img src={uploadedImage} alt="Uploaded pet" className="w-full h-64 object-cover rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl flex items-end justify-center pb-4">
                  <span className="text-white font-medium">Click to change photo</span>
                </div>
              </div>
            ) : (
              <>
                <div className="text-6xl mb-4">📸</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Drop your pet photo here
                </h3>
                <p className="text-gray-500">or click to browse • PNG, JPG up to 10MB</p>
              </>
            )}
          </div>

          {/* Trust Badges */}
          <div className="flex justify-center items-center gap-8 mt-12 text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>Instant Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Style Gallery */}
      <section id="styles" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">50+ Art Styles</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            From royal portraits to anime, find the perfect style for your furry friend
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {artStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                  selectedStyle === style.id
                    ? "border-amber-500 bg-amber-50 shadow-lg"
                    : "border-gray-200 hover:border-amber-300"
                }`}
              >
                <div className="text-4xl mb-2">{style.emoji}</div>
                <h3 className="font-semibold text-sm">{style.name}</h3>
                <p className="text-xs text-gray-500">{style.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, icon: "📤", title: "Upload Photo", desc: "Upload a clear photo of your pet" },
              { step: 2, icon: "🎨", title: "Choose Style", desc: "Pick from 50+ beautiful art styles" },
              { step: 3, icon: "✨", title: "Get Artwork", desc: "Download your stunning portraits" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                  {item.icon}
                </div>
                <div className="text-sm text-amber-600 font-medium mb-2">Step {item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-gray-600 text-center mb-12">Choose the perfect plan for your pet portraits</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white scale-105 shadow-2xl"
                    : "bg-gray-50 border-2 border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="text-sm font-medium bg-white/20 rounded-full px-3 py-1 inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    ${plan.price}
                  </span>
                  <span className={plan.popular ? "text-white/80" : "text-gray-500"}>one-time</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full font-semibold transition ${
                    plan.popular
                      ? "bg-white text-amber-600 hover:bg-gray-100"
                      : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Loved by Pet Parents</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, i) => (
                    <span key={i} className="text-amber-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="font-semibold text-gray-900">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">FAQ</h2>
          {[
            { q: "How long does it take to generate portraits?", a: "Most portraits are ready in under 5 minutes!" },
            { q: "What photo quality do I need?", a: "A clear photo where your pet's face is visible works best. Minimum 500x500 pixels recommended." },
            { q: "Can I get a refund?", a: "Yes! We offer a 100% satisfaction guarantee. If you're not happy, we'll refund you." },
            { q: "Can I print these portraits?", a: "Absolutely! Our HD and 4K options are print-ready at high resolution." },
          ].map((faq, i) => (
            <div key={i} className="border-b border-gray-200 py-4">
              <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Create Magic?</h2>
          <p className="text-xl mb-8 opacity-90">Transform your pet into a masterpiece today</p>
          <button className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition">
            Start Creating Now - $9.99
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-bold text-white">PawArtist</span>
          </div>
          <p>© 2026 PawArtist. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
