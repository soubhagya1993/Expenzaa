import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Expense } from '../types';
import { COLORS, SPACING, RADIUS, SHADOWS, FONT_SIZES } from '../constants';
import { getCategoryById } from '../constants';
import { formatCurrency, formatDate } from '../utils';

interface Props {
  expense: Expense;
  onDelete?: (id: string) => void;
}

export const ExpenseCard: React.FC<Props> = ({ expense, onDelete }) => {
  const category = getCategoryById(expense.categoryId);

  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: `${category?.color ?? COLORS.others}15` }]}>
        <Ionicons
          name={(category?.icon ?? 'ellipsis-horizontal-circle-outline') as any}
          size={22}
          color={category?.color ?? COLORS.others}
        />
      </View>

      <View style={styles.details}>
        <Text style={styles.note} numberOfLines={1}>
          {expense.note || category?.name || 'Expense'}
        </Text>
        <Text style={styles.categoryLabel}>{category?.name ?? 'Other'}</Text>
      </View>

      <View style={styles.amountCol}>
        <Text style={styles.amount}>-{formatCurrency(expense.amount)}</Text>
        <Text style={styles.date}>{formatDate(expense.date)}</Text>
      </View>

      {onDelete && (
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => onDelete(expense.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash-outline" size={16} color={COLORS.error} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  details: {
    flex: 1,
  },
  note: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  categoryLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  amountCol: {
    alignItems: 'flex-end',
    marginLeft: SPACING.sm,
  },
  amount: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  date: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
  },
  deleteBtn: {
    marginLeft: SPACING.sm,
    padding: SPACING.xs,
  },
});
