import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, type, spacing, radii } from '../theme/theme';

export default function AppHeader({ onBack, streak = 4 }) {
  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={onBack}
        style={({ pressed }) => [styles.back, pressed && styles.pressed]}
      >
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <Text style={styles.title} pointerEvents="none">
        <Text style={styles.titleSnap}>Snap</Text>Blox
      </Text>

      <View style={styles.streak}>
        <Text style={styles.streakText}>Day {streak}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  back: {
    backgroundColor: colors.cardDark,
    borderRadius: radii.pill,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  pressed: {
    opacity: 0.6,
  },
  backText: {
    fontFamily: type.bodySemibold,
    fontSize: 13,
    color: colors.onDark,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: type.display,
    fontSize: 18,
    letterSpacing: -0.3,
    color: colors.onDark,
  },
  titleSnap: {
    color: colors.snapYellow,
  },
  streak: {
    backgroundColor: colors.snapYellow,
    borderRadius: radii.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  streakText: {
    fontFamily: type.bodySemibold,
    fontSize: 13,
    color: colors.onYellow,
  },
});
