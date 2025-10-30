
'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '../lib/placeholder-images';
import { ArrowRight, Car, Wrench, Siren, Wind, ShieldPlus, Sparkles } from 'lucide-react';
import { MotionDiv } from './motion-div';
import { useInView } from 'framer-motion';
import { useRef, type SVGProps } from 'react';
import Link from 'next/link';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from './ui/carousel';

const DentingPaintingIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.5 2.5 4 11l-2 2 1 4 4 1 2-2 8.5-8.5c.9-.9.9-2.5 0-3.4s-2.5-.9-3.4 0Z"/><path d="m18 8 3 3"/></svg>
);

export function ServicesSection() {
    const services = [
        { id: 'service-1', title: 'GENERAL SERVICE', description: 'Comprehensive checks to keep your car running smoothly.', icon: Car },
        { id: 'service-3', title: 'DENTING & PAINTING', description: 'Restoring your car\'s beauty with precision denting and painting.', icon: DentingPaintingIcon },
        { id: 'service-9', title: 'DEEP CLEANING', description: 'A complete interior and exterior cleaning for a spotless finish.', icon: Sparkles },
        { id: 'service-10', title: 'INSURANCE/ACCIDENTAL REPAIR', description: 'Hassle-free insurance claims and expert accident repairs.', icon: ShieldPlus },
    ];

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section ref={ref} className="w-full py-12 md:py-24 lg:py-32 bg-background border-y overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <MotionDiv
                    className="flex flex-col items-center text-center mb-12"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                >
                    <MotionDiv variants={itemVariants}>
                        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                            Our Services
                        </div>
                    </MotionDiv>
                    <MotionDiv variants={itemVariants}>
                        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-4">
                            Quality Car Care You Can Trust
                        </h2>
                    </MotionDiv>
                    <MotionDiv variants={itemVariants}>
                        <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                            From routine maintenance to complex repairs, our certified technicians are here to provide top-notch service for your Maruti.
                        </p>
                    </MotionDiv>
                </MotionDiv>
                <MotionDiv
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                   <Carousel
                        plugins={[plugin.current]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.play}
                        className="w-full"
                    >
                        <CarouselContent>
                            {services.map((service, index) => {
                                const image = PlaceHolderImages.find(img => img.id === service.id);
                                return (
                                    <CarouselItem key={service.id} className="md:basis-1/2 lg:basis-1/3 group">
                                        <div className="p-1">
                                             <MotionDiv variants={itemVariants}>
                                                <Link href="/services" className="block overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-transform duration-300 ease-in-out hover:scale-105 h-full flex flex-col">
                                                    <div className="relative">
                                                        {image && (
                                                            <Image
                                                                src={image.imageUrl}
                                                                alt={image.description}
                                                                width={600}
                                                                height={400}
                                                                data-ai-hint={image.imageHint}
                                                                className="h-56 w-full object-cover"
                                                            />
                                                        )}
                                                        <div className="absolute top-3 right-3 flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full border group-hover:bg-primary transition-colors duration-300">
                                                            <service.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                                                        </div>
                                                    </div>
                                                    <div className="p-6 flex flex-col flex-grow">
                                                        <h3 className="font-headline text-xl font-bold">{service.title}</h3>
                                                        <p className="text-muted-foreground mt-2 text-sm h-10 flex-grow">{service.description}</p>
                                                        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                                                            Learn More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                        </div>
                                                    </div>
                                                </Link>
                                            </MotionDiv>
                                        </div>
                                    </CarouselItem>
                                )
                            })}
                        </CarouselContent>
                    </Carousel>
                </MotionDiv>
            </div>
        </section>
    );
}
