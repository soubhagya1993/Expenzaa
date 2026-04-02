import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useExpenseStore } from '../store';
import { useMonthlyStats, useWeeklySpending } from '../hooks';
import {
  COLORS,
  SPACING,
  RADIUS,
  SHADOWS,
  FONT_SIZES,
  MONTH_NAMES,
} from '../constants';
import { formatCurrency, formatMonthYear } from '../utils';
import { DonutChart, WeeklyBarChart, EmptyState } from '../components';

export const StatsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const now = new Date();

  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const { total, categoryTotals } = useMonthlyStats(selectedMonth, selectedYear);
  const weeklyData = useWeeklySpending();
  const getExpensesForMonth = useExpenseStore((s) => s.getExpensesForMonth);

  const monthExpenses = useMemo(
    () => getExpensesForMonth(selectedMonth, selectedYear),
    [selectedMonth, selectedYear, getExpensesForMonth]
  );

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const daysTracked = new Set(
    monthExpenses.map((e) => new Date(e.date).getDate())
  ).size;
  const dailyAvg = daysTracked > 0 ? total / daysTracked : 0;

  const navigateMonth = (direction: -1 | 1) => {
    let newMonth = selectedMonth + direction;
    let newYear = selectedYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    // Don't go into the future
    const nowDate = new Date();
    if (newYear > nowDate.getFullYear()) return;
    if (newYear === nowDate.getFullYear() && newMonth > nowDate.getMonth()) return;

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const isCurrentMonth =
    selectedMonth === now.getMonth() && selectedYear === now.getFullYear();

  const hasData = categoryTotals.length > 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + SPACING.lg }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text style={styles.screenTitle}>Statistics</Text>

      {/* Month Selector - matches Figma dropdown look */}
      <View style={styles.monthSelector}>
        <TouchableOpacity
          onPress={() => navigateMonth(-1)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
        <View style={styles.monthDisplay}>
          <Text style={styles.monthText}>
            {formatMonthYear(selectedMonth, selectedYear)}
          </Text>
          <Ionicons name="chevron-down" size={14} color={COLORS.textTertiary} />
        </View>
        <TouchableOpacity
          onPress={() => navigateMonth(1)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          disabled={isCurrentMonth}
          accessibilityLabel="Next month"
          accessibilityState={{ disabled: isCurrentMonth }}
        >
          <Ionicons
            name="chevron-forward"
            size={20}
            color={isCurrentMonth ? COLORS.border : COLORS.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Total Spending Card */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Spending</Text>
        <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
      </View>

      {!hasData ? (
        <EmptyState
          icon="bar-chart-outline"
          title="No data for this month"
          subtitle="Start adding expenses to see your statistics"
        />
      ) : (
        <>
          {/* Category Distribution - Donut Chart */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category Distribution</Text>
            <View style={styles.chartCard}>
              <DonutChart data={categoryTotals} totalAmount={total} />
            </View>
          </View>

          {/* Weekly Spending - Bar Chart */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weekly Spending</Text>
            <View style={styles.chartCard}>
              <WeeklyBarChart data={weeklyData} />
            </View>
          </View>

          {/* Summary Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Daily Average</Text>
              <Text style={styles.statValue}>{formatCurrency(dailyAvg)}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Days Tracked</Text>
              <Text style={styles.statValue}>{daysTracked}</Text>
            </View>
          </View>
        </>
      )}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.xl,
  },
  screenTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xl,
  },
  // Month selector
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    ...SHADOWS.sm,
    marginBottom: SPACING.xl,
  },
  monthDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  monthText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  // Total card
  totalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING['2xl'],
    alignItems: 'center',
    ...SHADOWS.md,
    marginBottom: SPACING['2xl'],
  },
  totalLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  totalAmount: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  // Sections
  section: {
    marginBottom: SPACING['2xl'],
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  chartCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    ...SHADOWS.sm,
  },
  // Bottom stats row
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    ...SHADOWS.sm,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
});
