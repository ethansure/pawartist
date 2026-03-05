"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does PetPortraitAI work?",
    answer:
      "Simply upload a clear photo of your pet, select your preferred art style (like Royal Portrait, Disney, or Van Gogh), and our AI will transform your pet into a beautiful piece of art in about 30 seconds. We use advanced AI models trained specifically for creating stunning pet portraits.",
  },
  {
    question: "What kind of photos work best?",
    answer:
      "For the best results, use a clear, well-lit photo where your pet's face is clearly visible. Front-facing or 3/4 angle photos work great. Avoid blurry images, photos with multiple pets, or images where your pet's face is partially hidden. The higher quality your input photo, the better your portrait will look!",
  },
  {
    question: "How long does it take to generate a portrait?",
    answer:
      "Most portraits are generated in about 30 seconds to 1 minute. During peak times, it might take a bit longer, but you'll never wait more than a few minutes. We generate 4 variations of each style so you can pick your favorite!",
  },
  {
    question: "Can I use these portraits commercially?",
    answer:
      "Free and Pro plans include personal use rights. If you want to use your portraits commercially (selling prints, merchandise, etc.), you'll need the Unlimited plan which includes a full commercial license.",
  },
  {
    question: "What if I'm not happy with my portrait?",
    answer:
      "We offer a 30-day money-back guarantee! If you're not satisfied with your portraits, contact our support team and we'll issue a full refund, no questions asked. You can also try regenerating with different photos or styles.",
  },
  {
    question: "What resolution are the portraits?",
    answer:
      "Free portraits are 512x512 pixels with a watermark. Pro portraits are 1024x1024 HD quality without watermarks. Unlimited portraits are 2048x2048 Ultra HD quality, perfect for large prints.",
  },
  {
    question: "Do you support all types of pets?",
    answer:
      "Yes! While we specialize in dogs and cats, our AI works great with birds, rabbits, hamsters, fish, reptiles, horses, and more. If it has a face, we can turn it into art!",
  },
  {
    question: "How do I download my portraits?",
    answer:
      "After generation, you'll see a download button for each portrait. Free users get watermarked images, while paid users can download high-resolution files without watermarks. All downloads are instant!",
  },
  {
    question: "Can I print my portraits?",
    answer:
      "Absolutely! Our HD and Ultra HD portraits are perfect for printing. We recommend HD (1024px) for prints up to 8x10 inches, and Ultra HD (2048px) for larger prints. We're also working on a print shop integration!",
  },
  {
    question: "Is my pet's photo stored or shared?",
    answer:
      "Your privacy is important to us. We process your photos securely and don't share them with third parties. Uploaded photos are automatically deleted after 24 hours. Your generated portraits are stored in your account for easy access.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">
            <HelpCircle className="mr-1 h-3 w-3" />
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about creating your pet&apos;s portrait.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg border px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-2">Still have questions?</p>
          <a
            href="mailto:support@petportraitai.com"
            className="text-primary hover:underline font-medium"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}
