import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // Test query public data via RLS (charities are public)
    const { data: charities, error: charityError } = await supabase
      .from('charities')
      .select('id, name, active')
      .limit(2);

    if (charityError) {
      return NextResponse.json(
        { status: 'error', message: charityError.message },
        { status: 500 }
      );
    }

    // Test query plans
    const { data: plans, error: planError } = await supabase
      .from('plans')
      .select('id, name, billing_interval, price_amount')
      .limit(2);

    if (planError) {
      return NextResponse.json(
        { status: 'error', message: planError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'healthy',
      connected: true,
      timestamp: new Date().toISOString(),
      counts: {
        charitiesFound: charities?.length ?? 0,
        plansFound: plans?.length ?? 0,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown server error';
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
}