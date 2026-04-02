# 💰 Expense Tracker — Premium MVP

A clean, premium, minimal expense tracker mobile app built with React Native & Expo. Focused on fast input and clear financial insights.

---

## Tech Stack

| Layer            | Technology                              |
| ---------------- | --------------------------------------- |
| Framework        | React Native + Expo SDK 52              |
| Language         | TypeScript (strict mode)                |
| State Management | Zustand 5 with AsyncStorage persistence |
| Navigation       | React Navigation 7 (tabs + stack)       |
| Charts           | react-native-svg (hand-rolled donut/bar)|
| Icons            | @expo/vector-icons (Ionicons)           |
| UI               | Custom soft-UI component library        |

---

## Features

### ✅ Onboarding
- 3-slide carousel with gradient icons
- Skip / Next / Get Started flow
- Persisted — shows only once

### ✅ Home Dashboard
- Greeting with time-of-day context
- Monthly total spent card
- Spending by category with color-coded progress bars
- Recent transactions list with swipe-to-delete
- Floating Action Button to add expenses

### ✅ Add Expense
- Large amount input with decimal validation
- Category selector grid (7 categories)
- Date picker (defaults to today)
- Optional note field
- Full input validation with error states

### ✅ Statistics
- Month navigator (back/forward)
- Total spending card
- Donut chart with category distribution & legend
- Weekly bar chart
- Daily average & days tracked

### ✅ Settings
- Profile card with avatar
- Menu items: Profile, Notifications, Privacy, Help
- Logout (placeholder)

---

## Project Structure

```
expense-tracker/
├── App.tsx                    # Entry point
├── app.json                   # Expo config
├── package.json
├── tsconfig.json              # Strict TypeScript
├── babel.config.js
├── assets/
│   └── README.md
└── src/
    ├── components/
    │   ├── index.ts           # Barrel export
    │   ├── AmountInput.tsx    # Large $ input with validation
    │   ├── BarChart.tsx       # Weekly spending bars
    │   ├── CategoryRow.tsx    # Home: category + progress bar
    │   ├── CategorySelector.tsx # Grid picker for add screen
    │   ├── DonutChart.tsx     # SVG donut with legend
    │   ├── EmptyState.tsx     # Friendly empty states
    │   └── ExpenseCard.tsx    # Transaction row card
    ├── constants/
    │   └── index.ts           # Colors, categories, spacing, fonts
    ├── hooks/
    │   └── index.ts           # useMonthlyStats, useWeeklySpending
    ├── navigation/
    │   ├── index.ts
    │   └── AppNavigator.tsx   # Tab + Stack navigation
    ├── screens/
    │   ├── index.ts
    │   ├── OnboardingScreen.tsx
    │   ├── HomeScreen.tsx
    │   ├── AddExpenseScreen.tsx
    │   ├── StatsScreen.tsx
    │   └── SettingsScreen.tsx
    ├── store/
    │   ├── index.ts
    │   └── useExpenseStore.ts # Zustand + AsyncStorage
    ├── types/
    │   └── index.ts           # All TypeScript interfaces
    └── utils/
        └── index.ts           # UUID, formatting, validation
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (`npx expo`)
- iOS Simulator (macOS) or Android Emulator, or Expo Go app on your phone

### Installation

```bash
# 1. Navigate to project
cd expense-tracker

# 2. Install dependencies
npm install

# 3. Add placeholder assets (required by Expo)
#    Place a 1024x1024 icon.png in /assets/
#    Or create a simple placeholder:
npx expo install expo-asset
echo "" > assets/icon.png

# 4. Start the development server
npx expo start
```

### Running on Devices

```bash
# iOS Simulator
npx expo start --ios

# Android Emulator
npx expo start --android

# Physical device — scan QR code with Expo Go app
npx expo start
```

---

## State Management

Zustand store with automatic AsyncStorage persistence:

```typescript
// Reading state
const total = useExpenseStore((s) => s.getMonthlyTotal());
const expenses = useExpenseStore((s) => s.getRecentExpenses(10));

// Mutations
const addExpense = useExpenseStore((s) => s.addExpense);
addExpense({ amount: 42.50, categoryId: 'food', date: new Date().toISOString() });
```

**Persisted fields:** `expenses`, `hasOnboarded`
**Rehydration:** automatic via `onRehydrateStorage` callback

---

## Data Models

```typescript
interface Expense {
  id: string;         // Auto-generated UUID
  amount: number;     // Positive decimal
  categoryId: string; // References Category.id
  date: string;       // ISO 8601 string
  note?: string;      // Optional description
}

interface Category {
  id: string;
  name: string;
  icon: string;       // Ionicons name
  color: string;      // Hex color
}
```

---

## Categories

| Category      | Color   | Icon                  |
| ------------- | ------- | --------------------- |
| Food          | #10B981 | restaurant-outline    |
| Transport     | #3B82F6 | car-outline           |
| Shopping      | #8B5CF6 | bag-handle-outline    |
| Entertainment | #F59E0B | game-controller       |
| Bills         | #EF4444 | receipt-outline       |
| Health        | #EC4899 | heart-outline         |
| Others        | #6B7280 | ellipsis-horizontal   |

---

## Design System

- **Primary:** `#2EC4B6` (Teal)
- **Background:** `#F4F5FA`
- **Surface/Cards:** `#FFFFFF`
- **Border radius:** 16–24px
- **Shadows:** Soft, layered (0.08–0.12 opacity)
- **Theme:** Light only

---

## Scaling Roadmap

This MVP is architected to scale. Suggested next steps:

1. **Budget Limits** — per-category budgets with alerts
2. **Export** — CSV/PDF expense reports
3. **Recurring Expenses** — auto-add monthly bills
4. **Currency Support** — multi-currency with conversion
5. **Cloud Sync** — Supabase or Firebase backend
6. **Dark Mode** — extend the COLORS constant
7. **Biometric Lock** — expo-local-authentication

---

## License

MIT
