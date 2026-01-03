"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Image pairs data
const imagePairs = [
  {
    id: 1,
    real: "/real-fake-pair-images/image1_real.png",
    fake: "/real-fake-pair-images/image1_fake.png",
  },
  {
    id: 2,
    real: "/real-fake-pair-images/image2_real.jpg",
    fake: "/real-fake-pair-images/image2_fake.jpg",
  },
  {
    id: 3,
    real: "/real-fake-pair-images/image3_real.jpg",
    fake: "/real-fake-pair-images/image3_fake.jpg",
  },
  {
    id: 4,
    real: "/real-fake-pair-images/image4_real.jpg",
    fake: "/real-fake-pair-images/image4_fake.jpg",
  },
];

const ImageComparisonCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % imagePairs.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + imagePairs.length) % imagePairs.length
    );
  }, []);

  // Auto-advance every 5 seconds (pauses on hover)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  return (
    <div
      className="w-full max-w-4xl mx-auto mt-12 px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section Title */}
      <h2 className="text-xl lg:text-2xl font-semibold text-center mb-2">
        Real vs Fake Comparison
      </h2>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/80 hover:bg-secondary text-foreground transition-colors shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/80 hover:bg-secondary text-foreground transition-colors shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Pair Display */}
        <div className="overflow-hidden rounded-xl bg-secondary/30 p-2 lg:p-4">
          <div className="grid grid-cols-2 gap-4 lg:gap-8">
            {/* Real Image */}
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-green-500/50 shadow-lg">
                <span className="absolute top-2 left-2 z-10 px-3 py-1 rounded-full bg-green-500/80 text-white text-xs font-medium">
                  Real
                </span>
                <Image
                  src={imagePairs[currentIndex].real}
                  alt={`Real image ${currentIndex + 1}`}
                  fill
                  className="object-cover transition-opacity duration-500"
                  sizes="(max-width: 768px) 45vw, 400px"
                />
              </div>
            </div>

            {/* Fake Image */}
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-red-500/50 shadow-lg">
                <span className="absolute top-2 left-2 z-10 px-3 py-1 rounded-full bg-red-500/80 text-white text-xs font-medium">
                  Fake
                </span>
                <Image
                  src={imagePairs[currentIndex].fake}
                  alt={`Fake image ${currentIndex + 1}`}
                  fill
                  className="object-cover transition-opacity duration-500"
                  sizes="(max-width: 768px) 45vw, 400px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {imagePairs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageComparisonCarousel;
