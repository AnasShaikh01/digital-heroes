'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth/permissions';
import { revalidatePath } from 'next/cache';
import type { Database } from '@/types/database';

type PreferenceInsert = Database['public']['Tables']['user_charity_preferences']['Insert'];

export async function updateCharityPreferenceAction(formData: FormData) {
  const user = await requireAuth();

  const charityId = formData.get('charityId') as string;
  const percentageRaw = (formData.get('percentage') as string || '').trim();

  if (!charityId) {
    return { error: 'Please select a partner charity.' };
  }

  // Strict integer verification (prevents silent conversion of "50abc" or "10.5")
  if (!/^\d+$/.test(percentageRaw)) {
    return { error: 'Contribution allocation must be a whole integer between 10% and 100%.' };
  }

  const percentage = Number(percentageRaw);
  if (!Number.isInteger(percentage) || percentage < 10 || percentage > 100) {
    return { error: 'Contribution allocation must be between 10% and 100%.' };
  }

  const supabase = await createClient();

  // Verify that charity exists AND is active
  const { data: charity, error: charityError } = await supabase
    .from('charities')
    .select('id, active')
    .eq('id', charityId)
    .maybeSingle();

  if (charityError || !charity || !charity.active) {
    return { error: 'Selected charity is not eligible or active.' };
  }

  const insertPayload: PreferenceInsert = {
    user_id: user.id,
    charity_id: charityId,
    contribution_percentage: percentage,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('user_charity_preferences')
    .upsert(insertPayload, { onConflict: 'user_id' });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/charity');
  return { success: true };
}