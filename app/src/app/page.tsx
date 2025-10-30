
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Hero } from "../components/hero";
import { ServicesSection } from "../components/services-section";
import { FaqProcess } from "../components/autofix/FaqProcess";
import { BlogSection } from "../components/blog-section";
import { AppointmentSection } from "../components/appointment-section";
import { Preloader } from '../components/preloader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('hasLoaded')) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasLoaded', 'true');
    }, 1800); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      <div style={{ visibility: isLoading ? 'hidden' : 'visible', opacity: isLoading ? 0 : 1 }}>
        <Hero />
        <ServicesSection />
        <FaqProcess />
        <BlogSection />
        <AppointmentSection />
      </div>
    </>
  );
}
