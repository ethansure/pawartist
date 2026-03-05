# 🐾 PetPortraitAI

Transform your beloved pets into stunning AI-generated art! Choose from 50+ artistic styles including royal portraits, Disney/Pixar, Van Gogh, and more.

![PetPortraitAI](https://images.unsplash.com/photo-1558788353-f76d92427f16?w=1200)

## ✨ Features

- **50+ Art Styles** - Royal portraits, Disney/Pixar, oil paintings, watercolor, anime, and more
- **AI-Powered** - Advanced AI transforms your pet photos in seconds
- **Multiple Variations** - Get 4 unique variations per style
- **HD Downloads** - High-resolution downloads for printing
- **Mobile-First** - Beautiful responsive design
- **SEO Optimized** - Built for search engines

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/petportraitai.git
cd petportraitai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your API keys in `.env.local`:
```env
# Optional - enables real AI generation
REPLICATE_API_TOKEN=your_replicate_token

# Optional - enables payments
STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **AI Generation:** Replicate API (SDXL/Flux)
- **Payments:** Stripe
- **Deployment:** Vercel

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate/    # AI generation endpoint
│   │   └── checkout/    # Stripe checkout
│   ├── blog/            # SEO blog pages
│   ├── create/          # Portrait creation flow
│   └── page.tsx         # Landing page
├── components/
│   ├── landing/         # Landing page sections
│   ├── layout/          # Header, footer
│   ├── results/         # Results gallery
│   ├── ui/              # shadcn components
│   └── upload/          # Upload flow components
└── lib/
    ├── styles.ts        # Art style definitions
    └── utils.ts         # Utilities
```

## 🎨 Art Styles

| Category | Styles |
|----------|--------|
| Classic & Royal | Royal Portrait, Military General, Victorian Noble |
| Modern Art | Pop Art, Minimalist, Geometric |
| Cartoon | Disney/Pixar, Anime, Chibi |
| Fine Art | Oil Painting, Watercolor, Van Gogh, Impressionist |
| Fantasy | Wizard, Knight, Space Explorer, Superhero |
| Seasonal | Christmas, Halloween, Beach, Spring Garden |

## 🔧 Configuration

### Replicate API

1. Sign up at [replicate.com](https://replicate.com)
2. Get your API token
3. Add to `.env.local`: `REPLICATE_API_TOKEN=r8_xxx`

### Stripe (Test Mode)

1. Get keys from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Add to `.env.local`:
   - `STRIPE_SECRET_KEY=sk_test_xxx`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx`

## 📦 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/petportraitai)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- [Replicate](https://replicate.com) for AI models
- [shadcn/ui](https://ui.shadcn.com) for beautiful components
- [Unsplash](https://unsplash.com) for demo images
- All the pet parents who inspired this project! 🐕🐱

---

Made with ❤️ for pet lovers everywhere
