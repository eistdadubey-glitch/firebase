import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { products, reviews } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProductCard from '@/components/shared/ProductCard';
import { ArrowRight, Leaf, Sparkles, Star } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about_us');
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-center"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-headline font-bold drop-shadow-lg">
            Wear with Pride
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-body drop-shadow-md">
            Discover sustainable fashion that fits your unique style. Let our AI stylist guide you to your perfect outfit.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-7 px-10 rounded-full font-bold font-headline">
            <Link href="/stylist">
              Find Your Style <Sparkles className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="new-arrivals" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-headline font-bold text-center mb-12">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/collections">
                Shop All Collections <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
            <div>
              <Leaf className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-4xl font-headline font-bold mb-4">Our Sustainable Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At Vastra, we believe fashion and sustainability can coexist. We are committed to ethical production, using eco-friendly materials, and creating timeless pieces you can wear with pride for years to come.
              </p>
              <Button asChild size="lg" variant="link" className="p-0 text-lg text-primary hover:text-primary/80">
                <Link href="/about">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-headline font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.slice(0,3).map((review) => {
              const avatar = PlaceHolderImages.find(p => p.id === review.avatar);
              return (
                <Card key={review.id} className="bg-card border-none shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                       <Avatar>
                        {avatar && <AvatarImage src={avatar.imageUrl} alt={review.author} data-ai-hint={avatar.imageHint} />}
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg font-bold">{review.author}</CardTitle>
                         <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="italic text-muted-foreground">"{review.comment}"</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
