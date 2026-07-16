import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, type, spacing, radii } from '../theme/theme';
import { friendSuggestions } from '../data/mockData';

function FriendRow({ friend }) {
  const isSnap = friend.suggestFor === 'snap';
  const accent = isSnap ? colors.snapYellow : colors.fusionViolet;
  const label = isSnap ? 'Add on Snap' : 'Add on Roblox';

  return (
    <View style={styles.row}>
      <View style={[styles.avatar, { backgroundColor: friend.avatarColor }]}>
        <Text style={styles.avatarInitial}>{friend.name[0]}</Text>
      </View>
      <View style={styles.rowInfo}>
        <Text style={styles.rowName}>{friend.name}</Text>
        <Text style={styles.rowMeta}>{friend.mutual}</Text>
      </View>
      <TouchableOpacity style={[styles.addBtn, { borderColor: accent }]} activeOpacity={0.7}>
        <Text style={[styles.addBtnText, { color: accent }]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function FriendRadarScreen() {
  const snapSuggestions = friendSuggestions.filter((f) => f.suggestFor === 'snap');
  const robloxSuggestions = friendSuggestions.filter((f) => f.suggestFor === 'roblox');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>FRIEND RADAR</Text>
        <Text style={styles.title}>People you know on one platform, missing from the other</Text>

        <Text style={styles.groupTitle}>Bring onto Roblox</Text>
        {snapSuggestions.map((f) => (
          <FriendRow key={f.id} friend={f} />
        ))}

        <Text style={styles.groupTitle}>Bring onto Snap</Text>
        {robloxSuggestions.map((f) => (
          <FriendRow key={f.id} friend={f} />
        ))}

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
  title: {
    fontFamily: type.display,
    fontSize: 22,
    color: colors.textPrimary,
    marginTop: 4,
    marginBottom: spacing.lg,
    lineHeight: 28,
  },
  groupTitle: {
    fontFamily: type.displayMedium,
    fontSize: 15,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: type.display,
    fontSize: 16,
    color: '#FFFFFF',
  },
  rowInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  rowName: {
    fontFamily: type.bodySemibold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  rowMeta: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.textSecondary,
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
});
