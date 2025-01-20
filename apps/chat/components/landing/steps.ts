export const STEPS = [
  { id: 1, translationKey: 'landing.main.steps.1' as const },
  { id: 2, translationKey: 'landing.main.steps.2' as const },
  { id: 3, translationKey: 'landing.main.steps.3' as const },
] as const;

export type Step = (typeof STEPS)[number];
export type StepTranslationKey = (typeof STEPS)[number]['translationKey'];
