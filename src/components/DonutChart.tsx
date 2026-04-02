import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { CategoryTotal } from '../types';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { getCategoryById } from '../constants';
import { formatCurrency } from '../utils';

interface Props {
  data: CategoryTotal[];
  totalAmount: number;
  size?: number;
  strokeWidth?: number;
}

export const DonutChart: React.FC<Props> = ({
  data,
  totalAmount,
  size = 200,
  strokeWidth = 28,
}) => {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercentage = 0;

  const segments = data.map((item) => {
    const category = getCategoryById(item.categoryId);
    const percentage = item.percentage / 100;
    const strokeDasharray = `${circumference * percentage} ${circumference * (1 - percentage)}`;
    const rotation = cumulativePercentage * 360;
    cumulativePercentage += percentage;

    return {
      ...item,
      color: category?.color ?? COLORS.others,
      strokeDasharray,
      rotation,
      name: category?.name ?? 'Other',
    };
  });

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Svg width={size} height={size}>
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={COLORS.border}
            strokeWidth={strokeWidth}
            fill="none"
          />
        </Svg>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.chartWrap}>
        <Svg width={size} height={size}>
          <G rotation={-90} origin={`${center}, ${center}`}>
            {segments.map((seg, i) => (
              <Circle
                key={seg.categoryId}
                cx={center}
                cy={center}
                r={radius}
                stroke={seg.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={0}
                rotation={seg.rotation}
                origin={`${center}, ${center}`}
                strokeLinecap="butt"
              />
            ))}
          </G>
        </Svg>
      </View>

      {/* Legend - 2 column grid matching Figma */}
      <View style={styles.legend}>
        {segments.map((seg) => (
          <View key={seg.categoryId} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: seg.color }]} />
            <View style={styles.legendText}>
              <Text style={styles.legendName}>{seg.name}</Text>
              <Text style={styles.legendValue}>
                {formatCurrency(seg.total)} ({seg.percentage.toFixed(1)}%)
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chartWrap: {
    marginBottom: SPACING.xl,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: SPACING.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '50%',
    marginBottom: SPACING.md,
    paddingRight: SPACING.sm,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
    marginRight: SPACING.sm,
  },
  legendText: {
    flex: 1,
  },
  legendName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 1,
  },
  legendValue: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
});
