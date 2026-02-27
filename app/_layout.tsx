import '@/lib/i18n';
import { AnimatedPressable } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import { useColorScheme } from '@/hooks';
import { useLoadFonts } from '@/lib';
import { AppProviders } from '@/providers';
import { useAppStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Redirect, Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

function DevFloatingButton() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { bottom } = useSafeAreaInsets();

  return (
    <AnimatedPressable
      style={[
        styles.fab,
        { backgroundColor: colors.accent, bottom: bottom + Spacing.md },
      ]}
      onPress={() => router.push('/demo' as never)}
    >
      <Ionicons name="construct" size={22} color="#FFFFFF" />
    </AnimatedPressable>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isOnboarded = useAppStore((s) => s.isOnboarded);
  const { loaded: fontsLoaded } = useLoadFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <AppProviders>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {!isOnboarded && <Redirect href="/onboarding" />}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="demo" options={{ headerShown: false }} />
        </Stack>
        {__DEV__ && <DevFloatingButton />}
        <StatusBar style="auto" />
      </ThemeProvider>
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: Spacing.md,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
