// ─── Data Models ─────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Expense {
  id: string;
  amount: number;
  categoryId: string;
  date: string; // ISO string
  note?: string;
}

// ─── Store Types ─────────────────────────────────────────────────────────────

export interface CategoryTotal {
  categoryId: string;
  total: number;
  percentage: number;
  count: number;
}

export interface ExpenseStore {
  expenses: Expense[];
  isHydrated: boolean;
  hasOnboarded: boolean;

  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  getMonthlyTotal: (month?: number, year?: number) => number;
  getCategoryTotals: (month?: number, year?: number) => CategoryTotal[];
  getRecentExpenses: (limit?: number) => Expense[];
  getExpensesForMonth: (month: number, year: number) => Expense[];
  setHydrated: (state: boolean) => void;
  setOnboarded: () => void;
}

// ─── Component Props ─────────────────────────────────────────────────────────

export interface AmountInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

export interface CategorySelectorProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  error?: string;
}

export interface ExpenseCardProps {
  expense: Expense;
  onDelete?: (id: string) => void;
}

export interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
}

export interface CategoryRowProps {
  category: Category;
  amount: number;
  maxAmount: number;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export type RootTabParamList = {
  Home: undefined;
  Stats: undefined;
  Settings: undefined;
};
