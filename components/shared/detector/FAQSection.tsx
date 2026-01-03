"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqData = [
  {
    question: "What is a deepfake, and why should I care?",
    answer:
      "A deepfake is an image or video where artificial intelligence has been used to swap faces, alter expressions, or create entirely synthetic people that look real. Today, deepfakes are weaponized to spread misinformation, commit financial fraud, and destroy individual reputations. Detecting them is the first step in reclaiming digital truth.",
  },
  {
    question: "How do I use this website?",
    answer: `It's simple:
1. Upload a suspicious image to the secure area.
2. Submit the image for analysis.
3. Receive an instant verdict: "The image is real" or "The image is fake."`,
  },
  {
    question: 'What is "SigLIP," and how does it detect fakes?',
    answer: `SigLIP (Sigmoid Language-Image Pre-training) is an advanced AI architecture. Unlike older models, SigLIP is designed to understand the deep "alignment" between what is shown in an image and the logical language used to describe it. It looks for semantic inconsistencies—logical errors that the human eye misses but a neural network can spot mathematically.`,
  },
  {
    question: "Can SigLIP catch fakes that humans can't see?",
    answer: `Yes. Humans are naturally wired to trust what they see. However, AI generators often leave behind "digital fingerprints" or artifacts—tiny glitches in skin texture, light reflections, or background geometry. SigLIP analyzes these on a pixel-by-pixel level to find patterns that do not exist in the natural world.`,
  },
  {
    question: "How accurate is the detection?",
    answer: `While no AI is 100% perfect, SigLIP represents the state-of-the-art in image-text alignment. It is significantly more effective than traditional "filters" because it understands the context of the image, making it harder for sophisticated deepfakes to "trick" the system.`,
  },
  {
    question: "Do you use my images to train your AI?",
    answer:
      "No. We believe in ethical AI. We do not use user-submitted content to train or improve our models without explicit, separate consent.",
  },
  {
    question: `What should I do if an image is flagged as "Fake"?`,
    answer: `If an image is flagged as fake, do not share it. Deepfakes thrive on "viral velocity." By stopping the spread, you are helping to prevent the harm that misinformation causes to communities and individuals.`,
  },
  {
    question: "Why did a real image get flagged as fake (or vice-versa)?",
    answer: `This is known as a "False Positive" or "False Negative." High-compression levels, heavy social media filters, or extreme lighting can sometimes confuse AI models. We recommend using high-quality original files for the most accurate results.`,
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 px-4 pb-12">
      {/* Section Title */}
      <h2 className="text-xl lg:text-2xl font-semibold text-center mb-4">
        Frequently Asked Questions
      </h2>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg border border-border bg-secondary/30 overflow-hidden"
          >
            {/* Question Button */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
            >
              <span className="font-medium text-sm lg:text-base">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ml-4",
                  openIndex === index && "rotate-180"
                )}
              />
            </button>

            {/* Collapsible Answer */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                openIndex === index ? "max-h-96" : "max-h-0"
              )}
            >
              <div className="p-4 pt-0 text-muted-foreground text-sm lg:text-base whitespace-pre-line">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
