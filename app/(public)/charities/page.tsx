import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getActiveCharities } from '@/lib/charity/charity-service';
import { CharityGrid } from '@/components/charities/CharityGrid';

export default async function CharitiesPage() {
  const charities = await getActiveCharities();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-400">
              Grassroots Directory
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground mt-4">
              Our Partner Charities
            </h1>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base leading-relaxed">
              Explore the vetted charitable causes our members support. Direct your subscription funds to any partner of your choice.
            </p>
          </div>

          <CharityGrid initialCharities={charities} />
        </div>
      </main>

      <Footer />
    </div>
  );
}