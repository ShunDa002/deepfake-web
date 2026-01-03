"use client";

import Link from "next/link";
import { Sparkles, AudioLines } from "lucide-react";

const AudioDetectorComingSoon = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background via-secondary/40 to-background text-foreground">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-5 py-2.5 text-base font-semibold text-primary ring-1 ring-primary/30">
          <Sparkles className="h-4 w-4" />
          Audio Detector • Coming Soon
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <AudioLines className="h-8 w-8" />
          </div>
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/80">
            Coming Soon
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            High-fidelity audio authenticity is on the way
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            We&apos;re crafting an audio detector built to spot synthetic voices
            and edited clips with the same rigor as our image pipeline. Expect
            multi-model analysis, confidence scoring, and a crisp UX tailored
            for investigators and creators.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/image-detector"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Explore image detector
          </Link>
          <span className="text-sm text-muted-foreground">
            Audio detection preview arriving soon.
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioDetectorComingSoon;
