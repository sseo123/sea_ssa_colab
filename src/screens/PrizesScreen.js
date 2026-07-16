import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import { colors, type, spacing, radii } from '../theme/theme';

const quests = [
  {
    id: 'q1',
    icon: '📸',
    tag: 'DAILY',
    tagKind: 'daily',
    xp: '+50 XP',
    title: 'Use the Noob Lens',
    desc: 'Send a Snap using the Roblox Noob AR Lens to a friend.',
    progress: 0,
    goal: 1,
  },
  {
    id: 'q2',
    icon: '🏙️',
    tag: 'EVENT',
    tagKind: 'event',
    xp: '+150 XP',
    title: 'Snap City Showdown',
    desc: 'Play 3 rounds of Snap-themed obby with your squad.',
    progress: 1,
    goal: 3,
  },
  {
    id: 'q3',
    icon: '🔥',
    tag: 'WEEKLY',
    tagKind: 'weekly',
    xp: '+200 XP',
    title: 'Streak Keeper',
    desc: 'Maintain your 5-day SnapStreak using any Roblox Lens.',
    progress: 4,
    goal: 5,
  },
];

const rewards = [
  {
    id: 'r1',
    emoji: '🟡',
    kind: 'snap',
    category: 'SNAP ACCESSORY',
    title: 'Roblox Noob Hat',
    source: 'Bitmoji',
    unlocked: true,
  },
  {
    id: 'r2',
    emoji: '👻',
    kind: 'roblox',
    category: 'ROBLOX ITEM',
    title: 'Snap Ghost Wings',
    source: 'Avatar Shop',
    unlocked: true,
  },
  {
    id: 'r3',
    emoji: '👑',
    kind: 'snap',
    category: 'SNAP ACCESSORY',
    title: 'Creeper Crown',
    source: 'Bitmoji',
    unlocked: false,
  },
  {
    id: 'r4',
    emoji: '✨',
    kind: 'roblox',
    category: 'ROBLOX ITEM',
    title: 'Snap Streak Aura',
    source: 'Avatar Shop',
    unlocked: false,
  },
];

const tagStyles = {
  daily: { bg: colors.snapYellow, fg: colors.onYellow },
  event: { bg: colors.robloxRed, fg: colors.onDark },
  weekly: { bg: 'rgba(255,255,255,0.9)', fg: colors.onYellow },
};

function QuestCard({ quest }) {
  const tag = tagStyles[quest.tagKind];
  const pct = Math.min(quest.progress / quest.goal, 1);
  return (
    <View style={styles.questCard}>
      <View style={styles.questTop}>
        <View style={styles.questIcon}>
          <Text style={styles.questIconGlyph}>{quest.icon}</Text>
        </View>
        <View style={styles.questHead}>
          <View style={styles.questTagRow}>
            <View style={[styles.tag, { backgroundColor: tag.bg }]}>
              <Text style={[styles.tagText, { color: tag.fg }]}>{quest.tag}</Text>
            </View>
            <Text style={styles.xp}>{quest.xp}</Text>
          </View>
          <Text style={styles.questTitle}>{quest.title}</Text>
        </View>
      </View>
      <Text style={styles.questDesc}>{quest.desc}</Text>
      <View style={styles.progressRow}>
        <Text style={styles.progressLabel}>Progress</Text>
        <Text style={styles.progressValue}>{quest.progress}/{quest.goal}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct * 100}%` }]} />
      </View>
      <Pressable style={({ pressed }) => [styles.questBtn, pressed && styles.pressed]}>
        <Text style={styles.questBtnText}>Start Challenge →</Text>
      </Pressable>
    </View>
  );
}

function RewardCard({ reward }) {
  const accent = reward.kind === 'snap' ? colors.snapYellow : colors.robloxRed;
  const tintBg = reward.kind === 'snap' ? 'rgba(255,252,0,0.06)' : 'rgba(255,59,59,0.07)';
  return (
    <View style={[styles.rewardCard, !reward.unlocked && styles.rewardLocked]}>
      <View style={[styles.rewardImage, { backgroundColor: tintBg }]}>
        <Text style={styles.rewardEmoji}>{reward.unlocked ? reward.emoji : '🔒'}</Text>
      </View>
      <Text style={[styles.rewardCategory, { color: accent }]}>{reward.category}</Text>
      <Text style={styles.rewardTitle}>{reward.title}</Text>
      <Text style={styles.rewardSource}>{reward.source}</Text>
      {reward.unlocked && (
        <Pressable style={({ pressed }) => [styles.equipBtn, { backgroundColor: accent }, pressed && styles.pressed]}>
          <Text style={styles.equipText}>Equip</Text>
        </Pressable>
      )}
    </View>
  );
}

export default function PrizesScreen({ onBack }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={onBack} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Quests */}
        <Text style={styles.heading}>Active Quests</Text>
        <Text style={styles.subheading}>Complete quests to earn XP and unlock rewards</Text>
        <View style={styles.stack}>
          {quests.map((q) => (
            <QuestCard key={q.id} quest={q} />
          ))}
        </View>

        {/* Rewards */}
        <Text style={[styles.heading, { marginTop: spacing.xxl }]}>Your Rewards</Text>
        <Text style={styles.subheading}>Accessories for your Bitmoji and Roblox avatar</Text>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.snapYellow }]} />
            <Text style={styles.legendText}>Snap Accessory</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.robloxRed }]} />
            <Text style={styles.legendText}>Roblox Item</Text>
          </View>
        </View>
        <View style={styles.rewardGrid}>
          {rewards.map((r) => (
            <RewardCard key={r.id} reward={r} />
          ))}
        </View>
        <View style={styles.lockedBanner}>
          <Text style={styles.lockedText}>🔒 Complete quests to unlock 2 more items</Text>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.pageBlack,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  heading: {
    fontFamily: type.display,
    fontSize: 28,
    letterSpacing: -0.5,
    color: colors.onDark,
    marginTop: spacing.sm,
  },
  subheading: {
    fontFamily: type.body,
    fontSize: 14,
    color: colors.onDarkMuted,
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  stack: {
    gap: spacing.md,
  },

  // Quest card
  questCard: {
    backgroundColor: colors.cardDark,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
    padding: spacing.lg,
  },
  questTop: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  questIcon: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questIconGlyph: {
    fontSize: 20,
  },
  questHead: {
    flex: 1,
  },
  questTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tag: {
    borderRadius: radii.pill,
    paddingVertical: 3,
    paddingHorizontal: 9,
  },
  tagText: {
    fontFamily: type.bodySemibold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  xp: {
    fontFamily: type.bodyMedium,
    fontSize: 12,
    color: colors.onDarkMuted,
  },
  questTitle: {
    fontFamily: type.bodySemibold,
    fontSize: 17,
    color: colors.onDark,
    marginTop: 6,
  },
  questDesc: {
    fontFamily: type.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.onDarkMuted,
    marginTop: spacing.md,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  progressLabel: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.onDarkMuted,
  },
  progressValue: {
    fontFamily: type.mono,
    fontSize: 12,
    color: colors.onDarkMuted,
  },
  track: {
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  fill: {
    height: '100%',
    borderRadius: radii.pill,
    backgroundColor: colors.snapYellow,
  },
  questBtn: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
    borderRadius: radii.pill,
    paddingVertical: 14,
    alignItems: 'center',
  },
  questBtnText: {
    fontFamily: type.bodySemibold,
    fontSize: 14,
    color: colors.onDark,
  },
  pressed: {
    opacity: 0.85,
  },

  // Rewards
  legendRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.onDarkMuted,
  },
  rewardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.md,
  },
  rewardCard: {
    width: '48.5%',
    backgroundColor: colors.cardDark,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
    padding: spacing.md,
  },
  rewardLocked: {
    opacity: 0.55,
  },
  rewardImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  rewardEmoji: {
    fontSize: 44,
  },
  rewardCategory: {
    fontFamily: type.mono,
    fontSize: 10,
    letterSpacing: 1,
  },
  rewardTitle: {
    fontFamily: type.bodySemibold,
    fontSize: 15,
    color: colors.onDark,
    marginTop: 5,
  },
  rewardSource: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.onDarkMuted,
    marginTop: 1,
    marginBottom: spacing.md,
  },
  equipBtn: {
    borderRadius: radii.pill,
    paddingVertical: 11,
    alignItems: 'center',
  },
  equipText: {
    fontFamily: type.bodySemibold,
    fontSize: 14,
    color: colors.onYellow,
  },
  lockedBanner: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  lockedText: {
    fontFamily: type.bodyMedium,
    fontSize: 13,
    color: colors.onDarkMuted,
  },
});
