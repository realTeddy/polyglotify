import type { ProgressState } from '@/types';

function storageKey(known: string, learning: string): string {
  return `polyglotify:progress:${known}:${learning}`;
}

export function getProgress(known: string, learning: string): ProgressState | null {
  const raw = localStorage.getItem(storageKey(known, learning));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ProgressState;
  } catch {
    return null;
  }
}

export function saveProgress(state: ProgressState): void {
  const key = storageKey(state.knownLang, state.learningLang);
  localStorage.setItem(key, JSON.stringify(state));
}

export function markFeatureComplete(known: string, learning: string, featureSlug: string): void {
  let progress = getProgress(known, learning);
  if (!progress) {
    progress = { knownLang: known, learningLang: learning, completed: [], lastFeature: null };
  }
  if (!progress.completed.includes(featureSlug)) {
    progress.completed.push(featureSlug);
  }
  progress.lastFeature = featureSlug;
  saveProgress(progress);
}

export function isFeatureComplete(known: string, learning: string, featureSlug: string): boolean {
  const progress = getProgress(known, learning);
  return progress?.completed.includes(featureSlug) ?? false;
}

export function getCompletedCount(known: string, learning: string): number {
  const progress = getProgress(known, learning);
  return progress?.completed.length ?? 0;
}

export function getNextIncompleteFeature(
  known: string,
  learning: string,
  allFeatureSlugs: string[]
): string | null {
  const progress = getProgress(known, learning);
  const completed = new Set(progress?.completed ?? []);
  return allFeatureSlugs.find((slug) => !completed.has(slug)) ?? null;
}

export function clearProgress(known: string, learning: string): void {
  localStorage.removeItem(storageKey(known, learning));
}

export function getAllProgressKeys(): { known: string; learning: string }[] {
  const results: { known: string; learning: string }[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith('polyglotify:progress:')) continue;
    const parts = key.split(':');
    results.push({ known: parts[2], learning: parts[3] });
  }
  return results;
}
