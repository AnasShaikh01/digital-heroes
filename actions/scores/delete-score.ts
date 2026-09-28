'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth/permissions';
import { revalidatePath } from 'next/cache';

export async function deleteScoreAction(scoreId: string) {
  const user = await requireAuth();

  if (!scoreId) {
    return { error: 'Score ID is required.' };
  }

  // Call createClient() with 0 generic type arguments
  const supabase = await createClient();

  const { error } = await supabase
    .from('scores')
    .delete()
    .eq('id', scoreId)
    .eq('user_id', user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/scores');
  return { success: true };
}