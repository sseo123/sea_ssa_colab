// All data here is mocked for the MVP — no live Snap/Roblox APIs are called.
// Screens read from this file so it's a single place to swap in real data later.

export const user = {
  displayName: 'Jordan',
  snapConnected: true,
  robloxConnected: false,
};

export const snapStreak = {
  friendName: 'Ava',
  days: 7,
  goal: 5,
  emoji: '🔥',
};

export const robloxStreak = {
  gameName: 'Skyway Tycoon',
  daysPlayedThisWeek: 3,
  goal: 5,
};

export const collectibles = [
  { id: 'c1', name: 'Voxel Ghost Bitmoji', source: 'snap', unlocked: true, rarity: 'Rare' },
  { id: 'c2', name: 'Neon Streak Cape', source: 'roblox', unlocked: true, rarity: 'Common' },
  { id: 'c3', name: 'Golden Bitmoji Ghost', source: 'snap', unlocked: false, rarity: 'Epic' },
  { id: 'c4', name: 'Snap Ghost Backpack', source: 'roblox', unlocked: false, rarity: 'Rare' },
  { id: 'c5', name: 'Animated Streak Bitmoji', source: 'snap', unlocked: false, rarity: 'Legendary' },
  { id: 'c6', name: 'Ghost Trail Effect', source: 'roblox', unlocked: false, rarity: 'Epic' },
];

export const squadChallenge = {
  title: 'Weekend Fusion Challenge',
  description: 'Keep a Snap streak with 2 friends AND finish a level together on Roblox.',
  progress: 0.6,
  reward: 'Exclusive Fusion Ghost skin',
  daysLeft: 2,
};

export const friendSuggestions = [
  {
    id: 'f1',
    name: 'Maya',
    avatar: require('../../assets/avatars/avatar-maya.png'),
    mutual: 'On Snap already',
    suggestFor: 'roblox',
  },
  {
    id: 'f2',
    name: 'Shawn',
    avatar: require('../../assets/avatars/avatar-shawn.png'),
    mutual: 'Plays your Roblox game',
    suggestFor: 'snap',
  },
  {
    id: 'f3',
    name: 'Priya',
    avatar: require('../../assets/avatars/avatar-priya.png'),
    mutual: 'On Snap already',
    suggestFor: 'roblox',
  },
  {
    id: 'f4',
    name: 'Leo',
    avatar: require('../../assets/avatars/avatar-leo.png'),
    mutual: 'Plays your Roblox game',
    suggestFor: 'snap',
  },
];

export default {
  user,
  snapStreak,
  robloxStreak,
  collectibles,
  squadChallenge,
  friendSuggestions,
};
