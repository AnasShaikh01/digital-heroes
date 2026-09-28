import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { DrawExplanation } from '@/components/landing/DrawExplanation';
import { FeaturedCharity } from '@/components/landing/FeaturedCharity';
import { getFeaturedCharity } from '@/lib/charity/charity-service';

export default async function HomePage() {
  const featured = await getFeaturedCharity();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 selection:bg-amber-500/20 selection:text-amber-300">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <FeaturedCharity charity={featured} />
        <DrawExplanation />
      </main>
      <Footer />
    </div>
  );
}