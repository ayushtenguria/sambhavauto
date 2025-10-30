
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { cn } from '../lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
  ];

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6 text-foreground" />
            <span className="sr-only">Open Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-xs bg-white text-foreground">
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle className={cn("sr-only")}>Mobile Navigation Menu</SheetTitle>
            <Link
              href="/"
              className="flex items-center h-full"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative w-24 h-10">
                <Image
                  src="https://vvcsamnwkhurqruadimm.supabase.co/storage/v1/object/public/Logos/Logo-SA.png"
                  alt="SAMBHAV AUTOMOBILES Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block p-3 text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="blog-links" className="border-b-0">
                  <AccordionTrigger className="p-3 text-lg font-medium text-foreground/80 transition-colors hover:text-foreground hover:no-underline">
                    BLOG
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pl-6">
                    <div className="flex flex-col gap-1">
                      <Link href="/blog" className="block p-2 text-base font-medium text-foreground/70" onClick={() => setIsOpen(false)}>All Posts</Link>
                      <Link href="/blog" className="block p-2 text-base font-medium text-foreground/70" onClick={() => setIsOpen(false)}>Categories</Link>
                      <Link href="/blog" className="block p-2 text-base font-medium text-foreground/70" onClick={() => setIsOpen(false)}>Tags</Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            <div className="mt-4 flex flex-col gap-2">
                <Button asChild size="lg" className="border-black/20 bg-transparent text-black hover:bg-black hover:text-white">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>CONTACT US</Link>
                </Button>
                <Button asChild size="lg" >
                    <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
