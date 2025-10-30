
import Link from 'next/link';
import Image from 'next/image';
import { MobileNav } from './mobile-nav';
import { Navbar } from './navbar';

export function Header() {
  return (
    <header className="sticky top-[72px] sm:top-12 z-40 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center h-full w-24 relative lg:static lg:translate-x-0">
          <Image
            src="https://vvcsamnwkhurqruadimm.supabase.co/storage/v1/object/public/Logos/Logo-SA.png"
            alt="SAMBHAV AUTOMOBILES Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
        <Navbar />
        <MobileNav />
      </div>
    </header>
  );
}
