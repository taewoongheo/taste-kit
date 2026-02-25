// @ts-nocheck
import { BlurView } from 'expo-blur';
import type { BlurTint } from 'expo-blur';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import {
  Modal,
  Pressable,
  type PressableProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
  withTiming,
  interpolate,
  Easing,
  Extrapolation,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

// ─── Types ───────────────────────────────────────────────────────────────────

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export interface DialogProps {
  children: ReactNode;
}

export interface DialogTriggerProps {
  children: ReactNode;
  readonly asChild?: boolean;
}

export interface DialogContentProps {
  children: ReactNode;
  readonly onClose?: () => void;
  readonly backdropBlur?: number;
  readonly backdropColor?: string;
  readonly backdropTint?: BlurTint;
}

export interface DialogCloseProps {
  children: ReactNode;
  readonly asChild?: boolean;
}

export interface DialogComponent extends React.FC<DialogProps> {
  Trigger: React.FC<DialogTriggerProps>;
  Content: React.FC<DialogContentProps>;
  Close: React.FC<DialogCloseProps>;
}

interface ExtendedDialogContextType extends DialogContextType {
  closeDialog: () => void;
  animationProgress: SharedValue<number>;
}

interface ExtendedDialogContentProps extends DialogContentProps {
  readonly isAnimating?: boolean;
  readonly setIsAnimating?: (animating: boolean) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const DialogContext = createContext<ExtendedDialogContextType | undefined>(undefined);

const useDialogContext = (): ExtendedDialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within Dialog');
  }
  return context;
};

// ─── Components ──────────────────────────────────────────────────────────────

export const Dialog: DialogComponent = ({ children }: DialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const animationProgress = useSharedValue<number>(0);

  const closeDialog = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const contextValue = React.useMemo(
    () => ({ isOpen, setIsOpen, closeDialog, animationProgress }),
    [isOpen, closeDialog, animationProgress],
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DialogContent) {
          return React.cloneElement(child, {
            ...child.props,
            isAnimating,
            setIsAnimating,
          });
        }
        return child;
      })}
    </DialogContext.Provider>
  );
};

// If children has its own Pressable (e.g. Button), use asChild to inject onPress directly.
// Without asChild, nested Pressable intercepts touch and the trigger won't fire.
const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, asChild }) => {
  const { setIsOpen } = useDialogContext();

  const handlePress = (): void => {
    setIsOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onPress: handlePress,
    } as Partial<PressableProps>);
  }

  return <Pressable onPress={handlePress}>{children}</Pressable>;
};

const DialogContent: React.FC<ExtendedDialogContentProps> = ({
  children,
  onClose,
  backdropBlur = 20,
  backdropColor = 'rgba(0, 0, 0, 0.5)',
  backdropTint = 'dark',
  isAnimating: externalIsAnimating,
  setIsAnimating: externalSetIsAnimating,
}) => {
  const { isOpen, setIsOpen, animationProgress } = useDialogContext();

  useEffect(() => {
    if (isOpen) {
      animationProgress.value = withTiming(1, {
        duration: 300,
        easing: Easing.bezier(0.2, 0, 0, 1),
      });
    }
  }, [isOpen, animationProgress]);

  useEffect(() => {
    if (externalIsAnimating) {
      animationProgress.value = withTiming(
        0,
        {
          duration: 250,
          easing: Easing.bezier(0.4, 0, 1, 1),
        },
        (finished) => {
          if (finished) {
            scheduleOnRN(setIsOpen, false);
            scheduleOnRN(externalSetIsAnimating!, false);
            if (onClose) {
              scheduleOnRN(onClose);
            }
          }
        },
      );
    }
  }, [externalIsAnimating, animationProgress, externalSetIsAnimating, onClose, setIsOpen]);

  const handleBackdropPress = useCallback(() => {
    externalSetIsAnimating?.(true);
  }, [externalSetIsAnimating]);

  const handleRequestClose = useCallback(() => {
    externalSetIsAnimating?.(true);
  }, [externalSetIsAnimating]);

  const contentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animationProgress.value, [0, 1], [0, 1], Extrapolation.CLAMP);

    const scale = externalIsAnimating
      ? interpolate(animationProgress.value, [0, 1], [0.85, 1], Extrapolation.CLAMP)
      : interpolate(animationProgress.value, [0, 1], [0.92, 1], Extrapolation.CLAMP);

    const translateY = interpolate(animationProgress.value, [0, 1], [12, 0], Extrapolation.CLAMP);

    return {
      opacity,
      transform: [{ scale }, { translateY }],
    };
  });

  // Static BlurView, animated via parent opacity (GPU-composited, no native blur recalc)
  // Blur reaches full opacity early to minimize text ghosting in mid-opacity range
  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animationProgress.value, [0, 0.35, 1], [0, 1, 1], Extrapolation.CLAMP),
  }));

  if (!isOpen) return null;

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleRequestClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.modalContainer}>
          <Animated.View style={[StyleSheet.absoluteFill, backdropAnimatedStyle]}>
            <BlurView
              style={StyleSheet.absoluteFill}
              intensity={backdropBlur}
              tint={backdropTint}
            />
            <View style={[StyleSheet.absoluteFill, { backgroundColor: backdropColor }]} />
          </Animated.View>
          <Animated.View style={[styles.contentWrapper, contentStyle]}>
            <TouchableWithoutFeedback>
              <View>{children}</View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const DialogClose: React.FC<DialogCloseProps> = ({ children, asChild }) => {
  const { closeDialog } = useDialogContext();

  const handlePress = (): void => {
    closeDialog();
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onPress: handlePress,
    } as Partial<PressableProps>);
  }

  return <Pressable onPress={handlePress}>{children}</Pressable>;
};

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Close = DialogClose;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
});
