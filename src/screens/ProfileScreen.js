import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';
import { colors, type, spacing, radii } from '../theme/theme';
import { user, friendSuggestions } from '../data/mockData';

const SNAP_LOGIN_URL = 'https://accounts.snapchat.com/accounts/login';
const ROBLOX_LOGIN_URL = 'https://www.roblox.com/login';
const playerAvatar = require('../../assets/avatars/avatar-player.png');
const { width: SCREEN_W } = Dimensions.get('window');
const AVATAR_PREVIEW_SIZE = Math.min(SCREEN_W - spacing.lg * 2, 340);

const profileStats = [
  { value: '850', label: 'Total XP' },
  { value: '12', label: 'Best Streak' },
  { value: '3', label: 'Quests Done' },
];

function StatCell({ stat }) {
  return (
    <View style={styles.statCell}>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );
}

function ConnectRow({ label, glyph, connected, accent, tileColors, url }) {
  return (
    <View style={styles.connectRow}>
      <View style={styles.connectLeft}>
        <LinearGradient colors={tileColors} style={styles.connectTile}>
          <Text style={styles.connectGlyph}>{glyph}</Text>
        </LinearGradient>
        <View>
          <Text style={styles.connectLabel}>{label}</Text>
          <View style={styles.connectStatusRow}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: connected ? colors.onlineGreen : colors.onDarkMuted },
              ]}
            />
            <Text
              style={[
                styles.connectStatus,
                { color: connected ? colors.onlineGreen : colors.onDarkMuted },
              ]}
            >
              {connected ? 'Connected' : 'Not connected'}
            </Text>
          </View>
        </View>
      </View>
      <Pressable
        onPress={() => Linking.openURL(url)}
        style={({ pressed }) => [
          styles.connectBtn,
          connected ? styles.connectBtnGhost : { backgroundColor: accent },
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.connectBtnText, { color: connected ? colors.onDark : colors.onDark }]}>
          {connected ? 'Manage' : 'Connect'}
        </Text>
      </Pressable>
    </View>
  );
}

function FriendRow({ friend }) {
  const isSnap = friend.suggestFor === 'snap';
  const accent = isSnap ? colors.snapYellow : colors.robloxRed;
  const label = isSnap ? 'Add on Snap' : 'Add on Roblox';
  const fg = isSnap ? colors.onYellow : colors.onDark;
  return (
    <View style={styles.friendRow}>
      <Image source={friend.avatar} style={styles.friendAvatar} />
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{friend.name}</Text>
        <Text style={styles.friendMeta}>{friend.mutual}</Text>
      </View>
      <Pressable style={({ pressed }) => [styles.addBtn, { backgroundColor: accent }, pressed && styles.pressed]}>
        <Text style={[styles.addBtnText, { color: fg }]}>{label}</Text>
      </Pressable>
    </View>
  );
}

function AvatarPreviewModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.previewBackdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.previewCard} pointerEvents="box-none">
          <Image source={playerAvatar} style={styles.previewImage} resizeMode="cover" />
          <Text style={styles.previewName}>Daniel Koo</Text>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [styles.previewCloseBtn, pressed && styles.pressed]}
          >
            <Text style={styles.previewCloseText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default function ProfileScreen({ onBack }) {
  const [avatarOpen, setAvatarOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={onBack} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Identity */}
        <View style={styles.identity}>
          <Pressable
            onPress={() => setAvatarOpen(true)}
            style={({ pressed }) => [styles.avatarWrap, pressed && styles.pressed]}
          >
            <View style={styles.bigAvatar}>
              <Image source={playerAvatar} style={styles.bigAvatarImage} />
            </View>
            <View style={styles.editBadge}>
              <Text style={styles.editBadgeGlyph}>✎</Text>
            </View>
          </Pressable>
          <Text style={styles.name}>Daniel Koo</Text>
          <Text style={styles.handle}>@daniel_da_destroyer · Day 4 Streak</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {profileStats.map((s) => (
            <StatCell key={s.label} stat={s} />
          ))}
        </View>

        {/* Connected accounts */}
        <Text style={styles.eyebrow}>CONNECTED ACCOUNTS</Text>
        <View style={styles.stack}>
          <ConnectRow
            label="Snapchat"
            glyph="👻"
            connected={user.snapConnected}
            accent={colors.snapYellow}
            tileColors={['#FFFC00', '#E6D800']}
            url={SNAP_LOGIN_URL}
          />
          <ConnectRow
            label="Roblox"
            glyph="🎮"
            connected={user.robloxConnected}
            accent={colors.robloxRed}
            tileColors={['#FF3B3B', '#B31E1E']}
            url={ROBLOX_LOGIN_URL}
          />
        </View>

        {/* Grow your squad */}
        <Text style={[styles.eyebrow, { marginTop: spacing.xl }]}>GROW YOUR SQUAD</Text>
        <Text style={styles.sectionNote}>
          People you know on one platform, missing from the other.
        </Text>
        <View style={styles.stack}>
          {friendSuggestions.map((f) => (
            <FriendRow key={f.id} friend={f} />
          ))}
        </View>

        <Text style={styles.footNote}>
          Connecting opens each platform's own login page. SnapBlox doesn't store your password —
          this is a concept experience.
        </Text>

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      <AvatarPreviewModal visible={avatarOpen} onClose={() => setAvatarOpen(false)} />
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
  identity: {
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  avatarWrap: {
    width: 88,
    height: 88,
  },
  bigAvatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2.5,
    borderColor: colors.snapYellow,
    overflow: 'hidden',
    backgroundColor: colors.cardDark,
  },
  bigAvatarImage: {
    width: '100%',
    height: '100%',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.snapYellow,
    borderWidth: 2.5,
    borderColor: colors.pageBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadgeGlyph: {
    fontSize: 13,
    color: colors.onYellow,
  },
  name: {
    fontFamily: type.display,
    fontSize: 26,
    color: colors.onDark,
    marginTop: spacing.md,
  },
  handle: {
    fontFamily: type.body,
    fontSize: 13,
    color: colors.onDarkMuted,
    marginTop: 2,
  },

  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  statCell: {
    flex: 1,
    backgroundColor: colors.cardDark,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: type.display,
    fontSize: 24,
    letterSpacing: -0.5,
    color: colors.snapYellow,
  },
  statLabel: {
    fontFamily: type.body,
    fontSize: 11.5,
    color: colors.onDarkMuted,
    marginTop: 2,
  },

  eyebrow: {
    fontFamily: type.mono,
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.onDarkMuted,
    marginBottom: spacing.md,
  },
  stack: {
    gap: spacing.sm,
  },
  sectionNote: {
    fontFamily: type.body,
    fontSize: 13,
    color: colors.onDarkMuted,
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
    lineHeight: 18,
  },

  connectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.cardDark,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
    padding: spacing.md,
  },
  connectLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  connectTile: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectGlyph: {
    fontSize: 22,
  },
  connectLabel: {
    fontFamily: type.bodySemibold,
    fontSize: 15,
    color: colors.onDark,
  },
  connectStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 3,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  connectStatus: {
    fontFamily: type.body,
    fontSize: 12,
  },
  connectBtn: {
    borderRadius: radii.pill,
    paddingVertical: 9,
    paddingHorizontal: 18,
  },
  connectBtnGhost: {
    borderWidth: 1.5,
    borderColor: colors.cardBorderDark,
  },
  connectBtnText: {
    fontFamily: type.bodySemibold,
    fontSize: 13,
  },
  pressed: {
    opacity: 0.8,
  },

  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardDark,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.cardBorderDark,
    padding: spacing.md,
  },
  friendAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.cardDark,
  },
  friendInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  friendName: {
    fontFamily: type.bodySemibold,
    fontSize: 14,
    color: colors.onDark,
  },
  friendMeta: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.onDarkMuted,
    marginTop: 1,
  },
  addBtn: {
    borderRadius: radii.pill,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  addBtnText: {
    fontFamily: type.bodySemibold,
    fontSize: 11.5,
  },
  footNote: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.onDarkMuted,
    marginTop: spacing.xl,
    lineHeight: 17,
  },

  previewBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  previewCard: {
    alignItems: 'center',
    width: '100%',
    maxWidth: AVATAR_PREVIEW_SIZE + spacing.lg * 2,
  },
  previewImage: {
    width: AVATAR_PREVIEW_SIZE,
    height: AVATAR_PREVIEW_SIZE,
    borderRadius: AVATAR_PREVIEW_SIZE / 2,
    borderWidth: 3,
    borderColor: colors.snapYellow,
    backgroundColor: colors.cardDark,
  },
  previewName: {
    fontFamily: type.display,
    fontSize: 22,
    color: colors.onDark,
    marginTop: spacing.lg,
  },
  previewCloseBtn: {
    marginTop: spacing.lg,
    backgroundColor: colors.snapYellow,
    borderRadius: radii.pill,
    paddingVertical: 12,
    paddingHorizontal: 36,
  },
  previewCloseText: {
    fontFamily: type.bodySemibold,
    fontSize: 15,
    color: colors.onYellow,
  },
});
