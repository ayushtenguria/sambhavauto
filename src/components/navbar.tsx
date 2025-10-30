
import Link from 'next/link';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export function Navbar() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
  ];

  return (
    <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-black/60 transition-colors hover:text-black"
        >
          {link.label.toUpperCase()}
        </Link>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-black/60 transition-colors hover:text-black focus:outline-none">
          BLOG <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href="/blog">All Posts</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/blog">Categories</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/blog">Tags</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="lg" className="border-black/20 hover:bg-black hover:text-white">
          <Link href="/contact">CONTACT US</Link>
        </Button>
        <Button asChild size="lg">
            <Link href="/login">Login</Link>
        </Button>
      </div>
    </nav>
  );
}
