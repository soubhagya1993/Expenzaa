import { MONTH_NAMES } from '../constants';

// ─── UUID Generator ──────────────────────────────────────────────────────────

export const generateId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${randomPart}`;
};

// ─── Currency Formatting ─────────────────────────────────────────────────────

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export const formatCurrencyShort = (amount: number): string => {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}k`;
  }
  return `$${amount.toFixed(0)}`;
};

// ─── Date Formatting ─────────────────────────────────────────────────────────

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffMs = today.getTime() - dateDay.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return `${MONTH_NAMES[date.getMonth()].substring(0, 3)} ${date.getDate()}`;
};

export const formatMonthYear = (month: number, year: number): string => {
  return `${MONTH_NAMES[month]} ${year}`;
};

export const getToday = (): string => {
  return new Date().toISOString();
};

export const isSameMonth = (
  dateStr: string,
  month: number,
  year: number
): boolean => {
  const date = new Date(dateStr);
  return date.getMonth() === month && date.getFullYear() === year;
};

// ─── Validation ──────────────────────────────────────────────────────────────

export const validateAmount = (value: string): string | null => {
  if (!value || value.trim() === '') return 'Amount is required';
  const num = parseFloat(value);
  if (isNaN(num)) return 'Enter a valid number';
  if (num <= 0) return 'Amount must be greater than 0';
  if (num > 999999.99) return 'Amount is too large';
  return null;
};

export const validateCategory = (categoryId: string | null): string | null => {
  if (!categoryId) return 'Please select a category';
  return null;
};

// ─── Greeting ────────────────────────────────────────────────────────────────

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

// ─── Day of Week ─────────────────────────────────────────────────────────────

export const getDayOfWeek = (isoString: string): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[new Date(isoString).getDay()];
};
