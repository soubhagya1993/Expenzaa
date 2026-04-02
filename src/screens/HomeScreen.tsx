import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useExpenseStore } from '../store';
import { useMonthlyStats, useCategoryLookup } from '../hooks';
import { getCategoryById, COLORS, SPACING, RADIUS, SHADOWS, FONT_SIZES, CATEGORIES } from '../constants';
import { formatCurrency, getGreeting } from '../utils';
import { ExpenseCard, CategoryRow, EmptyState } from '../components';
import { Expense } from '../types';

export const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const expenses = useExpenseStore((s) => s.expenses);
  const getRecentExpenses = useExpenseStore((s) => s.getRecentExpenses);
  const deleteExpense = useExpenseStore((s) => s.deleteExpense);
  const getMonthlyTotal = useExpenseStore((s) => s.getMonthlyTotal);
  const { total, categoryTotals } = useMonthlyStats();

  const now = new Date();
  const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  const prevYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const prevTotal = getMonthlyTotal(prevMonth, prevYear);
  const trendPercent = prevTotal > 0 ? ((total - prevTotal) / prevTotal) * 100 : null;
  const trendUp = trendPercent !== null && trendPercent >= 0;

  const recentExpenses = getRecentExpenses(5);
  const maxCategoryAmount = categoryTotals.length > 0
    ? Math.max(...categoryTotals.map((c) => c.total))
    : 0;

  const handleDelete = useCallback((id: string) => {
    deleteExpense(id);
  }, [deleteExpense]);

  const renderHeader = () => (
    <View>
      {/* Greeting Header */}
      <LinearGradient
        colors={[COLORS.primaryLight, COLORS.background]}
        style={[styles.headerGradient, { paddingTop: insets.top + SPACING.lg }]}
      >
        <Text style={styles.greeting}>{getGreeting()}</Text>
      </LinearGradient>

      {/* Total Spent Card */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total spent this month</Text>
        <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
        {total > 0 && trendPercent !== null && (
          <View style={styles.trendRow}>
            <Ionicons
              name={trendUp ? 'trending-up' : 'trending-down'}
              size={14}
              color={trendUp ? COLORS.primary : COLORS.error}
            />
            <Text style={[styles.trendText, !trendUp && { color: COLORS.error }]}>
              {' '}{Math.abs(Math.round(trendPercent))}% vs last month
            </Text>
          </View>
        )}
      </View>

      {/* Spending by Category */}
      {categoryTotals.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spending by Category</Text>
          {categoryTotals.slice(0, 4).map((ct) => {
            const category = getCategoryById(ct.categoryId);
            if (!category) return null;
            return (
              <CategoryRow
                key={ct.categoryId}
                category={category}
                amount={ct.total}
                maxAmount={maxCategoryAmount}
              />
            );
          })}
        </View>
      )}

      {/* Recent Transactions Header */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {recentExpenses.length > 0 && (
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const renderExpense = ({ item }: { item: Expense }) => (
    <View style={styles.listPadding}>
      <ExpenseCard expense={item} onDelete={handleDelete} />
    </View>
  );

  const renderEmpty = () => (
    <EmptyState
      icon="wallet-outline"
      title="No expenses yet"
      subtitle="Tap the + button to add your first expense"
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primaryLight} />

      <FlatList
        data={recentExpenses}
        renderItem={renderExpense}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB - matching Figma teal circular button */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 80 }]}
        onPress={() => navigation.navigate('AddExpense')}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={[COLORS.primaryGradientStart, COLORS.primaryGradientEnd]}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={28} color={COLORS.textWhite} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingBottom: 140,
  },
  listPadding: {
    paddingHorizontal: SPACING.xl,
  },
  // Header
  headerGradient: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  greeting: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  // Total Card
  totalCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.xl,
    marginTop: -SPACING.xs,
    borderRadius: RADIUS.xl,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING['2xl'],
    alignItems: 'center',
    ...SHADOWS.md,
    marginBottom: SPACING.xl,
  },
  totalLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  totalAmount: {
    fontSize: FONT_SIZES['4xl'],
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -1,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  trendText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: '500',
  },
  // Sections
  section: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  viewAll: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: SPACING.lg,
  },
  // FAB
  fab: {
    position: 'absolute',
    right: SPACING.xl,
    zIndex: 10,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.lg,
  },
});
