import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { PlaceHolderImages } from "../lib/placeholder-images";
import { MotionDiv } from "./motion-div";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-car');

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-white pt-20">
      <div className="container mx-auto grid h-full grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:px-6">
        <div className="z-10 text-black">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
              <span className="text-primary">Sambhav</span> Automobiles
            </h1>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="mt-4 max-w-[500px] text-lg text-black/70 md:text-xl">
              Where Every Maruti Feels at Home
            </p>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button asChild size="lg">
              <Link href="#diagnose">Get Diagnosis</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-black/20 hover:bg-black hover:text-white">
              <Link href="/services">Our Services</Link>
            </Button>
          </MotionDiv>
        </div>
        
        {heroImage && (
          <MotionDiv 
            className="relative h-full w-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              fill
              className="object-contain"
              priority
            />
          </MotionDiv>
        )}
      </div>
    </section>
  );
}
