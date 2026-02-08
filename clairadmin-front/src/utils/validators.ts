export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function clampNumber(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}
