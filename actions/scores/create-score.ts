'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth/permissions';
import { validateScoreInput } from '@/lib/scores/score-validation';
import { revalidatePath } from 'next/cache';

export interface ScoreActionResponse {
  error?: string;
  success?: boolean;
}

export async function createScoreAction(formData: FormData): Promise<ScoreActionResponse> {
  const user = await requireAuth();

  const scoreRaw = formData.get('score') as string;
  const scoreDate = formData.get('scoreDate') as string;

  const validation = validateScoreInput({ score: scoreRaw, scoreDate });
  if (!validation.isValid || validation.parsedScore === undefined) {
    return { error: validation.error };
  }

  const supabase = await createClient();

  const { error } = await supabase.from('scores').insert([
    {
      user_id: user.id,
      score: validation.parsedScore,
      score_date: scoreDate,
    },
  ]);

  if (error) {
    if (error.code === '23505') {
      return { error: 'You have already logged a score for this round date.' };
    }
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/scores');
  return { success: true };
}