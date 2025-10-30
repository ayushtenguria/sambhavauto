
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '../lib/placeholder-images';
import { Button } from './ui/button';
import { MotionDiv } from './motion-div';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function AppointmentSection() {
    const appointmentImage = PlaceHolderImages.find(img => img.id === 'appointment-car');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
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
        <section ref={ref} className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
            {appointmentImage && (
                <Image
                    src={appointmentImage.imageUrl}
                    alt={appointmentImage.description}
                    data-ai-hint={appointmentImage.imageHint}
                    fill
                    className="object-cover opacity-20"
                />
            )}
            <div className="absolute inset-0 bg-black/50" />
            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <MotionDiv
                    className="flex flex-col items-center text-center text-white"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <MotionDiv variants={itemVariants}>
                         <div className="flex items-center gap-2 justify-center">
                            <span className="h-4 w-1 bg-white"></span>
                            <p className="font-medium tracking-widest text-white text-sm">
                                BOOK YOUR APPOINTMENT
                            </p>
                        </div>
                    </MotionDiv>
                    <MotionDiv variants={itemVariants}>
                       <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl mt-4">
                            GET PROFESSIONAL HELP
                        </h2>
                    </MotionDiv>
                     <MotionDiv variants={itemVariants}>
                       <p className="mt-4 max-w-[600px] text-white/80 md:text-xl">
                            Our certified mechanics are ready to provide top-notch service for your vehicle. Schedule an appointment today and experience the Autofix difference.
                        </p>
                    </MotionDiv>
                    <MotionDiv variants={itemVariants} className="mt-8">
                        <Button asChild size="lg" className="bg-gradient-to-r from-gradient-start to-gradient-end text-white hover:opacity-90">
                            <Link href="/">Book an Appointment</Link>
                        </Button>
                    </MotionDiv>
                </MotionDiv>
            </div>
        </section>
    );
}
