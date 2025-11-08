import Image from "next/image";
import { AiStylistForm } from "./AiStylistForm";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Sparkles } from "lucide-react";

export default function StylistPage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "stylist-hero");

  return (
    <div className="min-h-screen">
      <section className="relative w-full h-[50vh] min-h-[400px] bg-secondary flex flex-col items-center justify-center text-center p-4">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-center opacity-20"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-10">
          <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-headline font-bold">
            Your Personal AI Stylist
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Answer a few questions and upload a photo to get personalized style
            recommendations from our sustainable collections.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AiStylistForm />
        </div>
      </section>
    </div>
  );
}
