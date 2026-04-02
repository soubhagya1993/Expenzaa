import { useCallback, useMemo } from 'react';
import { useExpenseStore } from '../store';
import { CATEGORIES, getCategoryById } from '../constants';
import { CategoryTotal } from '../types';

// ─── Monthly stats hook ──────────────────────────────────────────────────────

export const useMonthlyStats = (month?: number, year?: number) => {
  const getMonthlyTotal = useExpenseStore((s) => s.getMonthlyTotal);
  const getCategoryTotals = useExpenseStore((s) => s.getCategoryTotals);
  const expenses = useExpenseStore((s) => s.expenses);

  const total = useMemo(
    () => getMonthlyTotal(month, year),
    [expenses, month, year, getMonthlyTotal]
  );

  const categoryTotals = useMemo(
    () => getCategoryTotals(month, year),
    [expenses, month, year, getCategoryTotals]
  );

  return { total, categoryTotals };
};

// ─── Category helper hook ────────────────────────────────────────────────────

export const useCategoryLookup = () => {
  return useCallback((categoryId: string) => {
    return getCategoryById(categoryId) ?? CATEGORIES[CATEGORIES.length - 1];
  }, []);
};

// ─── Weekly spending hook (for stats chart) ──────────────────────────────────

export const useWeeklySpending = () => {
  const expenses = useExpenseStore((s) => s.expenses);

  return useMemo(() => {
    const now = new Date();
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const result: { day: string; amount: number }[] = [];

    // Get start of current week (Monday)
    const currentDay = now.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(now);
    monday.setDate(now.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const dayStart = new Date(monday);
      dayStart.setDate(monday.getDate() + i);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayStart.getDate() + 1);

      const dayTotal = expenses
        .filter((e) => {
          const d = new Date(e.date);
          return d >= dayStart && d < dayEnd;
        })
        .reduce((sum, e) => sum + e.amount, 0);

      result.push({ day: days[i], amount: dayTotal });
    }

    return result;
  }, [expenses]);
};
