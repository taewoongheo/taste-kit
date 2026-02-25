// @ts-nocheck
import { Colors, Layout } from '@/constants';
import { useColorScheme } from '@/hooks';
import type React from 'react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';

// --- Types ---

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom';

interface ToastProps {
  children: React.ReactNode;
}

export interface ToastOptions {
  duration?: number;
  type?: ToastType;
  position?: ToastPosition;
  onClose?: () => void;
  action?: {
    label: string;
    onPress: () => void;
  } | null;
}

interface ToastData {
  id: string;
  content: React.ReactNode | string;
  options: Required<ToastOptions>;
}

interface ToastContextValue {
  toasts: ToastData[];
  show: (content: React.ReactNode | string, options?: ToastOptions) => string;
  update: (id: string, content: React.ReactNode | string, options?: ToastOptions) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

// --- Context + Provider ---

const DEFAULT_TOAST_OPTIONS: Required<ToastOptions> = {
  duration: 3000,
  type: 'default',
  position: 'bottom',
  onClose: () => {},
  action: null,
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const show = useCallback((content: React.ReactNode | string, options?: ToastOptions): string => {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: ToastData = {
      id,
      content,
      options: {
        ...DEFAULT_TOAST_OPTIONS,
        ...options,
      },
    };
    setToasts((prevToasts) => [...prevToasts, toast]);
    return id;
  }, []);

  const update = useCallback(
    (id: string, content: React.ReactNode | string, options?: ToastOptions) => {
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === id
            ? {
                ...toast,
                content,
                options: {
                  ...toast.options,
                  ...options,
                },
              }
            : toast,
        ),
      );
    },
    [],
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const value: ToastContextValue = {
    toasts,
    show,
    update,
    dismiss,
    dismissAll,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

// --- Toast UI Component ---

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface ToastItemProps {
  toast: ToastData;
  index: number;
}

const getBackgroundColor = (type: ToastType, colors: (typeof Colors)['light']) => {
  switch (type) {
    case 'success':
      return colors.success;
    case 'error':
      return colors.destructive;
    case 'warning':
      return colors.warning;
    case 'info':
      return colors.accent;
    default:
      return Colors.dark.backgroundElevated;
  }
};

const getIconForType = (type: ToastType) => {
  switch (type) {
    case 'success':
      return '\u2713';
    case 'error':
      return '\u2717';
    case 'warning':
      return '\u26A0';
    case 'info':
      return '\u2139';
    default:
      return '';
  }
};

const ToastItem: React.FC<ToastItemProps> = ({ toast, index }) => {
  const prevIndexRef = useRef<number>(-1);
  const { dismiss } = useToast();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const opacity = useSharedValue<number>(1);
  const translateY = useSharedValue<number>(toast.options.position === 'top' ? -100 : 100);
  const scale = useSharedValue<number>(0.9);

  const getStackOffset = useCallback(() => {
    const baseOffset = 4;
    const maxOffset = 12;
    const offset = Math.min(index * baseOffset, maxOffset);
    return toast.options.position === 'top' ? offset : -offset;
  }, [index, toast.options.position]);

  const getStackScale = useCallback(() => {
    const scaleReduction = 0.02;
    const minScale = 0.92;
    return Math.max(1 - index * scaleReduction, minScale);
  }, [index]);

  useEffect(() => {
    if (prevIndexRef.current !== index && opacity.value > 0) {
      const soonerOffset = toast.options.position === 'top' ? 5 : -5;

      translateY.value = withTiming(getStackOffset() + soonerOffset, {
        duration: 400,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      });

      scale.value = withTiming(getStackScale() * 0.98, {
        duration: 400,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      });

      setTimeout(() => {
        translateY.value = withSpring(getStackOffset(), {
          damping: 25,
          stiffness: 120,
          mass: 0.8,
          velocity: 0,
        });

        scale.value = withSpring(getStackScale(), {
          damping: 25,
          stiffness: 120,
          mass: 0.8,
          velocity: 0,
        });
      }, 200);
    }

    prevIndexRef.current = index;
  }, [index, toast.options.position, translateY, scale, opacity, getStackOffset, getStackScale]);

  const handleDismiss = useCallback(() => {
    dismiss(toast.id);
    toast.options.onClose?.();
  }, [dismiss, toast.id, toast.options.onClose]);

  const animatedDismiss = useCallback(() => {
    opacity.value = withTiming(0, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    });

    translateY.value = withTiming(toast.options.position === 'top' ? -50 : 50, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    });

    scale.value = withTiming(0.85, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    });

    setTimeout(() => {
      handleDismiss();
    }, 300);
  }, [opacity, translateY, scale, handleDismiss, toast.options.position]);

  useEffect(() => {
    const delay = index * 50;

    setTimeout(() => {
      translateY.value = withSpring(getStackOffset(), {
        damping: 28,
        stiffness: 140,
        mass: 0.8,
        velocity: 0,
      });

      scale.value = withSpring(getStackScale(), {
        damping: 28,
        stiffness: 140,
        mass: 0.8,
        velocity: 0,
      });
    }, delay);

    if (toast.options.duration > 0) {
      const exitDelay = Math.max(0, toast.options.duration - 500);

      const exitAnimations = () => {
        opacity.value = withTiming(0, {
          duration: 400,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        });

        translateY.value = withTiming(toast.options.position === 'top' ? -20 : 20, {
          duration: 400,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        });

        scale.value = withTiming(0.95, {
          duration: 400,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        });

        setTimeout(() => {
          scheduleOnRN(handleDismiss);
        }, 400);
      };

      setTimeout(exitAnimations, exitDelay);
    }
  }, [toast, opacity, translateY, scale, index, getStackOffset, getStackScale, handleDismiss]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
      zIndex: 1000 - index,
    };
  });

  const backgroundColor = getBackgroundColor(toast.options.type, colors);
  const icon = getIconForType(toast.options.type);

  return (
    <Animated.View
      style={[
        toastStyles.toastContainer,
        animatedStyle,
        {
          position: 'absolute',
          top: toast.options.position === 'top' ? 0 : undefined,
          bottom: toast.options.position === 'bottom' ? 0 : undefined,
        },
      ]}
    >
      <View style={[toastStyles.toast, { backgroundColor }]}>
        <View style={toastStyles.mainContent}>
          {icon ? <Text style={toastStyles.icon}>{icon}</Text> : null}
          <View style={toastStyles.contentContainer}>
            {typeof toast.content === 'string' ? (
              <Text style={toastStyles.text}>{toast.content}</Text>
            ) : (
              toast.content
            )}
          </View>
          {toast.options.action && (
            <TouchableOpacity
              style={toastStyles.actionButton}
              onPress={() => {
                toast.options.action?.onPress();
                animatedDismiss();
              }}
            >
              <Text style={toastStyles.actionText}>{toast.options.action.label}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const toastStyles = StyleSheet.create({
  toastContainer: {
    width: '100%',
    paddingHorizontal: 8,
    alignSelf: 'center',
    marginVertical: 4,
  },
  toast: {
    flexDirection: 'column',
    borderRadius: Layout.radiusLg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
  },
  icon: {
    color: '#fff',
    fontSize: 20,
    marginRight: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 24,
  },
  contentContainer: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginLeft: 12,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

// --- ToastViewport ---

const ToastViewport: React.FC = () => {
  const { toasts } = useToast();
  const insets = useSafeAreaInsets();

  const topToasts = toasts.filter((toast) => toast.options.position === 'top');
  const bottomToasts = toasts.filter((toast) => toast.options.position === 'bottom');

  return (
    <>
      <View
        style={[viewportStyles.viewport, viewportStyles.topViewport, { marginTop: insets.top }]}
      >
        {topToasts.map((toast, arrayIndex) => {
          const displayIndex = topToasts.length - 1 - arrayIndex;
          return <ToastItem key={toast.id} toast={toast} index={displayIndex} />;
        })}
      </View>
      <View
        style={[
          viewportStyles.viewport,
          viewportStyles.bottomViewport,
          { marginBottom: insets.bottom },
        ]}
      >
        {bottomToasts.map((toast, arrayIndex) => {
          const displayIndex = bottomToasts.length - 1 - arrayIndex;
          return <ToastItem key={toast.id} toast={toast} index={displayIndex} />;
        })}
      </View>
    </>
  );
};

const viewportStyles = StyleSheet.create({
  viewport: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    pointerEvents: 'box-none',
  },
  topViewport: {
    top: 0,
  },
  bottomViewport: {
    bottom: 0,
  },
});

// --- Imperative API + ToastProviderWithViewport ---

type ToastRef = {
  show?: (content: React.ReactNode | string, options?: ToastOptions) => string;
  update?: (id: string, content: React.ReactNode | string, options?: ToastOptions) => void;
  dismiss?: (id: string) => void;
  dismissAll?: () => void;
};

const toastRef: ToastRef = {};

const ToastController: React.FC = () => {
  const toast = useToast();

  toastRef.show = toast.show;
  toastRef.update = toast.update;
  toastRef.dismiss = toast.dismiss;
  toastRef.dismissAll = toast.dismissAll;

  return null;
};

export const ToastProviderWithViewport: React.FC<ToastProps> = ({ children }) => {
  return (
    <ToastProvider>
      <ToastController />
      {children}
      <ToastViewport />
    </ToastProvider>
  );
};

export const Toast = {
  show: (content: React.ReactNode | string, options?: ToastOptions): string => {
    if (!toastRef.show) {
      console.error(
        'Toast provider not initialized. Make sure you have wrapped your app with ToastProviderWithViewport.',
      );
      return '';
    }
    return toastRef.show(content, options);
  },
  update: (id: string, content: React.ReactNode | string, options?: ToastOptions) => {
    if (!toastRef.update) {
      console.error(
        'Toast provider not initialized. Make sure you have wrapped your app with ToastProviderWithViewport.',
      );
      return;
    }
    return toastRef.update(id, content, options);
  },
  dismiss: (id: string) => {
    if (!toastRef.dismiss) {
      console.error(
        'Toast provider not initialized. Make sure you have wrapped your app with ToastProviderWithViewport.',
      );
      return;
    }
    return toastRef.dismiss(id);
  },
  dismissAll: () => {
    if (!toastRef.dismissAll) {
      console.error(
        'Toast provider not initialized. Make sure you have wrapped your app with ToastProviderWithViewport.',
      );
      return;
    }
    return toastRef.dismissAll();
  },
};
