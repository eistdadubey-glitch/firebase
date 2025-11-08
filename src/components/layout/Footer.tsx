import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const footerNavs = [
  {
    label: 'Shop',
    items: [
      { href: '/collections', name: 'All Collections' },
      { href: '/collections/new-arrivals', name: 'New Arrivals' },
      { href: '/collections/best-sellers', name: 'Best Sellers' },
    ],
  },
  {
    label: 'About',
    items: [
      { href: '/about', name: 'Our Story' },
      { href: '/sustainability', name: 'Sustainability' },
      { href: '/press', name: 'Press' },
    ],
  },
  {
    label: 'Support',
    items: [
      { href: '/support', name: 'FAQ & Support' },
      { href: '/support/contact', name: 'Contact Us' },
      { href: '/support/shipping', name: 'Shipping & Returns' },
    ],
  },
];

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="max-w-xs mt-2 text-sm text-muted-foreground">
              Sustainable fashion for the modern individual. Wear with pride.
            </p>
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Join our newsletter</h3>
              <form className="flex w-full max-w-sm">
                <Input type="email" placeholder="Your email address" className="rounded-r-none" />
                <Button type="submit" className="rounded-l-none bg-accent text-accent-foreground hover:bg-accent/90">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-2">
            {footerNavs.map((nav) => (
              <div key={nav.label}>
                <h3 className="font-headline font-bold text-lg mb-4">{nav.label}</h3>
                <ul className="space-y-3">
                  {nav.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VastraAI. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {socialLinks.map((social) => (
              <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-primary">
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
