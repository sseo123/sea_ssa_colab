import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, type, spacing, radii } from '../theme/theme';

const heroImage = require('../../assets/hero-fistbump.png');

// The page is a narrow, mobile-first column that stays centered on wide
// (web) viewports so it reads like a website rather than a native app.
const COLUMN_MAX_WIDTH = 460;

function GhostLogo({ tint }) {
  return (
    <View style={styles.logoRow}>
      <Text style={[styles.logoGhost, { color: tint }]}>👻</Text>
      <Text style={[styles.logoText, { color: tint }]}>SnapBlox</Text>
    </View>
  );
}

function PillButton({ label, onPress, block }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        block && styles.pillBlock,
        pressed && styles.pillPressed,
      ]}
    >
      <Text style={styles.pillText}>{label}</Text>
    </Pressable>
  );
}

function Stat({ value, label }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function FeatureCard({ glyph, title, body }) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>
        <Text style={styles.featureGlyph}>{glyph}</Text>
      </View>
      <View style={styles.featureCopy}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureBody}>{body}</Text>
      </View>
    </View>
  );
}

function Step({ n, title, body }) {
  return (
    <View style={styles.step}>
      <Text style={styles.stepNum}>{n}</Text>
      <View style={styles.stepCopy}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepBody}>{body}</Text>
      </View>
    </View>
  );
}

export default function LandingScreen({ onEnter }) {
  const insets = useSafeAreaInsets();
  const enter = onEnter || (() => {});

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.rootContent}
      showsVerticalScrollIndicator={false}
    >
      {/* ---------- HERO (yellow) ---------- */}
      <View style={styles.heroBand}>
        <View style={[styles.column, { paddingTop: insets.top + spacing.md }]}>
          <View style={styles.nav}>
            <GhostLogo tint={colors.onYellow} />
            <PillButton label="Open app" onPress={enter} />
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>OFFICIAL COLLAB</Text>
          </View>

          <Text style={styles.heroTitle}>
            Snapchat{'\n'}
            <Text style={styles.heroTitleX}>×</Text>
            <Text style={styles.heroTitleAlt}> Roblox</Text>
          </Text>

          <Text style={styles.heroSubtitle}>
            Find your friends on Snap. Jump into Roblox games together. Share
            every win — all in one place.
          </Text>

          <View style={styles.heroImageWrap}>
            <Image source={heroImage} style={styles.heroImage} resizeMode="cover" />
          </View>

          <PillButton label="Enter the app  →" onPress={enter} block />
          <Text style={styles.heroDisclaimer}>
            No download needed — works right in your browser.
          </Text>
        </View>
      </View>

      {/* ---------- STORY + STATS (black) ---------- */}
      <View style={styles.darkBand}>
        <View style={styles.column}>
          <Text style={styles.sectionHeading}>Two worlds, one friend list.</Text>
          <Text style={styles.paragraph}>
            Your Snapchat friends and your Roblox squad have never really lived
            in the same place — until now. SnapBlox links the two so you can see
            who's on each side, pull your Snap friends into Roblox, and invite
            your Roblox crew to Snap.
          </Text>
          <Text style={styles.paragraph}>
            Discover games your friends already love, jump in together, and enjoy
            the moment when you win. It's the social layer that makes playing
            more fun.
          </Text>

          <View style={styles.statsRow}>
            <Stat value="200M+" label="Snap friends" />
            <Stat value="40M+" label="Daily games" />
            <Stat value="1 tap" label="To play" />
          </View>
        </View>
      </View>

      {/* ---------- WHAT YOU CAN DO (black) ---------- */}
      <View style={styles.darkBand}>
        <View style={styles.column}>
          <Text style={styles.eyebrow}>WHAT YOU CAN DO</Text>
          <View style={styles.cardStack}>
            <FeatureCard
              glyph="👥"
              title="Find your friends"
              body="See who's on Snap, who's on Roblox, and invite the rest with a single tap."
            />
            <FeatureCard
              glyph="🎮"
              title="Play together"
              body="Browse the games your friends are in right now and jump straight into their server."
            />
            <FeatureCard
              glyph="🪪"
              title="One profile"
              body="Your Snap and Roblox identities, linked. Show off your scores, Robux, and games played."
            />
          </View>
        </View>
      </View>

      {/* ---------- HOW IT WORKS (black) ---------- */}
      <View style={styles.darkBand}>
        <View style={styles.column}>
          <Text style={styles.eyebrow}>HOW IT WORKS</Text>
          <View style={styles.cardStack}>
            <Step
              n="1"
              title="Link your accounts"
              body="Connect Snapchat and Roblox so SnapBlox can match your friends across both."
            />
            <Step
              n="2"
              title="Find your people"
              body="Browse friends, see who plays what, and send invites to the platform they're missing."
            />
            <Step
              n="3"
              title="Play & share"
              body="Hop into games together and snap the highlights straight to your story."
            />
          </View>
        </View>
      </View>

      {/* ---------- FINAL CTA (yellow) ---------- */}
      <View style={styles.ctaBand}>
        <View style={styles.column}>
          <Text style={styles.ctaHeading}>Ready to squad up?</Text>
          <Text style={styles.ctaSubtitle}>
            Your friends are already here. Jump in and start playing together.
          </Text>
          <PillButton label="Enter the app  →" onPress={enter} block />
        </View>
      </View>

      {/* ---------- FOOTER (black) ---------- */}
      <View style={[styles.footerBand, { paddingBottom: insets.bottom + spacing.xl }]}>
        <View style={styles.column}>
          <GhostLogo tint={colors.onDark} />
          <Text style={styles.footerNote}>
            A Snapchat x Roblox concept experience. Not affiliated.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.pageBlack,
  },
  rootContent: {
    alignItems: 'center',
  },
  column: {
    width: '100%',
    maxWidth: COLUMN_MAX_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
  },

  // Bands
  heroBand: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.snapYellow,
    paddingBottom: spacing.xxl,
  },
  darkBand: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.pageBlack,
    paddingVertical: spacing.xl,
  },
  ctaBand: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.snapYellow,
    paddingVertical: spacing.xxl,
  },
  footerBand: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.pageBlack,
    paddingTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorderDark,
  },

  // Logo
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoGhost: {
    fontSize: 18,
  },
  logoText: {
    fontFamily: type.display,
    fontSize: 18,
    letterSpacing: -0.3,
  },

  // Nav
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },

  // Pill buttons
  pill: {
    backgroundColor: colors.pageBlack,
    borderRadius: radii.pill,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillBlock: {
    alignSelf: 'stretch',
    paddingVertical: 16,
  },
  pillPressed: {
    opacity: 0.85,
  },
  pillText: {
    fontFamily: type.bodySemibold,
    fontSize: 14,
    color: colors.onDark,
  },

  // Badge
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.pageBlack,
    borderRadius: radii.pill,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginBottom: spacing.md,
  },
  badgeText: {
    fontFamily: type.mono,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.snapYellow,
  },

  // Hero text
  heroTitle: {
    fontFamily: type.display,
    fontSize: 46,
    lineHeight: 48,
    letterSpacing: -1.5,
    color: colors.onYellow,
  },
  heroTitleX: {
    fontFamily: type.display,
    fontSize: 46,
    color: colors.robloxRed,
  },
  heroTitleAlt: {
    fontFamily: type.display,
    fontSize: 46,
    color: colors.onYellow,
  },
  heroSubtitle: {
    fontFamily: type.bodyMedium,
    fontSize: 16,
    lineHeight: 23,
    color: colors.onYellowMuted,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  heroImageWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroDisclaimer: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.onYellowMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },

  // Section headings
  sectionHeading: {
    fontFamily: type.display,
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.8,
    color: colors.onDark,
    marginBottom: spacing.md,
  },
  eyebrow: {
    fontFamily: type.mono,
    fontSize: 12,
    letterSpacing: 2,
    color: colors.snapYellow,
    marginBottom: spacing.lg,
  },
  paragraph: {
    fontFamily: type.body,
    fontSize: 15,
    lineHeight: 23,
    color: colors.onDarkMuted,
    marginBottom: spacing.md,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorderDark,
    paddingTop: spacing.lg,
  },
  stat: {
    flex: 1,
  },
  statValue: {
    fontFamily: type.display,
    fontSize: 26,
    color: colors.snapYellow,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.onDarkMuted,
    marginTop: 2,
  },

  // Cards / steps shared stack
  cardStack: {
    gap: spacing.md,
  },

  // Feature cards
  featureCard: {
    flexDirection: 'row',
    backgroundColor: colors.cardDark,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
    padding: spacing.lg,
    gap: spacing.md,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.snapYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureGlyph: {
    fontSize: 20,
  },
  featureCopy: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: type.bodySemibold,
    fontSize: 16,
    color: colors.onDark,
    marginBottom: 4,
  },
  featureBody: {
    fontFamily: type.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.onDarkMuted,
  },

  // Steps
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  stepNum: {
    fontFamily: type.display,
    fontSize: 20,
    color: colors.snapYellow,
    width: 28,
  },
  stepCopy: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: type.bodySemibold,
    fontSize: 16,
    color: colors.onDark,
    marginBottom: 4,
  },
  stepBody: {
    fontFamily: type.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.onDarkMuted,
  },

  // Final CTA
  ctaHeading: {
    fontFamily: type.display,
    fontSize: 32,
    letterSpacing: -0.8,
    color: colors.onYellow,
    marginBottom: spacing.sm,
  },
  ctaSubtitle: {
    fontFamily: type.bodyMedium,
    fontSize: 15,
    lineHeight: 22,
    color: colors.onYellowMuted,
    marginBottom: spacing.lg,
  },

  // Footer
  footerNote: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.onDarkMuted,
    marginTop: spacing.sm,
  },
});
