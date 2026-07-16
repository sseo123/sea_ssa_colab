import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FusionMeter from '../components/FusionMeter';
import StreakCard from '../components/StreakCard';
import CollectibleGrid from '../components/CollectibleGrid';
import { colors, type, spacing, radii } from '../theme/theme';
import { user, snapStreak, robloxStreak, collectibles, squadChallenge } from '../data/mockData';

export default function RewardsHubScreen() {
  const snapProgress = snapStreak.days / snapStreak.goal;
  const robloxProgress = robloxStreak.daysPlayedThisWeek / robloxStreak.goal;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>REWARDS HUB</Text>
        <Text style={styles.greeting}>Hey {user.displayName} 👋</Text>

        <FusionMeter snapProgress={snapProgress} robloxProgress={robloxProgress} />

        <Text style={styles.sectionTitle}>Your streaks</Text>
        <View style={styles.streakRow}>
          <StreakCard
            platform="SNAP"
            title={`Streak with ${snapStreak.friendName}`}
            subtitle={`${snapStreak.days} day streak ${snapStreak.emoji}`}
            current={snapStreak.days}
            goal={snapStreak.goal}
            accent={colors.snapYellow}
          />
          <StreakCard
            platform="ROBLOX"
            title={robloxStreak.gameName}
            subtitle="Days played this week"
            current={robloxStreak.daysPlayedThisWeek}
            goal={robloxStreak.goal}
            accent={colors.fusionViolet}
          />
        </View>

        <View style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Text style={styles.challengeEyebrow}>SQUAD CHALLENGE · {squadChallenge.daysLeft}D LEFT</Text>
          </View>
          <Text style={styles.challengeTitle}>{squadChallenge.title}</Text>
          <Text style={styles.challengeDesc}>{squadChallenge.description}</Text>
          <View style={styles.challengeTrack}>
            <View style={[styles.challengeFill, { width: `${squadChallenge.progress * 100}%` }]} />
          </View>
          <Text style={styles.challengeReward}>Reward: {squadChallenge.reward}</Text>
        </View>

        <Text style={styles.sectionTitle}>Collectibles</Text>
        <CollectibleGrid items={collectibles} />

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    padding: spacing.lg,
  },
  eyebrow: {
    fontFamily: type.mono,
    fontSize: 12,
    letterSpacing: 2,
    color: colors.textMuted,
  },
  greeting: {
    fontFamily: type.display,
    fontSize: 28,
    color: colors.textPrimary,
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontFamily: type.displayMedium,
    fontSize: 18,
    color: colors.textPrimary,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  streakRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  challengeCard: {
    backgroundColor: colors.robloxInk,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  challengeHeader: {
    marginBottom: spacing.xs,
  },
  challengeEyebrow: {
    fontFamily: type.mono,
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.snapYellow,
  },
  challengeTitle: {
    fontFamily: type.display,
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 4,
  },
  challengeDesc: {
    fontFamily: type.body,
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: spacing.xs,
    lineHeight: 18,
  },
  challengeTrack: {
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  challengeFill: {
    height: '100%',
    backgroundColor: colors.fusionViolet,
    borderRadius: radii.pill,
  },
  challengeReward: {
    fontFamily: type.bodySemibold,
    fontSize: 13,
    color: '#FFFFFF',
    marginTop: spacing.sm,
  },
});
