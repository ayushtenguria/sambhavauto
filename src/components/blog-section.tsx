

'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '../lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { MotionDiv } from './motion-div';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function BlogSection() {
    const blogPosts = [
        {
            id: 'blog-1',
            date: 'July 14, 2024',
            author: 'Drew Adams',
            title: 'BENEFITS OF REGULAR OIL CHANGES: WHY ESSENTIAL',
            description: 'Stay informed about new car releases! Trust Autofix for all your automotive news needs.',
            slug: '/blog'
        },
        {
            id: 'blog-2',
            date: 'July 19, 2024',
            author: 'Quinn Bailey',
            title: 'DIY CAR CARE: SIMPLE FIXES YOU CAN EASILY DO AT HOME',
            description: 'Stay informed about new car releases! Trust Autofix for all your automotive news needs.',
            slug: '/blog'
        },
        {
            id: 'blog-3',
            date: 'July 3, 2024',
            author: 'Taylor Morgan',
            title: 'HOW TO EXTEND THE LIFE OF YOUR VEHICLE: EXPERT TIPS',
            description: 'Stay informed about new car releases! Trust Autofix for all your automotive news needs.',
            slug: '/blog'
        },
        {
            id: 'blog-4',
            date: 'July 20, 2024',
            author: 'Riley Carter',
            title: 'WHY REGULAR TIRE ROTATION MATTERS FOR VEHICLE SAFETY',
            description: 'Stay informed about new car releases! Trust Autofix for all your automotive news needs.',
            slug: '/blog'
        },
    ];

    const backgroundImage = PlaceHolderImages.find(img => img.id === 'appointment-car');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2,
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
        <section ref={ref} className="relative w-full py-12 md:py-24 text-black overflow-hidden">
            {backgroundImage && (
                <Image
                    src={backgroundImage.imageUrl}
                    alt={backgroundImage.description}
                    data-ai-hint={backgroundImage.imageHint}
                    fill
                    className="object-cover opacity-20"
                />
            )}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
            <MotionDiv 
                className="container relative z-10 mx-auto px-4 md:px-6"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                 <MotionDiv variants={itemVariants} className="max-w-4xl text-left mb-12">
                     <div className="flex items-center gap-2">
                        <span className="h-4 w-1 bg-primary"></span>
                        <p className="font-medium tracking-widest text-primary text-sm">
                          LATEST NEWS AND ARTICLES
                        </p>
                    </div>
                    <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mt-4">
                       FROM THE AUTOFIX BLOG
                    </h2>
                </MotionDiv>

                <div className="grid gap-px md:grid-cols-2 bg-gray-200/50 border-t border-l border-gray-200/50">
                    {blogPosts.map((post, index) => {
                        const image = PlaceHolderImages.find(img => img.id === post.id);
                        const isImageFirstOnEven = index % 4 < 2; 
                        const orderClass = isImageFirstOnEven ? 'md:order-1' : 'md:order-2';
                        const textOrderClass = isImageFirstOnEven ? 'md:order-2' : 'md:order-1';

                        return (
                           <MotionDiv variants={itemVariants} key={post.id}>
                                <Link href={post.slug} className="grid grid-cols-1 md:grid-cols-2 bg-white/80 backdrop-blur-sm border-b border-r border-gray-200/50 group h-full">
                                    {image && (
                                        <div className={`relative overflow-hidden min-h-[200px] md:min-h-full ${orderClass}`}>
                                            <Image
                                                src={image.imageUrl}
                                                alt={image.description}
                                                fill
                                                data-ai-hint={image.imageHint}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className={`p-6 flex flex-col justify-center ${textOrderClass}`}>
                                        <div className="flex items-center text-sm text-gray-600 gap-2">
                                            <span>{post.date}</span>
                                            <span className="h-1 w-1 bg-primary rounded-full"></span>
                                            <span>By {post.author}</span>
                                        </div>
                                        <h3 className="font-headline text-2xl font-bold mt-4 transition-colors group-hover:text-primary text-black line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 mt-2 line-clamp-3">{post.description}</p>
                                        <div className="flex items-center gap-2 text-sm font-medium text-primary mt-6">
                                            READ DETAILS
                                            <span className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground transition-all duration-300 group-hover:bg-black group-hover:text-white">
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                           </MotionDiv>
                        )
                    })}
                </div>
            </MotionDiv>
        </section>
    );
}
