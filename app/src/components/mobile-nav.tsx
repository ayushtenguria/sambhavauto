'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
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
    { href: '/', label: 'About Us' },
    { href: '/', label: 'Services' },
    { href: '/', label: 'Pricing' },
  ];

  return (
    <div className="md:hidden">
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
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src="https://vvcsamnwkhurqruadimm.supabase.co/storage/v1/object/sign/Logos/Logo-sa-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xN2UyMjhhOC1lZTYyLTRiNzEtYTZkZS1iMTI3YzY5OGRmYjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMb2dvcy9Mb2dvLXNhLXJlbW9vZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzU5MDgwMzA5LCJleHAiOjE5MTY3NjAzMDl9.333SEbcWmMAgbtjjqgBWR-s9k_QDrzJ0QynwuELZtxg"
                alt="AUTOFIX Logo"
                width={60}
                height={21}
                className="object-contain"
              />
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
                      <Link href="/" className="block p-2 text-base font-medium text-foreground/70" onClick={() => setIsOpen(false)}>All Posts</Link>
                      <Link href="/" className="block p-2 text-base font-medium text-foreground/70" onClick={() => setIsOpen(false)}>Categories</Link>
                      <Link href="/" className="block p-2 text-base font-medium text-foreground/70" onClick={() => setIsOpen(false)}>Tags</Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            <Button asChild size="lg" className="mt-4 border-black/20 bg-transparent text-black hover:bg-black hover:text-white">
              <Link href="/" onClick={() => setIsOpen(false)}>CONTACT US</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
