import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RewardsHubScreen from '../screens/RewardsHubScreen';
import FriendRadarScreen from '../screens/FriendRadarScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors, type } from '../theme/theme';

const Tab = createBottomTabNavigator();

function TabIcon({ glyph, focused, color }) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{glyph}</Text>
  );
}

export default function RootTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.robloxInk,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            backgroundColor: colors.bgCard,
            borderTopColor: colors.border,
            height: 88,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontFamily: type.bodyMedium,
            fontSize: 11,
            marginTop: 2,
          },
        }}
      >
        <Tab.Screen
          name="Rewards"
          component={RewardsHubScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon glyph="⛃" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Friends"
          component={FriendRadarScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon glyph="📡" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon glyph="👤" focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
