import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, type, spacing, radii } from '../theme/theme';

export default function StreakCard({ platform, title, subtitle, current, goal, accent }) {
  const pct = Math.min(current / goal, 1);
  return (
    <View style={[styles.card, { borderColor: accent }]}>
      <View style={styles.topRow}>
        <Text style={[styles.platformTag, { color: accent }]}>{platform}</Text>
        <Text style={styles.count}>
          {current}
          <Text style={styles.countGoal}> /{goal}</Text>
        </Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: accent }]} />
      </View>
      {/* bubble tail — small triangle nodding to Snap chat bubbles */}
      <View style={[styles.tail, { borderTopColor: colors.bgCard }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    padding: spacing.md,
    flex: 1,
    position: 'relative',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  platformTag: {
    fontFamily: type.mono,
    fontSize: 11,
    letterSpacing: 1,
  },
  count: {
    fontFamily: type.mono,
    fontSize: 18,
    color: colors.textPrimary,
  },
  countGoal: {
    fontSize: 12,
    color: colors.textMuted,
  },
  title: {
    fontFamily: type.displayMedium,
    fontSize: 16,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  subtitle: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  track: {
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(23,24,28,0.06)',
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radii.pill,
  },
  tail: {
    position: 'absolute',
    bottom: -8,
    left: 24,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
