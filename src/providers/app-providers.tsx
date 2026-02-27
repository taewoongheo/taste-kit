import { ErrorBoundary, ToastProviderWithViewport } from '@/components/ui';
import { migrate } from '@/lib';
import { useMemoStore } from '@/stores';
import { useSQLiteContext } from 'expo-sqlite';
import { SQLiteProvider } from 'expo-sqlite';
import { useEffect, useState, type ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface AppProvidersProps {
  children: ReactNode;
}

// Initializes all DB-dependent stores after migration completes.
// Add new store.init() calls here when adding stores.
function StoreInitializer({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function initStores() {
      await useMemoStore.getState().init(db);
      setReady(true);
    }
    initStores();
  }, [db]);

  if (!ready) return null;

  return <>{children}</>;
}

/**
 * Root providers wrapper.
 * Add new providers here — they wrap the entire app.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <GestureHandlerRootView style={styles.root}>
      <ErrorBoundary>
        <SQLiteProvider databaseName="taste-kit.db" onInit={migrate}>
          <StoreInitializer>
            <ToastProviderWithViewport>{children}</ToastProviderWithViewport>
          </StoreInitializer>
        </SQLiteProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
