// Design tokens for Sea SSA — the Snap x Roblox fusion app.
// Palette intentionally avoids leaning fully into either brand's kit;
// violet is the "third color" that represents the merge itself.

export const colors = {
  snapYellow: '#FFFC00',
  robloxInk: '#17181C',
  bg: '#F7F6F2',
  bgCard: '#FFFFFF',
  fusionViolet: '#6C5CE7',
  streakCoral: '#FF4D6D',
  textPrimary: '#17181C',
  textSecondary: '#6B6F76',
  textMuted: '#9498A0',
  border: 'rgba(23,24,28,0.08)',
  voxelShadow: 'rgba(23,24,28,0.12)',
};

export const type = {
  display: 'SpaceGrotesk_700Bold',
  displayMedium: 'SpaceGrotesk_500Medium',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemibold: 'Inter_600SemiBold',
  mono: 'IBMPlexMono_600SemiBold',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
  voxel: 6, // deliberately squarer — nods to Roblox block geometry
};

export default { colors, type, spacing, radii };
