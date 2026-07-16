import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';
import { colors, type, spacing, radii } from '../theme/theme';

const AVAILABLE_XP = 500;

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
    gradient: ['#3A2A5E', '#1D1030'],
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
    gradient: ['#5E1F2A', '#2A0F16'],
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
    gradient: ['#4A431A', '#241F0C'],
  },
];

const rewards = [
  {
    id: 'r1',
    emoji: '🧢',
    kind: 'snap',
    category: 'SNAP ACCESSORY',
    title: 'Roblox Noob Hat',
    source: 'Bitmoji',
    unlocked: true,
    gradient: ['#4A431A', '#201C0A'],
  },
  {
    id: 'r2',
    emoji: '🪽',
    kind: 'roblox',
    category: 'ROBLOX ITEM',
    title: 'Snap Ghost Wings',
    source: 'Avatar Shop',
    unlocked: true,
    gradient: ['#5E1F2A', '#260E14'],
  },
  {
    id: 'r3',
    emoji: '👑',
    kind: 'snap',
    category: 'SNAP ACCESSORY',
    title: 'Creeper Crown',
    source: 'Bitmoji',
    unlocked: false,
    gradient: ['#2A2A2A', '#161616'],
  },
  {
    id: 'r4',
    emoji: '✨',
    kind: 'roblox',
    category: 'ROBLOX ITEM',
    title: 'Snap Streak Aura',
    source: 'Avatar Shop',
    unlocked: false,
    gradient: ['#2A2A2A', '#161616'],
  },
];

const tagStyles = {
  daily: { bg: colors.snapYellow, fg: colors.onYellow, fill: colors.snapYellow },
  event: { bg: colors.robloxRed, fg: colors.onDark, fill: colors.robloxRed },
  weekly: { bg: 'rgba(255,255,255,0.9)', fg: colors.onYellow, fill: colors.snapYellow },
};

function SegmentedControl({ tabs, active, onChange }) {
  return (
    <View style={styles.segment}>
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={({ pressed }) => [
              styles.segmentBtn,
              isActive && styles.segmentBtnActive,
              pressed && !isActive && styles.pressed,
            ]}
          >
            <Text style={[styles.segmentText, isActive && styles.segmentTextActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function QuestCard({ quest }) {
  const tag = tagStyles[quest.tagKind];
  const pct = Math.min(quest.progress / quest.goal, 1);
  return (
    <View style={styles.questCard}>
      <View style={styles.questTop}>
        <LinearGradient colors={quest.gradient} style={styles.questThumb}>
          <Text style={styles.questThumbGlyph}>{quest.icon}</Text>
        </LinearGradient>
        <View style={styles.questHead}>
          <View style={styles.questTagRow}>
            <View style={[styles.tag, { backgroundColor: tag.bg }]}>
              <Text style={[styles.tagText, { color: tag.fg }]}>{quest.tag}</Text>
            </View>
            <View style={styles.xpPill}>
              <Text style={styles.xpText}>{quest.xp}</Text>
            </View>
          </View>
          <Text style={styles.questTitle}>{quest.title}</Text>
          <Text style={styles.questDesc}>{quest.desc}</Text>
        </View>
      </View>
      <View style={styles.progressRow}>
        <Text style={styles.progressLabel}>PROGRESS</Text>
        <Text style={styles.progressValue}>{quest.progress}/{quest.goal}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: tag.fill }]} />
      </View>
      <Pressable style={({ pressed }) => [styles.questBtn, pressed && styles.pressed]}>
        <Text style={styles.questBtnText}>Start Challenge  →</Text>
      </Pressable>
    </View>
  );
}

function RewardCard({ reward }) {
  const accent = reward.kind === 'snap' ? colors.snapYellow : colors.robloxRed;
  const badgeFg = reward.kind === 'snap' ? colors.onYellow : colors.onDark;
  return (
    <View style={[styles.rewardCard, !reward.unlocked && styles.rewardLocked]}>
      <LinearGradient colors={reward.gradient} style={styles.rewardImage}>
        <Text style={styles.rewardEmoji}>{reward.unlocked ? reward.emoji : '🔒'}</Text>
        {reward.unlocked && (
          <View style={[styles.rewardBadge, { backgroundColor: accent }]}>
            <Text style={[styles.rewardBadgeText, { color: badgeFg }]}>✓</Text>
          </View>
        )}
      </LinearGradient>
      <Text style={[styles.rewardCategory, { color: reward.unlocked ? accent : colors.onDarkMuted }]}>
        {reward.category}
      </Text>
      <Text style={styles.rewardTitle}>{reward.title}</Text>
      <Text style={styles.rewardSource}>{reward.source}</Text>
      {reward.unlocked ? (
        <Pressable style={({ pressed }) => [styles.equipBtn, { backgroundColor: accent }, pressed && styles.pressed]}>
          <Text style={[styles.equipText, { color: badgeFg }]}>Equip</Text>
        </Pressable>
      ) : (
        <View style={styles.lockedBtn}>
          <Text style={styles.lockedBtnText}>Locked</Text>
        </View>
      )}
    </View>
  );
}

export default function PrizesScreen({ onBack }) {
  const [tab, setTab] = useState('quests');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={onBack} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Prizes</Text>
        <Text style={styles.subheading}>Complete quests, unlock rewards</Text>

        <SegmentedControl
          tabs={[
            { key: 'quests', label: 'Quests' },
            { key: 'rewards', label: 'Rewards' },
          ]}
          active={tab}
          onChange={setTab}
        />

        {tab === 'quests' ? (
          <>
            <View style={styles.xpCard}>
              <View>
                <Text style={styles.xpCardEyebrow}>AVAILABLE XP</Text>
                <Text style={styles.xpCardValue}>{AVAILABLE_XP} XP</Text>
              </View>
              <View style={styles.xpCardIcon}>
                <Text style={styles.xpCardStar}>★</Text>
              </View>
            </View>

            <View style={styles.stack}>
              {quests.map((q) => (
                <QuestCard key={q.id} quest={q} />
              ))}
            </View>
          </>
        ) : (
          <>
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
          </>
        )}

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
    fontSize: 32,
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

  // Segmented control
  segment: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: radii.pill,
    alignItems: 'center',
    backgroundColor: colors.cardDark,
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
  },
  segmentBtnActive: {
    backgroundColor: colors.snapYellow,
    borderColor: colors.snapYellow,
  },
  segmentText: {
    fontFamily: type.bodySemibold,
    fontSize: 14,
    color: colors.onDarkMuted,
  },
  segmentTextActive: {
    color: colors.onYellow,
  },

  // Available XP card
  xpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.cardDark,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  xpCardEyebrow: {
    fontFamily: type.mono,
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.onDarkMuted,
  },
  xpCardValue: {
    fontFamily: type.display,
    fontSize: 30,
    letterSpacing: -0.5,
    color: colors.snapYellow,
    marginTop: 4,
  },
  xpCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: colors.cardBorderDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  xpCardStar: {
    fontSize: 20,
    color: colors.onDarkMuted,
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
  questThumb: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questThumbGlyph: {
    fontSize: 26,
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
  xpPill: {
    borderRadius: radii.pill,
    paddingVertical: 3,
    paddingHorizontal: 9,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  xpText: {
    fontFamily: type.bodySemibold,
    fontSize: 11,
    color: colors.onDark,
  },
  questTitle: {
    fontFamily: type.bodySemibold,
    fontSize: 17,
    color: colors.onDark,
    marginTop: 8,
  },
  questDesc: {
    fontFamily: type.body,
    fontSize: 13.5,
    lineHeight: 19,
    color: colors.onDarkMuted,
    marginTop: 4,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  progressLabel: {
    fontFamily: type.mono,
    fontSize: 11,
    letterSpacing: 1,
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
  },
  questBtn: {
    borderTopWidth: 1,
    borderTopColor: colors.cardBorderDark,
    paddingTop: spacing.md,
    alignItems: 'center',
  },
  questBtnText: {
    fontFamily: type.bodySemibold,
    fontSize: 14,
    color: colors.onDarkMuted,
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
  rewardBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardBadgeText: {
    fontFamily: type.bodySemibold,
    fontSize: 13,
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
  },
  lockedBtn: {
    borderRadius: radii.pill,
    paddingVertical: 11,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
  },
  lockedBtnText: {
    fontFamily: type.bodySemibold,
    fontSize: 14,
    color: colors.onDarkMuted,
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
