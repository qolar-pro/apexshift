import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(value);
}

export function parseMath(input: string): number | null {
  try {
    // Basic safe math parser using Function constructor (only for simple arithmetic)
    // In a real app, use a proper math library like mathjs
    const sanitized = input.replace(/[^0-9+\-*/().\s]/g, '');
    if (!sanitized) return null;
    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${sanitized}`)();
    return typeof result === 'number' ? result : null;
  } catch {
    return null;
  }
}

export function getBiMonthlyPeriod(date: Date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  
  if (day <= 15) {
    return {
      id: 1,
      start: 1,
      end: 15,
      label: 'Period 1'
    };
  } else {
    const lastDay = new Date(year, month + 1, 0).getDate();
    return {
      id: 2,
      start: 16,
      end: lastDay,
      label: 'Period 2'
    };
  }
}

export function getDaysInPeriod(year: number, month: number, periodId: number, mode: 'BI_MONTHLY' | 'WEEKLY' | 'MONTHLY' = 'BI_MONTHLY') {
  const days = [];
  let start = 1;
  let end = new Date(year, month + 1, 0).getDate();

  if (mode === 'BI_MONTHLY') {
    start = periodId === 1 ? 1 : 16;
    end = periodId === 1 ? 15 : new Date(year, month + 1, 0).getDate();
  } else if (mode === 'WEEKLY') {
    start = (periodId - 1) * 7 + 1;
    if (periodId === 4) {
      end = new Date(year, month + 1, 0).getDate();
    } else {
      end = Math.min(periodId * 7, new Date(year, month + 1, 0).getDate());
    }
  } else if (mode === 'MONTHLY') {
    start = 1;
    end = new Date(year, month + 1, 0).getDate();
  }
  
  for (let i = start; i <= end; i++) {
    const date = new Date(year, month, i);
    days.push({
      day: i,
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      date
    });
  }
  return days;
}
