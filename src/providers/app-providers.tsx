import { ToastProvider } from '@/components/ui';
import { migrate } from '@/lib';
import { SQLiteProvider } from 'expo-sqlite';
import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Root providers wrapper.
 * Add new providers here — they wrap the entire app.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SQLiteProvider databaseName="taste-kit.db" onInit={migrate}>
        <ToastProvider>{children}</ToastProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
