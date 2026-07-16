import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import { colors, type, spacing, radii } from '../theme/theme';
import { user, friendSuggestions } from '../data/mockData';

const SNAP_LOGIN_URL = 'https://accounts.snapchat.com/accounts/login';
const ROBLOX_LOGIN_URL = 'https://www.roblox.com/login';

function ConnectRow({ label, connected, accent, url }) {
  return (
    <View style={styles.connectRow}>
      <View style={styles.connectLeft}>
        <View style={[styles.connectDot, { backgroundColor: accent }]} />
        <View>
          <Text style={styles.connectLabel}>{label}</Text>
          <Text style={[styles.connectStatus, { color: connected ? colors.onlineGreen : colors.onDarkMuted }]}>
            {connected ? 'Connected' : 'Not connected'}
          </Text>
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
        <Text style={[styles.connectBtnText, { color: connected ? colors.onDark : colors.onYellow }]}>
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
  return (
    <View style={styles.friendRow}>
      <View style={[styles.friendAvatar, { backgroundColor: friend.avatarColor }]}>
        <Text style={styles.friendInitial}>{friend.name[0]}</Text>
      </View>
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{friend.name}</Text>
        <Text style={styles.friendMeta}>{friend.mutual}</Text>
      </View>
      <Pressable style={({ pressed }) => [styles.addBtn, { borderColor: accent }, pressed && styles.pressed]}>
        <Text style={[styles.addBtnText, { color: accent }]}>{label}</Text>
      </Pressable>
    </View>
  );
}

export default function ProfileScreen({ onBack }) {
  const snapSuggestions = friendSuggestions.filter((f) => f.suggestFor === 'snap');
  const robloxSuggestions = friendSuggestions.filter((f) => f.suggestFor === 'roblox');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={onBack} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Identity */}
        <View style={styles.identity}>
          <View style={styles.bigAvatar}>
            <Text style={styles.bigAvatarEmoji}>🧑</Text>
          </View>
          <Text style={styles.name}>Player</Text>
          <Text style={styles.handle}>@snapblox_player · Day 4 Streak 🔥</Text>
        </View>

        {/* Connected accounts */}
        <Text style={styles.eyebrow}>CONNECTED ACCOUNTS</Text>
        <View style={styles.stack}>
          <ConnectRow label="Snapchat" connected={user.snapConnected} accent={colors.snapYellow} url={SNAP_LOGIN_URL} />
          <ConnectRow label="Roblox" connected={user.robloxConnected} accent={colors.robloxRed} url={ROBLOX_LOGIN_URL} />
        </View>

        {/* Grow your squad */}
        <Text style={[styles.eyebrow, { marginTop: spacing.xl }]}>GROW YOUR SQUAD</Text>
        <Text style={styles.sectionNote}>
          People you know on one platform, missing from the other.
        </Text>

        <Text style={styles.groupTitle}>Bring onto Roblox</Text>
        <View style={styles.stack}>
          {snapSuggestions.map((f) => (
            <FriendRow key={f.id} friend={f} />
          ))}
        </View>

        <Text style={[styles.groupTitle, { marginTop: spacing.lg }]}>Bring onto Snap</Text>
        <View style={styles.stack}>
          {robloxSuggestions.map((f) => (
            <FriendRow key={f.id} friend={f} />
          ))}
        </View>

        <Text style={styles.footNote}>
          Connecting opens each platform's own login page. SnapBlox doesn't store your password —
          this is a concept experience.
        </Text>

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
  identity: {
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  bigAvatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.cardDark,
    borderWidth: 2.5,
    borderColor: colors.snapYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigAvatarEmoji: {
    fontSize: 40,
  },
  name: {
    fontFamily: type.display,
    fontSize: 24,
    color: colors.onDark,
    marginTop: spacing.md,
  },
  handle: {
    fontFamily: type.body,
    fontSize: 13,
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
  connectDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  connectLabel: {
    fontFamily: type.bodySemibold,
    fontSize: 15,
    color: colors.onDark,
  },
  connectStatus: {
    fontFamily: type.body,
    fontSize: 12,
    marginTop: 2,
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

  groupTitle: {
    fontFamily: type.displayMedium,
    fontSize: 15,
    color: colors.onDark,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
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
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendInitial: {
    fontFamily: type.display,
    fontSize: 16,
    color: '#FFFFFF',
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
    borderWidth: 1.5,
    borderRadius: radii.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
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
});
