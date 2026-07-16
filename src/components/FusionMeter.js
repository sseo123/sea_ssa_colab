import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, type, spacing, radii } from '../theme/theme';

const TOTAL_BLOCKS = 10;

/**
 * The Fusion Meter is the app's one bold signature element.
 * It's a row of voxel-style blocks. Snap-yellow blocks fill in from the
 * left based on Snap activity, violet blocks fill in from the right based
 * on Roblox activity. When both are active, the colors meet in the middle —
 * a literal picture of the partnership thesis.
 */
export default function FusionMeter({ snapProgress, robloxProgress }) {
  const snapBlocks = Math.round(snapProgress * (TOTAL_BLOCKS / 2));
  const robloxBlocks = Math.round(robloxProgress * (TOTAL_BLOCKS / 2));
  const half = TOTAL_BLOCKS / 2;

  const blocks = [];
  for (let i = 0; i < half; i++) {
    blocks.push({ key: `s${i}`, filled: i < snapBlocks, color: colors.snapYellow });
  }
  for (let i = 0; i < half; i++) {
    blocks.push({ key: `r${i}`, filled: i < robloxBlocks, color: colors.fusionViolet });
  }

  const isFused = snapBlocks >= half && robloxBlocks >= half;

  return (
    <View style={styles.wrap}>
      <View style={styles.labelRow}>
        <Text style={styles.labelSnap}>SNAP</Text>
        <Text style={styles.labelRoblox}>ROBLOX</Text>
      </View>
      <View style={styles.meterRow}>
        {blocks.map((b) => (
          <View
            key={b.key}
            style={[
              styles.block,
              {
                backgroundColor: b.filled ? b.color : 'rgba(23,24,28,0.06)',
                borderColor: b.filled ? 'transparent' : colors.border,
              },
            ]}
          />
        ))}
      </View>
      <Text style={styles.status}>
        {isFused ? 'Fusion active this week — keep it going' : 'Stay active on both to fuse the meter'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  labelSnap: {
    fontFamily: type.mono,
    fontSize: 12,
    letterSpacing: 1.5,
    color: colors.robloxInk,
  },
  labelRoblox: {
    fontFamily: type.mono,
    fontSize: 12,
    letterSpacing: 1.5,
    color: colors.fusionViolet,
  },
  meterRow: {
    flexDirection: 'row',
    gap: 4,
  },
  block: {
    flex: 1,
    height: 28,
    borderRadius: radii.voxel,
    borderWidth: 1,
  },
  status: {
    fontFamily: type.body,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});
