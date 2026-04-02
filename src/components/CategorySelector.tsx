import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, COLORS, SPACING, RADIUS, FONT_SIZES, SHADOWS } from '../constants';

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
  error?: string;
}

export const CategorySelector: React.FC<Props> = ({ selectedId, onSelect, error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <View style={styles.grid}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedId === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.item,
                isSelected && { borderColor: cat.color, borderWidth: 2, backgroundColor: `${cat.color}08` },
              ]}
              onPress={() => onSelect(cat.id)}
              activeOpacity={0.7}
              accessibilityRole="radio"
              accessibilityLabel={cat.name}
              accessibilityState={{ checked: isSelected }}
            >
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: `${cat.color}18` },
                  isSelected && { backgroundColor: `${cat.color}25` },
                ]}
              >
                <Ionicons name={cat.icon as any} size={22} color={cat.color} />
              </View>
              <Text
                style={[
                  styles.itemLabel,
                  isSelected && { color: cat.color, fontWeight: '700' },
                ]}
                numberOfLines={1}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
  item: {
    width: '25%',
    paddingHorizontal: SPACING.xs,
    marginBottom: SPACING.md,
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  itemLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  error: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
  },
});
