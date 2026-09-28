import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getCharityBySlug } from '@/lib/charity/charity-service';
import { CharityDetails } from '@/components/charities/CharityDetails';

interface CharityPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CharitySlugPage({ params }: CharityPageProps) {
  const { slug } = await params;
  const charity = await getCharityBySlug(slug);

  if (!charity) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <CharityDetails charity={charity} />
        </div>
      </main>

      <Footer />
    </div>
  );
}