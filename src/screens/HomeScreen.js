import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import { colors, type, spacing, radii } from '../theme/theme';

const friendsOnline = [
  { name: 'jayden_r', emoji: '🧑', platform: 'snap' },
  { name: 'mia.snap', emoji: '👩‍🦰', platform: 'snap' },
  { name: 'blox_kai', emoji: '🧑‍🦱', platform: 'roblox' },
  { name: 'zara99', emoji: '🙂', platform: 'roblox' },
  { name: 'noob_pl', emoji: '🧑‍🎤', platform: 'roblox' },
];

const streakDays = [
  { label: 'M', done: true },
  { label: 'T', done: true },
  { label: 'W', done: true },
  { label: 'T', done: true },
  { label: 'F', done: false },
];

const stats = [
  { icon: '⚔️', value: '3/5', label: 'Quests done' },
  { icon: '⭐', value: '850', label: 'XP earned' },
  { icon: '🎁', value: '2/4', label: 'Items unlocked' },
  { icon: '🔥', value: '12 days', label: 'Best streak' },
];

function FriendAvatar({ friend }) {
  const ringColor = friend.platform === 'snap' ? colors.snapYellow : colors.robloxRed;
  return (
    <View style={styles.friend}>
      <View style={[styles.avatarRing, { borderColor: ringColor }]}>
        <Text style={styles.avatarEmoji}>{friend.emoji}</Text>
        <View style={styles.onlineDot} />
      </View>
      <Text numberOfLines={1} style={styles.friendName}>{friend.name}</Text>
    </View>
  );
}

function StatCard({ stat }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{stat.icon}</Text>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );
}

export default function HomeScreen({ onBack }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={onBack} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>Welcome back, Player</Text>
        <Text style={styles.streakTitle}>Day 4 Streak 🔥</Text>

        <Text style={styles.eyebrow}>FRIENDS ONLINE</Text>
        <View style={styles.friendsRow}>
          {friendsOnline.map((f) => (
            <FriendAvatar key={f.name} friend={f} />
          ))}
        </View>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.snapYellow }]} />
            <Text style={styles.legendText}>On Snap</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.robloxRed }]} />
            <Text style={styles.legendText}>On Roblox</Text>
          </View>
        </View>

        {/* 5-Day SnapStreak */}
        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardTitle}>5-Day SnapStreak</Text>
            <Text style={styles.cardFlame}>🔥</Text>
          </View>
          <Text style={styles.cardSubtitle}>Use a Roblox Lens each day</Text>
          <View style={styles.daysRow}>
            {streakDays.map((d, i) => (
              <View key={i} style={styles.dayCol}>
                <View style={[styles.dayBox, d.done ? styles.dayBoxDone : styles.dayBoxTodo]}>
                  {d.done && <Text style={styles.dayCheck}>✓</Text>}
                </View>
                <Text style={styles.dayLabel}>{d.label}</Text>
              </View>
            ))}
          </View>
          <Pressable style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}>
            <Text style={styles.primaryBtnText}>🎒 Use Today's Roblox Lens</Text>
          </Pressable>
        </View>

        {/* Today's Lens */}
        <Pressable style={({ pressed }) => [styles.lensCard, pressed && styles.pressed]}>
          <View style={styles.lensIcon} />
          <View style={styles.lensCopy}>
            <Text style={styles.lensEyebrow}>TODAY'S LENS</Text>
            <Text style={styles.lensTitle}>Roblox Noob AR</Text>
            <Text style={styles.lensSubtitle}>Transform into a classic Noob</Text>
          </View>
          <Text style={styles.lensArrow}>→</Text>
        </Pressable>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
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
  welcome: {
    fontFamily: type.body,
    fontSize: 14,
    color: colors.onDarkMuted,
    marginTop: spacing.sm,
  },
  streakTitle: {
    fontFamily: type.display,
    fontSize: 28,
    letterSpacing: -0.5,
    color: colors.onDark,
    marginTop: 2,
    marginBottom: spacing.lg,
  },
  eyebrow: {
    fontFamily: type.mono,
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.onDarkMuted,
    marginBottom: spacing.md,
  },
  friendsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  friend: {
    alignItems: 'center',
    width: 62,
  },
  avatarRing: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2.5,
    backgroundColor: colors.cardDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.onlineGreen,
    borderWidth: 2,
    borderColor: colors.pageBlack,
  },
  friendName: {
    fontFamily: type.body,
    fontSize: 10.5,
    color: colors.onDarkMuted,
    marginTop: 6,
  },
  legendRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.md,
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

  card: {
    backgroundColor: colors.cardDark,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: type.display,
    fontSize: 18,
    color: colors.onDark,
    letterSpacing: -0.3,
  },
  cardFlame: {
    fontSize: 20,
  },
  cardSubtitle: {
    fontFamily: type.body,
    fontSize: 13,
    color: colors.onDarkMuted,
    marginTop: 2,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  dayCol: {
    alignItems: 'center',
    flex: 1,
  },
  dayBox: {
    width: 52,
    height: 52,
    maxWidth: '90%',
    aspectRatio: 1,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBoxDone: {
    backgroundColor: colors.snapYellow,
  },
  dayBoxTodo: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1.5,
    borderColor: colors.cardBorderDark,
  },
  dayCheck: {
    fontFamily: type.bodySemibold,
    fontSize: 22,
    color: colors.onYellow,
  },
  dayLabel: {
    fontFamily: type.mono,
    fontSize: 11,
    color: colors.onDarkMuted,
    marginTop: 8,
  },
  primaryBtn: {
    backgroundColor: colors.snapYellow,
    borderRadius: radii.pill,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryBtnText: {
    fontFamily: type.bodySemibold,
    fontSize: 15,
    color: colors.onYellow,
  },
  pressed: {
    opacity: 0.85,
  },

  lensCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardDark,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
    padding: spacing.lg,
    marginTop: spacing.md,
    gap: spacing.md,
  },
  lensIcon: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.snapYellow,
  },
  lensCopy: {
    flex: 1,
  },
  lensEyebrow: {
    fontFamily: type.mono,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.onDarkMuted,
  },
  lensTitle: {
    fontFamily: type.bodySemibold,
    fontSize: 16,
    color: colors.onDark,
    marginTop: 3,
  },
  lensSubtitle: {
    fontFamily: type.body,
    fontSize: 13,
    color: colors.onDarkMuted,
    marginTop: 1,
  },
  lensArrow: {
    fontFamily: type.bodySemibold,
    fontSize: 20,
    color: colors.onDarkMuted,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    rowGap: spacing.md,
  },
  statCard: {
    width: '48.5%',
    backgroundColor: colors.cardDark,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
    padding: spacing.lg,
  },
  statIcon: {
    fontSize: 18,
    marginBottom: spacing.md,
  },
  statValue: {
    fontFamily: type.display,
    fontSize: 24,
    color: colors.onDark,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.onDarkMuted,
    marginTop: 2,
  },
});
