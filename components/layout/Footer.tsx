import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10 bg-card/20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground">DIGITAL HEROES</p>
          <p className="mt-1">Performance Golf & Purpose-Driven Charity Gaming.</p>
        </div>

        <div className="flex flex-wrap gap-6">
          <Link href="/how-it-works" className="hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link href="/charities" className="hover:text-foreground transition-colors">
            Charity Directory
          </Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/login" className="hover:text-foreground transition-colors">
            Subscriber Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}