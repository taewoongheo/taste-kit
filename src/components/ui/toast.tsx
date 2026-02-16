import { Colors, Layout, Spacing, Springs } from '@/constants';
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, { FadeOut, SlideInUp } from 'react-native-reanimated';

import { Text } from './text';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastConfig {
  message: string;
  type?: ToastType;
  /** Auto-dismiss duration in ms (default: 3000, 0 to disable) */
  duration?: number;
}

interface ToastContextValue {
  show: (config: ToastConfig) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

interface ActiveToast extends ToastConfig {
  id: number;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ActiveToast[]>([]);
  const idRef = useRef(0);

  const show = useCallback((config: ToastConfig) => {
    const id = ++idRef.current;
    const duration = config.duration ?? 3000;

    setToasts((prev) => [...prev, { ...config, id }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Animated.View style={styles.container} pointerEvents="box-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </Animated.View>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast }: { toast: ActiveToast }) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const accentColor = getToastColor(toast.type ?? 'info', colors);

  return (
    <Animated.View
      entering={SlideInUp.springify()
        .damping(Springs.snappy.damping)
        .stiffness(Springs.snappy.stiffness)}
      exiting={FadeOut.duration(200)}
      style={[
        styles.toast,
        { backgroundColor: colors.backgroundElevated, borderLeftColor: accentColor },
      ]}
    >
      <Text variant="label">{toast.message}</Text>
    </Animated.View>
  );
}

function getToastColor(
  type: ToastType,
  colors: (typeof Colors)['light'] | (typeof Colors)['dark'],
) {
  switch (type) {
    case 'success':
      return colors.success;
    case 'error':
      return colors.destructive;
    case 'warning':
      return colors.warning;
    case 'info':
      return colors.accent;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: Spacing.md,
    right: Spacing.md,
    gap: Spacing.sm,
    zIndex: 9999,
  },
  toast: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Layout.radiusMd,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
