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
  return <GestureHandlerRootView style={styles.root}>{children}</GestureHandlerRootView>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
