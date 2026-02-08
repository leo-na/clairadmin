export function bytesToSizeLabel(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let idx = 0;
  let val = bytes;

  while (val >= 1024 && idx < units.length - 1) {
    val /= 1024;
    idx += 1;
  }

  const rounded = idx === 0 ? Math.round(val) : Math.round(val * 10) / 10;
  return `${rounded} ${units[idx]}`;
}

export function normalizeFileName(name: string): string {
  // Simple: remplace espaces par underscore, retire caractères problématiques
  return name
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w.\-]/g, "")
    .slice(0, 120);
}
