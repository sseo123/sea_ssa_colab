import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, type, spacing, radii } from '../theme/theme';
import { user } from '../data/mockData';

// MVP note: these open the real login/web pages in the browser.
// No OAuth flow is wired up yet — that's intentionally out of scope for this pass.
const SNAP_LOGIN_URL = 'https://accounts.snapchat.com/accounts/login';
const ROBLOX_LOGIN_URL = 'https://www.roblox.com/login';

function ConnectRow({ platformLabel, connected, accent, url }) {
  return (
    <View style={styles.connectRow}>
      <View>
        <Text style={styles.connectLabel}>{platformLabel}</Text>
        <Text style={[styles.connectStatus, { color: connected ? '#2BAE66' : colors.textMuted }]}>
          {connected ? 'Connected' : 'Not connected'}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.connectBtn, { backgroundColor: connected ? 'transparent' : accent, borderColor: accent }]}
        onPress={() => Linking.openURL(url)}
        activeOpacity={0.8}
      >
        <Text style={[styles.connectBtnText, { color: connected ? accent : colors.robloxInk }]}>
          {connected ? 'Manage' : 'Connect'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.eyebrow}>PROFILE</Text>
        <Text style={styles.name}>{user.displayName}</Text>

        <Text style={styles.sectionTitle}>Connected accounts</Text>
        <ConnectRow
          platformLabel="Snapchat"
          connected={user.snapConnected}
          accent={colors.snapYellow}
          url={SNAP_LOGIN_URL}
        />
        <ConnectRow
          platformLabel="Roblox"
          connected={user.robloxConnected}
          accent={colors.fusionViolet}
          url={ROBLOX_LOGIN_URL}
        />

        <Text style={styles.footNote}>
          Connecting takes you to each platform's own login page. Sea SSA doesn't store your
          password — this is a mockup pass ahead of full account linking.
        </Text>
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
  name: {
    fontFamily: type.display,
    fontSize: 26,
    color: colors.textPrimary,
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontFamily: type.displayMedium,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  connectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  connectLabel: {
    fontFamily: type.bodySemibold,
    fontSize: 15,
    color: colors.textPrimary,
  },
  connectStatus: {
    fontFamily: type.body,
    fontSize: 12,
    marginTop: 2,
  },
  connectBtn: {
    borderWidth: 1.5,
    borderRadius: radii.pill,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  connectBtnText: {
    fontFamily: type.bodySemibold,
    fontSize: 13,
  },
  footNote: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.lg,
    lineHeight: 17,
  },
});
