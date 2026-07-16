import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Modal,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import { colors, type, spacing, radii } from '../theme/theme';

const lensSnapcode = require('../../assets/roblox-lens-snapcode.png');
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
// Transforms/opacity don't animate via the native driver on web, which left
// every particle stuck at opacity 0. Drive on JS thread when running on web.
const USE_NATIVE_DRIVER = Platform.OS !== 'web';

const CONFETTI_COLORS = [
  colors.snapYellow,
  colors.robloxRed,
  '#FFFFFF',
  '#FFFC00',
  '#FF3B3B',
  '#FFD166',
];

const friendsOnline = [
  { name: 'jayden_r', avatar: require('../../assets/avatars/avatar-jayden.png'), platform: 'snap' },
  { name: 'mia.snap', avatar: require('../../assets/avatars/avatar-mia.png'), platform: 'snap' },
  { name: 'blox_kai', avatar: require('../../assets/avatars/avatar-kai.png'), platform: 'roblox' },
  { name: 'zara99', avatar: require('../../assets/avatars/avatar-zara.png'), platform: 'roblox' },
  { name: 'noob_pl', avatar: require('../../assets/avatars/avatar-noob.png'), platform: 'roblox' },
];

const INITIAL_STREAK_DAYS = [
  { label: 'M', done: true },
  { label: 'T', done: true },
  { label: 'W', done: true },
  { label: 'T', done: false }, // Thursday — unlocks after Submit
  { label: 'F', done: false },
];

const THURSDAY_INDEX = 3;

const stats = [
  { label: 'Quests done', value: '3/5' },
  { label: 'XP earned', value: '850' },
  { label: 'Items unlocked', value: '2/4' },
  { label: 'Best streak', value: '12 days' },
];

function FriendAvatar({ friend }) {
  const ringColor = friend.platform === 'snap' ? colors.snapYellow : colors.robloxRed;
  return (
    <View style={styles.friend}>
      <View style={styles.avatarWrap}>
        <View style={[styles.avatarRing, { borderColor: ringColor }]}>
          <Image source={friend.avatar} style={styles.avatarImage} />
        </View>
        <View style={styles.onlineDot} />
      </View>
      <Text numberOfLines={1} style={styles.friendName}>{friend.name}</Text>
    </View>
  );
}

function StatCard({ stat }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );
}

function makeParticles() {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    // Spread across the full width, slightly inset so pieces aren't clipped.
    x: 8 + Math.random() * (SCREEN_W - 24),
    // Stagger so a continuous rain falls from the top.
    delay: Math.random() * 600,
    duration: 2200 + Math.random() * 1000,
    drift: (Math.random() - 0.5) * 160,
    spin: (Math.random() > 0.5 ? 1 : -1) * (220 + Math.random() * 400),
    size: 10 + Math.random() * 12,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    shape: i % 3 === 0 ? 'block' : i % 3 === 1 ? 'circle' : 'ghost',
  }));
}

function ConfettiBurst({ active, onDone }) {
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const particles = useRef(makeParticles()).current;
  const anims = useRef(particles.map(() => new Animated.Value(0))).current;
  const banner = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) {
      anims.forEach((a) => a.setValue(0));
      banner.setValue(0);
      return undefined;
    }

    anims.forEach((a) => a.setValue(0));
    banner.setValue(0);

    Animated.spring(banner, {
      toValue: 1,
      friction: 6,
      tension: 80,
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start();

    const runs = particles.map((p, i) =>
      Animated.timing(anims[i], {
        toValue: 1,
        duration: p.duration,
        delay: p.delay,
        useNativeDriver: USE_NATIVE_DRIVER,
      }),
    );

    const anim = Animated.parallel(runs);
    anim.start(({ finished }) => {
      if (finished) onDoneRef.current?.();
    });

    return () => anim.stop();
  }, [active, anims, banner, particles]);

  return (
    <Modal
      visible={active}
      transparent
      animationType="none"
      statusBarTranslucent
      presentationStyle="overFullScreen"
      onRequestClose={() => onDoneRef.current?.()}
    >
      <View style={styles.confettiLayer} pointerEvents="box-none">
        <Animated.View
          style={[
            styles.celebrateBanner,
            {
              opacity: banner,
              transform: [
                {
                  scale: banner.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.7, 1],
                  }),
                },
                {
                  translateY: banner.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.celebrateEyebrow}>SNAP × ROBLOX</Text>
          <Text style={styles.celebrateTitle}>Streak day secured!</Text>
          <Text style={styles.celebrateSub}>Thursday checked · keep it going</Text>
        </Animated.View>

        {particles.map((p, i) => {
          const progress = anims[i];
          // Start just above the top edge, fall all the way past the bottom.
          const translateY = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [-40, SCREEN_H + 80],
          });
          const translateX = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, p.drift],
          });
          const rotate = progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', `${p.spin}deg`],
          });
          const opacity = progress.interpolate({
            inputRange: [0, 0.02, 0.85, 1],
            outputRange: [0, 1, 1, 0],
          });

          const pieceStyle =
            p.shape === 'circle'
              ? { borderRadius: p.size / 2 }
              : p.shape === 'ghost'
                ? { borderRadius: p.size / 2.5, width: p.size * 0.75 }
                : { borderRadius: 2 };

          return (
            <Animated.View
              key={p.id}
              style={[
                styles.confettiPiece,
                {
                  left: p.x,
                  top: 0,
                  width: p.size,
                  height: p.size * (p.shape === 'block' ? 1 : 1.35),
                  backgroundColor: p.color,
                  opacity,
                  transform: [{ translateY }, { translateX }, { rotate }],
                  ...pieceStyle,
                },
              ]}
            />
          );
        })}
      </View>
    </Modal>
  );
}

function LensModal({ visible, onSubmit, alreadyDone }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onSubmit}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalEyebrow}>TODAY'S ROBLOX LENS</Text>
          <Text style={styles.modalTitle}>Scan to open in Snapchat</Text>
          <Image source={lensSnapcode} style={styles.snapcode} resizeMode="contain" />
          <Text style={styles.modalHint}>
            Point your Snapchat camera at this Snapcode to unlock today's Roblox Lens, then hit
            Submit to log your streak day.
          </Text>
          <Pressable
            onPress={onSubmit}
            style={({ pressed }) => [styles.modalSubmitBtn, pressed && styles.pressed]}
          >
            <Text style={styles.modalSubmitText}>
              {alreadyDone ? 'Done' : 'Submit'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default function HomeScreen({ onBack }) {
  const [lensOpen, setLensOpen] = useState(false);
  const [streakDays, setStreakDays] = useState(INITIAL_STREAK_DAYS);
  const [celebrate, setCelebrate] = useState(false);
  const celebrateTimer = useRef(null);

  const thursdayDone = streakDays[THURSDAY_INDEX].done;
  const streakCount = streakDays.filter((d) => d.done).length;

  useEffect(() => () => clearTimeout(celebrateTimer.current), []);

  const handleSubmit = () => {
    setLensOpen(false);
    if (!thursdayDone) {
      setStreakDays((days) =>
        days.map((d, i) => (i === THURSDAY_INDEX ? { ...d, done: true } : d)),
      );
      // Wait for the lens modal to finish dismissing before the burst so the
      // native modal window isn't covering the confetti on the first frames.
      clearTimeout(celebrateTimer.current);
      celebrateTimer.current = setTimeout(() => setCelebrate(true), 350);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={onBack} streak={streakCount} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>Welcome back, Daniel</Text>
        <Text style={styles.streakTitle}>Day {streakCount} Streak</Text>

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
          </View>
          <Text style={styles.cardSubtitle}>Use a Roblox Lens each day</Text>
          <View style={styles.daysRow}>
            {streakDays.map((d, i) => (
              <View key={i} style={styles.dayCol}>
                <View style={[styles.dayBox, d.done ? styles.dayBoxDone : styles.dayBoxTodo]}>
                  {d.done && <Text style={styles.dayCheck}>✓</Text>}
                </View>
                <Text style={[styles.dayLabel, d.done && styles.dayLabelDone]}>{d.label}</Text>
              </View>
            ))}
          </View>
          <Pressable
            onPress={() => setLensOpen(true)}
            style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
          >
            <Text style={styles.primaryBtnText}>
              {thursdayDone ? 'Lens used today' : "Use Today's Roblox Lens"}
            </Text>
          </Pressable>
        </View>

        {/* Today's Lens */}
        <Pressable
          onPress={() => setLensOpen(true)}
          style={({ pressed }) => [styles.lensCard, pressed && styles.pressed]}
        >
          <Image source={lensSnapcode} style={styles.lensIcon} resizeMode="cover" />
          <View style={styles.lensCopy}>
            <Text style={styles.lensEyebrow}>TODAY'S LENS</Text>
            <Text style={styles.lensTitle}>Roblox Cap AR</Text>
            <Text style={styles.lensSubtitle}>Unlock today's Roblox Lens</Text>
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

      <LensModal
        visible={lensOpen}
        onSubmit={handleSubmit}
        alreadyDone={thursdayDone}
      />

      <ConfettiBurst active={celebrate} onDone={() => setCelebrate(false)} />
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
  avatarWrap: {
    width: 54,
    height: 54,
  },
  avatarRing: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2.5,
    backgroundColor: colors.cardDark,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
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
  dayLabelDone: {
    color: colors.snapYellow,
  },
  primaryBtn: {
    backgroundColor: '#FFFFFF',
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
    marginTop: 6,
  },

  // Lens modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.cardDark,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
    padding: spacing.lg,
    alignItems: 'center',
  },
  modalEyebrow: {
    fontFamily: type.mono,
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.onDarkMuted,
  },
  modalTitle: {
    fontFamily: type.display,
    fontSize: 22,
    color: colors.onDark,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  snapcode: {
    width: Math.min(SCREEN_W - spacing.lg * 2 - 32, 320),
    height: Math.min(SCREEN_W - spacing.lg * 2 - 32, 320) * 0.9,
    borderRadius: radii.md,
    backgroundColor: colors.snapYellow,
  },
  modalHint: {
    fontFamily: type.body,
    fontSize: 13,
    lineHeight: 19,
    color: colors.onDarkMuted,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  modalSubmitBtn: {
    marginTop: spacing.lg,
    width: '100%',
    backgroundColor: colors.snapYellow,
    borderRadius: radii.pill,
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalSubmitText: {
    fontFamily: type.bodySemibold,
    fontSize: 15,
    color: colors.onYellow,
  },

  // Confetti — rendered in a full-screen Modal so it sits above tabs + content
  confettiLayer: {
    flex: 1,
    width: SCREEN_W,
    height: SCREEN_H,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  confettiPiece: {
    position: 'absolute',
    zIndex: 1,
  },
  celebrateBanner: {
    position: 'absolute',
    top: '32%',
    alignSelf: 'center',
    zIndex: 2,
    backgroundColor: colors.cardDark,
    borderWidth: 1,
    borderColor: colors.snapYellow,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    minWidth: 260,
  },
  celebrateEyebrow: {
    fontFamily: type.mono,
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.robloxRed,
  },
  celebrateTitle: {
    fontFamily: type.display,
    fontSize: 22,
    color: colors.snapYellow,
    marginTop: 6,
  },
  celebrateSub: {
    fontFamily: type.body,
    fontSize: 13,
    color: colors.onDarkMuted,
    marginTop: 4,
  },
});
