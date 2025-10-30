import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { PlaceHolderImages } from "../lib/placeholder-images";
import { MotionDiv } from "./motion-div";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'appointment-car');

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            Unmatched Service for Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Maruti Suzuki</span>
          </h1>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="mt-6 max-w-2xl mx-auto text-lg text-white/80 md:text-xl">
            Experience dealer-level expertise with the care and attention you deserve. Your trusted partner for every service, from routine checks to major repairs.
          </p>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 flex justify-center flex-wrap gap-4"
        >
          <Button asChild size="lg">
            <Link href="#diagnose">Book a Service</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black">
            <Link href="/services">Explore Services</Link>
          </Button>
        </MotionDiv>
      </div>
    </section>
  );
}
