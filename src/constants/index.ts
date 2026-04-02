import { Category } from '../types';

// ─── Colors (extracted from Figma designs) ───────────────────────────────────

export const COLORS = {
  // Primary — Teal/Cyan from Figma
  primary: '#2EC4B6',
  primaryDark: '#1AA898',
  primaryLight: '#E0F7F5',
  primaryGradientStart: '#2EC4B6',
  primaryGradientEnd: '#1AA898',

  // Backgrounds
  background: '#F4F5FA',
  surface: '#FFFFFF',
  cardBg: '#FFFFFF',

  // Text
  textPrimary: '#1E2A3A',
  textSecondary: '#7B8794',
  textTertiary: '#A0ADB8',
  textWhite: '#FFFFFF',

  // Semantic
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  logout: '#EF4444',

  // UI
  border: '#EEF0F6',
  divider: '#F0F2F8',
  shadow: 'rgba(30, 42, 58, 0.08)',
  shadowDark: 'rgba(30, 42, 58, 0.12)',
  overlay: 'rgba(0, 0, 0, 0.4)',

  // Category colors (from Figma donut chart)
  food: '#10B981',       // Green
  transport: '#3B82F6',  // Blue
  shopping: '#8B5CF6',   // Purple
  entertainment: '#F59E0B', // Amber/Orange
  bills: '#EF4444',      // Red
  health: '#EC4899',     // Pink
  others: '#6B7280',     // Grey
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────

export const FONTS = {
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
} as const;

export const FONT_SIZES = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
} as const;

// ─── Border Radius ───────────────────────────────────────────────────────────

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

// ─── Shadows (soft UI) ──────────────────────────────────────────────────────

export const SHADOWS = {
  sm: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  lg: {
    shadowColor: COLORS.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;

// ─── Categories (matching Figma) ─────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  { id: 'food', name: 'Food', icon: 'restaurant-outline', color: COLORS.food },
  { id: 'transport', name: 'Transport', icon: 'car-outline', color: COLORS.transport },
  { id: 'shopping', name: 'Shopping', icon: 'bag-handle-outline', color: COLORS.shopping },
  { id: 'entertainment', name: 'Entertainment', icon: 'game-controller-outline', color: COLORS.entertainment },
  { id: 'bills', name: 'Bills', icon: 'receipt-outline', color: COLORS.bills },
  { id: 'health', name: 'Health', icon: 'heart-outline', color: COLORS.health },
  { id: 'others', name: 'Others', icon: 'ellipsis-horizontal-circle-outline', color: COLORS.others },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const getCategoryById = (id: string): Category | undefined =>
  CATEGORIES.find((c) => c.id === id);

// ─── Onboarding slides ──────────────────────────────────────────────────────

export const ONBOARDING_SLIDES = [
  {
    id: '1',
    icon: 'wallet-outline',
    iconBg: COLORS.primary,
    title: 'Track your expenses',
    subtitle: 'easily',
    description: 'Easily manage and track all your daily expenses in one place',
  },
  {
    id: '2',
    icon: 'pie-chart-outline',
    iconBg: '#7C5CBF',
    title: 'Understand your spending',
    subtitle: 'with visual insights',
    description: 'Get detailed insights about your spending habits with beautiful charts',
  },
  {
    id: '3',
    icon: 'trending-up-outline',
    iconBg: '#5B7FD6',
    title: 'Take control',
    subtitle: 'of your money',
    description: 'Make better financial decisions with data-driven insights',
  },
];

// ─── Month names ─────────────────────────────────────────────────────────────

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
