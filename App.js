import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts as useSpaceGrotesk, SpaceGrotesk_700Bold, SpaceGrotesk_500Medium } from '@expo-google-fonts/space-grotesk';
import { useFonts as useInter, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { useFonts as usePlexMono, IBMPlexMono_600SemiBold } from '@expo-google-fonts/ibm-plex-mono';
import LandingScreen from './src/screens/LandingScreen';
import RootTabs from './src/navigation/RootTabs';
import { colors } from './src/theme/theme';

export default function App() {
  const [sgLoaded] = useSpaceGrotesk({ SpaceGrotesk_700Bold, SpaceGrotesk_500Medium });
  const [interLoaded] = useInter({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold });
  const [plexLoaded] = usePlexMono({ IBMPlexMono_600SemiBold });
  const [entered, setEntered] = useState(false);

  const fontsReady = sgLoaded && interLoaded && plexLoaded;

  if (!fontsReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.snapYellow} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style={entered ? 'light' : 'dark'} />
      {entered ? (
        <RootTabs onExit={() => setEntered(false)} />
      ) : (
        <LandingScreen onEnter={() => setEntered(true)} />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pageBlack,
  },
});
