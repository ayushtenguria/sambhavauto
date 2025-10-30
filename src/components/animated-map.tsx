
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '../lib/placeholder-images';

export function AnimatedMap() {
  const [isHovered, setIsHovered] = useState(false);
  const infoImage = PlaceHolderImages.find(img => img.id === 'blog-4');

  return (
    <div
      className="relative flex-1 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/world-map.svg')" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={-1}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          className="relative"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="darkcyan"
            stroke="white"
            strokeWidth="1"
            className="drop-shadow-lg"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: -10 }}
                exit={{ opacity: 0, scale: 0.9, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded-md border border-border bg-card p-2 text-card-foreground shadow-lg"
              >
                {infoImage && (
                  <div className="relative h-20 w-full mb-2">
                    <Image
                      src={infoImage.imageUrl}
                      alt={infoImage.description}
                      data-ai-hint={infoImage.imageHint}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <h4 className="font-bold text-xs">Main Office</h4>
                <p className="text-xs text-muted-foreground">
                  1234 Main St, Los Angeles, USA
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
