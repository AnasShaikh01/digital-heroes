import type { Database } from '@/types/database';

export type ScoreRow = Database['public']['Tables']['scores']['Row'];

export function calculateScoreStats(scores: ScoreRow[]) {
  if (!scores || scores.length === 0) {
    return {
      count: 0,
      average: 0,
      highest: 0,
      lowest: 0,
      isBufferComplete: false,
    };
  }

  const values = scores.map((s) => s.score);
  const total = values.reduce((acc, curr) => acc + curr, 0);

  return {
    count: scores.length,
    average: Math.round((total / scores.length) * 10) / 10,
    highest: Math.max(...values),
    lowest: Math.min(...values),
    isBufferComplete: scores.length === 5,
  };
}