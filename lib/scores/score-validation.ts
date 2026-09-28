export interface ScoreInput {
  score: number | string;
  scoreDate: string; // YYYY-MM-DD
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  parsedScore?: number;
}

export function validateScoreInput(input: ScoreInput): ValidationResult {
  const rawScoreStr = String(input.score).trim();

  // Reject empty, non-digit, or decimal inputs
  if (!/^\d+$/.test(rawScoreStr)) {
    return { isValid: false, error: 'Stableford score must be a whole integer between 1 and 45.' };
  }

  const score = Number(rawScoreStr);
  if (!Number.isInteger(score) || score < 1 || score > 45) {
    return { isValid: false, error: 'Stableford score must be an integer between 1 and 45 points.' };
  }

  // Strict YYYY-MM-DD format check
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = dateRegex.exec(input.scoreDate);
  if (!match) {
    return { isValid: false, error: 'Round date must follow the YYYY-MM-DD calendar format.' };
  }

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  // Exact calendar validity check (e.g. catches 2026-02-31)
  const dateObj = new Date(year, month - 1, day);
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getDate() !== day
  ) {
    return { isValid: false, error: 'Please enter a real calendar date.' };
  }

  // Local calendar comparison: normalize today's local date to YYYY-MM-DD
  const now = new Date();
  const localYear = now.getFullYear();
  const localMonth = String(now.getMonth() + 1).padStart(2, '0');
  const localDay = String(now.getDate()).padStart(2, '0');
  const todayLocalDate = `${localYear}-${localMonth}-${localDay}`;

  if (input.scoreDate > todayLocalDate) {
    return { isValid: false, error: 'Round date cannot be set in the future.' };
  }

  return { isValid: true, parsedScore: score };
}