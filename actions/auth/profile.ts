'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth/permissions';
import { revalidatePath } from 'next/cache';
import type { Database } from '@/types/database';

export async function updateProfileAction(formData: FormData) {
  const user = await requireAuth();
  const fullName = formData.get('fullName') as string;

  if (!fullName || fullName.trim().length === 0) {
    return { error: 'Full name cannot be empty.' };
  }

  const supabase = await createClient();

  const updatePayload: Database['public']['Tables']['profiles']['Update'] = {
    full_name: fullName.trim(),
  };

  // Cast through unknown to PostgREST mutation builder to bypass SSR generic collapse
  const { error } = await (
    supabase.from('profiles') as unknown as {
      update: (
        values: Database['public']['Tables']['profiles']['Update']
      ) => {
        eq: (
          column: string,
          value: string
        ) => Promise<{ error: { message: string } | null }>;
      };
    }
  )
    .update(updatePayload)
    .eq('id', user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard/profile');
  return { success: true };
}