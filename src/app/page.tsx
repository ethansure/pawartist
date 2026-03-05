import { Hero } from "@/components/landing/hero";
import { StyleGallery } from "@/components/landing/style-gallery";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StyleGallery />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
