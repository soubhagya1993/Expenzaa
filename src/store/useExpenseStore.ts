import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense, ExpenseStore, CategoryTotal } from '../types';
import { generateId, isSameMonth } from '../utils';
import { CATEGORIES } from '../constants';

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [],
      isHydrated: false,
      hasOnboarded: false,

      addExpense: (expenseData) => {
        const newExpense: Expense = {
          ...expenseData,
          id: generateId(),
        };
        set((state) => ({
          expenses: [newExpense, ...state.expenses],
        }));
      },

      deleteExpense: (id) => {
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        }));
      },

      getMonthlyTotal: (month?: number, year?: number) => {
        const now = new Date();
        const m = month ?? now.getMonth();
        const y = year ?? now.getFullYear();

        return get().expenses
          .filter((e) => isSameMonth(e.date, m, y))
          .reduce((sum, e) => sum + e.amount, 0);
      },

      getCategoryTotals: (month?: number, year?: number) => {
        const now = new Date();
        const m = month ?? now.getMonth();
        const y = year ?? now.getFullYear();

        const filtered = get().expenses.filter((e) => isSameMonth(e.date, m, y));
        const total = filtered.reduce((sum, e) => sum + e.amount, 0);

        const totalsMap = new Map<string, { total: number; count: number }>();

        CATEGORIES.forEach((cat) => {
          totalsMap.set(cat.id, { total: 0, count: 0 });
        });

        filtered.forEach((e) => {
          const existing = totalsMap.get(e.categoryId);
          if (existing) {
            existing.total += e.amount;
            existing.count += 1;
          }
        });

        const result: CategoryTotal[] = [];
        totalsMap.forEach((value, categoryId) => {
          if (value.total > 0) {
            result.push({
              categoryId,
              total: value.total,
              percentage: total > 0 ? (value.total / total) * 100 : 0,
              count: value.count,
            });
          }
        });

        return result.sort((a, b) => b.total - a.total);
      },

      getRecentExpenses: (limit = 10) => {
        return [...get().expenses]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit);
      },

      getExpensesForMonth: (month: number, year: number) => {
        return get().expenses
          .filter((e) => isSameMonth(e.date, month, year))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },

      setHydrated: (state) => set({ isHydrated: state }),

      setOnboarded: () => set({ hasOnboarded: true }),
    }),
    {
      name: 'expense-tracker-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (state) => ({
        expenses: state.expenses,
        hasOnboarded: state.hasOnboarded,
      }),
    }
  )
);
