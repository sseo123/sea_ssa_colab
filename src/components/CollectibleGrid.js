import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, type, spacing, radii } from '../theme/theme';

const rarityColor = {
  Common: colors.textMuted,
  Rare: colors.fusionViolet,
  Epic: colors.streakCoral,
  Legendary: colors.snapYellow,
};

function Slot({ item }) {
  const accent = rarityColor[item.rarity] || colors.textMuted;
  return (
    <View style={[styles.slot, !item.unlocked && styles.slotLocked]}>
      <View style={[styles.iconBox, { backgroundColor: item.unlocked ? accent + '22' : 'transparent', borderColor: item.unlocked ? accent : colors.border }]}>
        <Text style={styles.iconGlyph}>{item.source === 'snap' ? '👻' : '◆'}</Text>
      </View>
      <Text numberOfLines={2} style={[styles.slotName, !item.unlocked && styles.slotNameLocked]}>
        {item.unlocked ? item.name : 'Locked'}
      </Text>
      {item.unlocked && (
        <Text style={[styles.rarity, { color: accent }]}>{item.rarity}</Text>
      )}
    </View>
  );
}

export default function CollectibleGrid({ items }) {
  return (
    <View style={styles.grid}>
      {items.map((item) => (
        <Slot key={item.id} item={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  slot: {
    width: '31%',
    aspectRatio: 0.85,
    backgroundColor: colors.bgCard,
    borderRadius: radii.voxel,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  },
  slotLocked: {
    opacity: 0.55,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: radii.voxel,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  iconGlyph: {
    fontSize: 18,
  },
  slotName: {
    fontFamily: type.bodyMedium,
    fontSize: 10.5,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  slotNameLocked: {
    color: colors.textMuted,
  },
  rarity: {
    fontFamily: type.mono,
    fontSize: 9,
    marginTop: 2,
    letterSpacing: 0.5,
  },
});
