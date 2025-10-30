
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function Preloader() {
  const slideUp = {
    initial: {
      top: 0,
    },
    exit: {
      top: '-100vh',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
  };

  const opacity = {
    initial: {
      opacity: 1,
    },
    enter: {
      opacity: 0,
      transition: { duration: 0.5, delay: 1.5 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
    >
      <motion.div variants={opacity} initial="initial" animate="enter" className="flex items-center justify-center">
         <Image
            src="https://vvcsamnwkhurqruadimm.supabase.co/storage/v1/object/public/Logos/Logo-SA.png"
            alt="SAMBHAV AUTOMOBILES Logo"
            width={150}
            height={52}
            className="object-contain"
            priority
          />
      </motion.div>
    </motion.div>
  );
}
