export const STEPS = [
  { id: 1, text: 'Enter your OpenAPI URL or upload a file' },
  { id: 2, text: 'Wait for the documentation to be processed' },
  { id: 3, text: 'Start chatting with your API documentation' },
] as const;

export type Step = (typeof STEPS)[number];
export type StepText = (typeof STEPS)[number]['text'];
