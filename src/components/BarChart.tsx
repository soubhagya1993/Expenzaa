import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';

interface BarData {
  day: string;
  amount: number;
}

interface Props {
  data: BarData[];
  height?: number;
}

export const WeeklyBarChart: React.FC<Props> = ({ data, height = 160 }) => {
  const maxAmount = Math.max(...data.map((d) => d.amount), 1);

  // Y-axis labels
  const yLabels = [0, Math.round(maxAmount * 0.25), Math.round(maxAmount * 0.5), Math.round(maxAmount * 0.75), Math.round(maxAmount)].reverse();

  return (
    <View style={styles.container}>
      <View style={styles.chartArea}>
        {/* Y-axis labels */}
        <View style={[styles.yAxis, { height }]}>
          {yLabels.map((val, i) => (
            <Text key={i} style={styles.yLabel}>
              {val}
            </Text>
          ))}
        </View>

        {/* Bars */}
        <View style={[styles.barsContainer, { height }]}>
          {/* Grid lines */}
          {yLabels.map((_, i) => (
            <View
              key={`grid-${i}`}
              style={[
                styles.gridLine,
                { top: (i / (yLabels.length - 1)) * height },
              ]}
            />
          ))}

          {/* Bar items */}
          <View style={styles.barsRow}>
            {data.map((item, i) => {
              const barHeight = maxAmount > 0 ? (item.amount / maxAmount) * height : 0;
              return (
                <View key={item.day} style={styles.barCol}>
                  <View style={[styles.barTrack, { height }]}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: Math.max(barHeight, 4),
                          backgroundColor: COLORS.primary,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.dayLabel}>{item.day}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING.sm,
  },
  chartArea: {
    flexDirection: 'row',
  },
  yAxis: {
    width: 36,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: SPACING.sm,
  },
  yLabel: {
    fontSize: 10,
    color: COLORS.textTertiary,
  },
  barsContainer: {
    flex: 1,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.divider,
  },
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '100%',
  },
  barCol: {
    alignItems: 'center',
    flex: 1,
  },
  barTrack: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  bar: {
    width: 24,
    borderRadius: 6,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    fontWeight: '500',
  },
});
