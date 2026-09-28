'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth/permissions';
import { validateScoreInput } from '@/lib/scores/score-validation';
import { revalidatePath } from 'next/cache';
import type { Database } from '@/types/database';

type ScoreUpdate = Database['public']['Tables']['scores']['Update'];

export async function updateScoreAction(formData: FormData) {
  const user = await requireAuth();

  const scoreId = formData.get('scoreId') as string;
  const scoreRaw = formData.get('score') as string;
  const scoreDate = formData.get('scoreDate') as string;

  if (!scoreId) {
    return { error: 'Score ID is required.' };
  }

  const validation = validateScoreInput({ score: scoreRaw, scoreDate });
  if (!validation.isValid || validation.parsedScore === undefined) {
    return { error: validation.error };
  }

  const supabase = await createClient();

  const updatePayload: ScoreUpdate = {
    score: validation.parsedScore,
    score_date: scoreDate,
  };

  const { error } = await supabase
    .from('scores')
    .update(updatePayload)
    .eq('id', scoreId)
    .eq('user_id', user.id);

  if (error) {
    if (error.code === '23505') {
      return { error: 'Another round is already recorded on this date.' };
    }
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/scores');
  return { success: true };
}