import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const ease = [0.16, 1, 0.3, 1] as const

export function stagger(i: number, base = 0.08): number {
  return i * base
}
