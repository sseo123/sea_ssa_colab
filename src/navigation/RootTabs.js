import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PrizesScreen from '../screens/PrizesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors, type } from '../theme/theme';

const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.pageBlack,
    card: colors.pageBlack,
  },
};

function TabIcon({ glyph, focused }) {
  return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.45 }}>{glyph}</Text>;
}

export default function RootTabs({ onExit }) {
  const back = onExit || (() => {});
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.snapYellow,
          tabBarInactiveTintColor: colors.onDarkMuted,
          tabBarStyle: {
            backgroundColor: colors.pageBlack,
            borderTopColor: colors.cardBorderDark,
            borderTopWidth: 1,
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
          name="Home"
          options={{ tabBarIcon: ({ focused }) => <TabIcon glyph="🏠" focused={focused} /> }}
        >
          {() => <HomeScreen onBack={back} />}
        </Tab.Screen>
        <Tab.Screen
          name="Prizes"
          options={{ tabBarIcon: ({ focused }) => <TabIcon glyph="🎁" focused={focused} /> }}
        >
          {() => <PrizesScreen onBack={back} />}
        </Tab.Screen>
        <Tab.Screen
          name="Profile"
          options={{ tabBarIcon: ({ focused }) => <TabIcon glyph="👤" focused={focused} /> }}
        >
          {() => <ProfileScreen onBack={back} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
