import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge tailwind classes with clsx and tailwind-merge
 * @param inputs - Class names to merge
 * @returns Merged class names
 * @example
 * cn('px-2 py-1', condition && 'text-red-500', ['font-bold', 'text-sm'])
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
