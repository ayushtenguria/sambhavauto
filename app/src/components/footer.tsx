
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Instagram, Facebook, Linkedin, Twitter, Phone, MessageSquare, Mail, Car, KeyRound, Megaphone, GalleryVertical } from 'lucide-react';
import type { SVGProps } from 'react';
import { cn } from '../lib/utils';


const CarPhoneIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 17h2l.64 2.56a1 1 0 0 1-.64 1.44H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h1" />
    <path d="M7 17h6" />
    <path d="M6 11h2" />
    <path d="M14 5h5" />
    <path d="M14 9h2" />
    <path d="M5 5h5" />
    <path d="m21 11-2-4-2.5 1.5-2.5-1.5-2 4" />
    <path d="M8.5 11a2.5 2.5 0 0 1-5 0V8.5A2.5 2.5 0 0 1 6 6h0" />
    <path d="M12 11.5a2.5 2.5 0 0 1 5 0V9a2.5 2.5 0 0 0-5 0V8.5" />
  </svg>
);

const CarWindowIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 17H2a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" />
        <path d="m2 11-1-4 4.5-1 18.5 4" />
        <path d="M14 11V7" />
    </svg>
);


export function Footer() {
    const offerings = [
        { icon: CarWindowIcon, text: 'Discover SA', href: '/about', highlighted: false },
        { icon: Car, text: 'OUR SERVICES', href: '/services', highlighted: true },
        { icon: GalleryVertical, text: 'GALLERY', href: '/gallery', highlighted: false },
        { icon: KeyRound, text: 'JOIN OUR TEAM', href: '/', highlighted: false },
        { icon: Megaphone, text: 'LATEST NEWS', href: '/blog', highlighted: false },
    ];

    const contacts = [
        { icon: Phone, text: '+1-800-123-4567', href: 'tel:+1-800-123-4567' },
        { icon: CarPhoneIcon, text: '+1-630-753-8513', href: 'tel:+1-630-753-8513' },
        { icon: MessageSquare, text: 'SAY HELLO', href: '/contact' },
        { icon: Mail, text: 'SUPPORT@EXAMPLE.COM', href: 'mailto:support@example.com' },
        { icon: Mail, text: 'CONTACT@EXAMPLE.COM', href: 'mailto:contact@example.com' },
    ];
    
    const socialLinks = [
        { icon: Instagram, href: '#' },
        { icon: Facebook, href: '#' },
        { icon: Twitter, href: '#' },
        { icon: Linkedin, href: '#' },
    ];


    return (
        <footer className="bg-white text-black border-t border-border py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-16">
                    <div className="md:col-span-2">
                        <h3 className="font-headline text-2xl font-bold tracking-wider text-black mb-6">EXPLORE OUR FULL RANGE OF OFFERINGS</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                             <div className="flex flex-col gap-2.5">
                                {offerings.map((item, index) => (
                                    <Link key={index} href={item.href}  className={cn("group relative flex items-center gap-4 p-4 overflow-hidden bg-gray-100/50 text-black", item.highlighted && 'bg-gradient-to-r from-blue-800 to-blue-900 text-white', "before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-900 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 hover:text-white")}>
                                        <span className={cn("absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b", item.highlighted ? "from-white/50 to-white/10" : "from-blue-600 to-blue-800")}></span>
                                        <div className="relative z-10 flex items-center gap-4">
                                          <item.icon className="h-6 w-6" />
                                          <span className="font-medium tracking-wide">{item.text}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2.5">
                                {contacts.map((item, index) => (
                                    <Link href={item.href} key={index} className={"group relative flex items-center gap-4 p-4 overflow-hidden bg-gray-100/50 before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-900 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 hover:text-white"}>
                                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-blue-800"></span>
                                        <div className="relative z-10 flex items-center gap-4">
                                          <item.icon className="h-6 w-6 text-gray-600 group-hover:text-white" />
                                          <span className="text-gray-600 font-medium tracking-wide group-hover:text-white">{item.text}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                     <div className="flex flex-col h-full md:col-span-1">
                         <h3 className="font-headline text-2xl font-bold tracking-wider text-black mb-6">CONNECT &amp; LOCATE US</h3>
                         <div className="flex-1 flex flex-col min-h-[250px] md:min-h-0">
                            <div className="relative flex flex-1 border border-border">
                                <AnimatedMap />
                                <div className="flex flex-col w-16">
                                    {socialLinks.map((link, index) => (
                                        <Link key={index} href={link.href} tabIndex={-1} className="flex-1 flex items-center justify-center p-4 bg-gradient-to-r from-blue-700 to-blue-900 hover:opacity-80 transition-opacity border-b border-white last:border-b-0">
                                            <link.icon className="h-6 w-6 text-white" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="grid gap-12 md:grid-cols-3">
                     <div className="md:col-span-2">
                        <h3 className="font-headline text-2xl font-bold tracking-wider text-black mb-6">STAY UPDATED WITH CARSY!</h3>
                        <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest news, exclusive offers, and expert tips on car care.</p>
                        <form className="flex gap-2">
                            <Input type="email" placeholder="Your Email" className="flex-1 bg-white border-input text-foreground" />
                            <Button type="submit">Subscribe</Button>
                        </form>
                    </div>
                    <div className="md:col-span-1">
                        <h3 className="font-headline text-2xl font-bold tracking-wider text-black mb-6">OFFICE ADDRESS</h3>
                        <p className="text-gray-600"><span className="text-black font-medium">Visit Us:</span> 1234 Main St, Los Angeles, USA</p>
                        <p className="text-gray-600 mt-2"><span className="text-black font-medium">Our Office:</span> 7 Elm St, San Bernardino, USA</p>
                    </div>
                </div>

                <div className="mt-16 border-t border-border pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Sambhav Automobiles. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );

}
