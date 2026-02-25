// @ts-nocheck
import * as Haptics from 'expo-haptics';
import React, {
  useState,
  createContext,
  useContext,
  useRef,
  type ReactNode,
  Children,
  useCallback,
} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  type PressableProps,
  StyleSheet,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

// ─── Constants ────────────────────────────────────────────────────────────────

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const GAP = 8;
const EDGE_MARGIN = 8;
const ITEM_HEIGHT = 44;
const CONTENT_PADDING = 8;

// ─── Types ────────────────────────────────────────────────────────────────────

interface TriggerLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DropdownContextValue {
  visible: boolean;
  open: () => void;
  close: () => void;
  triggerLayout: TriggerLayout | null;
  setTriggerLayout: (layout: TriggerLayout) => void;
  flipAnim: SharedValue<number>;
  activeItemIndex?: SharedValue<number>;
}

interface TriggerProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  asChild?: boolean;
}

interface ContentProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  position?: 'top' | 'bottom' | 'auto';
}

interface ItemProps {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  index?: number;
}

type StyleProp<T> = T | T[] | undefined;

// ─── Shared: Context ──────────────────────────────────────────────────────────

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

const useDropdownContext = (): DropdownContextValue => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('Dropdown components must be used within a Dropdown');
  return context;
};

// ─── Shared: Trigger ──────────────────────────────────────────────────────────

// If children has its own Pressable (e.g. Button), use asChild to inject onPress directly.
// Without asChild, nested Pressable intercepts touch and the trigger won't fire.
// View wrapper is required for measure() to get trigger position on screen.
const Trigger = ({ children, style, asChild }: TriggerProps): JSX.Element => {
  const { open, setTriggerLayout } = useDropdownContext();
  const triggerRef = useRef<View>(null);

  const handlePress = (): void => {
    triggerRef.current?.measure(
      (_x: number, _y: number, width: number, height: number, pageX: number, pageY: number) => {
        setTriggerLayout({ x: pageX, y: pageY, width, height });
        open();
      },
    );
  };

  if (asChild && React.isValidElement(children)) {
    return (
      <View ref={triggerRef} style={[{ alignSelf: 'flex-start' }, style]} collapsable={false}>
        {React.cloneElement(children, {
          onPress: handlePress,
        } as Partial<PressableProps>)}
      </View>
    );
  }

  return (
    <Pressable ref={triggerRef} onPress={handlePress} style={style}>
      {children}
    </Pressable>
  );
};

// ─── Shared: Position calculation ─────────────────────────────────────────────

function calculatePosition(
  triggerLayout: TriggerLayout,
  contentDimensions: { width: number; height: number },
  position: 'top' | 'bottom' | 'auto',
) {
  const { x, y, width, height } = triggerLayout;
  const { width: contentWidth, height: contentHeight } = contentDimensions;

  let top = y + height + GAP;
  // Center content on trigger's horizontal midpoint
  const triggerCenter = x + width / 2;
  let left = triggerCenter - contentWidth / 2;

  if (position === 'auto') {
    const spaceBelow = SCREEN_HEIGHT - (y + height);
    const spaceAbove = y;

    if (spaceBelow >= contentHeight + GAP) {
      top = y + height + GAP;
    } else if (spaceAbove >= contentHeight + GAP) {
      top = y - contentHeight - GAP;
    } else {
      top =
        spaceBelow > spaceAbove ? y + height + GAP : Math.max(EDGE_MARGIN, y - contentHeight - GAP);
    }
  } else if (position === 'top') {
    top = y - contentHeight - GAP;
  } else if (position === 'bottom') {
    top = y + height + GAP;
  }

  top = Math.max(EDGE_MARGIN, Math.min(top, SCREEN_HEIGHT - contentHeight - EDGE_MARGIN));
  left = Math.max(EDGE_MARGIN, Math.min(left, SCREEN_WIDTH - contentWidth - EDGE_MARGIN));

  const opensBelow = top >= y + height;
  return { top, left, opensBelow };
}

// ─── Shared: Styles ───────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: { flex: 1 },
  content: {
    position: 'absolute',
    borderRadius: 12,
    padding: CONTENT_PADDING,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: ITEM_HEIGHT,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// Dropdown — standard tap-to-select
// ═══════════════════════════════════════════════════════════════════════════════

const Dropdown = ({ children }: { children: ReactNode }): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout | null>(null);
  const flipAnim = useSharedValue<number>(0);

  const open = (): void => {
    setVisible(true);
    flipAnim.value = withSpring(1, { damping: 15, stiffness: 150, mass: 0.8 });
  };

  const close = (): void => {
    flipAnim.value = withTiming(0, { duration: 200, easing: Easing.bezier(0.4, 0, 0.6, 1) });
    setTimeout(() => setVisible(false), 200);
  };

  return (
    <DropdownContext.Provider
      value={{ visible, open, close, triggerLayout, setTriggerLayout, flipAnim }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

const DropdownContent = ({
  children,
  style,
  position = 'auto',
}: ContentProps): JSX.Element | null => {
  const { visible, close, triggerLayout, flipAnim } = useDropdownContext();
  const contentRef = useRef<View>(null);
  const [contentDimensions, setContentDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const pos =
    triggerLayout && contentDimensions
      ? calculatePosition(triggerLayout, contentDimensions, position)
      : { top: 0, left: 0, opensBelow: true };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(flipAnim.value, [0, 0.5, 1], [0, 0.5, 1]),
    transform: [{ scale: interpolate(flipAnim.value, [0, 1], [0.9, 1]) }],
    transformOrigin: pos.opensBelow ? 'top center' : 'bottom center',
  }));

  if (!visible || !triggerLayout) return null;

  return (
    <Modal transparent visible={visible} onRequestClose={close} animationType="none">
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={close}>
        <Animated.View
          ref={contentRef}
          onLayout={(e) =>
            setContentDimensions({
              width: e.nativeEvent.layout.width,
              height: e.nativeEvent.layout.height,
            })
          }
          style={[
            styles.content,
            style,
            {
              top: contentDimensions ? pos.top : triggerLayout.y + triggerLayout.height + GAP,
              left: contentDimensions ? pos.left : triggerLayout.x,
            },
            animatedStyle,
          ]}
        >
          {children}
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const DropdownItem = ({ children, onPress, style }: ItemProps): JSX.Element => {
  const { close } = useDropdownContext();

  const handlePress = (): void => {
    onPress?.();
    close();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.item,
        style,
        pressed && { backgroundColor: 'rgba(0,0,0,0.06)' },
      ]}
    >
      {children}
    </Pressable>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;

// ═══════════════════════════════════════════════════════════════════════════════
// PanDropdown — pan-to-select with haptic feedback
// ═══════════════════════════════════════════════════════════════════════════════

const PanDropdown = ({ children }: { children: ReactNode }): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout | null>(null);
  const flipAnim = useSharedValue<number>(0);
  const activeItemIndex = useSharedValue<number>(-1);

  const open = (): void => {
    setVisible(true);
    flipAnim.value = withSpring(1, { damping: 15, stiffness: 150, mass: 0.8 });
  };

  const close = (): void => {
    flipAnim.value = withTiming(0, { duration: 200, easing: Easing.bezier(0.4, 0, 0.6, 1) });
    activeItemIndex.value = -1;
    setTimeout(() => setVisible(false), 200);
  };

  return (
    <DropdownContext.Provider
      value={{ visible, open, close, triggerLayout, setTriggerLayout, flipAnim, activeItemIndex }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

const PanDropdownContent = ({
  children,
  style,
  position = 'auto',
}: ContentProps): JSX.Element | null => {
  const { visible, close, triggerLayout, flipAnim, activeItemIndex } = useDropdownContext();
  const itemCount = Children.count(children);
  const lastHapticIndex = useSharedValue<number>(-1);
  const contentRef = useRef<View>(null);
  const [contentDimensions, setContentDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const triggerHaptic = useCallback(
    () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
    [],
  );

  const pos =
    triggerLayout && contentDimensions
      ? calculatePosition(triggerLayout, contentDimensions, position)
      : { top: 0, left: 0, opensBelow: true };

  const calculateActiveIndex = useCallback(
    (y: number) => {
      'worklet';
      const relativeY = y - CONTENT_PADDING;
      const index = Math.floor(relativeY / ITEM_HEIGHT);
      if (index < 0) return 0;
      if (index >= itemCount) return itemCount - 1;
      return index;
    },
    [itemCount],
  );

  const panGesture = Gesture.Pan()
    .minDistance(0)
    .onBegin((event) => {
      'worklet';
      const index = calculateActiveIndex(event.y);
      activeItemIndex!.value = index;
      lastHapticIndex.value = index;
      scheduleOnRN(triggerHaptic);
    })
    .onUpdate((event) => {
      'worklet';
      const index = calculateActiveIndex(event.y);
      if (index !== activeItemIndex!.value) {
        activeItemIndex!.value = index;
        if (index !== lastHapticIndex.value) {
          lastHapticIndex.value = index;
          scheduleOnRN(triggerHaptic);
        }
      }
    })
    .onEnd(() => {
      'worklet';
      activeItemIndex!.value = -1;
      lastHapticIndex.value = -1;
    })
    .onFinalize(() => {
      'worklet';
      activeItemIndex!.value = -1;
      lastHapticIndex.value = -1;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(flipAnim.value, [0, 0.5, 1], [0, 0.5, 1]),
    transform: [{ scale: interpolate(flipAnim.value, [0, 1], [0.9, 1]) }],
    transformOrigin: pos.opensBelow ? 'top center' : 'bottom center',
  }));

  if (!visible || !triggerLayout) return null;

  const childrenWithIndex = Children.map(children, (child, index) =>
    React.isValidElement(child) ? React.cloneElement(child, { ...child.props, index }) : child,
  );

  return (
    <Modal transparent visible={visible} onRequestClose={close} animationType="none">
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={close}>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            ref={contentRef}
            onLayout={(e) =>
              setContentDimensions({
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height,
              })
            }
            style={[
              styles.content,
              style,
              {
                top: contentDimensions ? pos.top : triggerLayout.y + triggerLayout.height + GAP,
                left: contentDimensions ? pos.left : triggerLayout.x,
              },
              animatedStyle,
            ]}
          >
            {childrenWithIndex}
          </Animated.View>
        </GestureDetector>
      </TouchableOpacity>
    </Modal>
  );
};

const PanDropdownItem = ({ children, onPress, style, index = 0 }: ItemProps): JSX.Element => {
  const { close, activeItemIndex } = useDropdownContext();

  const handlePress = (): void => {
    onPress?.();
    close();
  };

  const animatedStyle = useAnimatedStyle(() => {
    const active = activeItemIndex ? activeItemIndex.value === index : false;

    return {
      transform: [
        {
          scale: withTiming(active ? 1.02 : 1, {
            duration: 120,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        },
      ],
      zIndex: active ? 100 : 1,
      backgroundColor: active ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0)',
    };
  });

  const tap = Gesture.Tap().onEnd(() => scheduleOnRN(handlePress));

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[styles.item, style, animatedStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
};

PanDropdown.Trigger = Trigger;
PanDropdown.Content = PanDropdownContent;
PanDropdown.Item = PanDropdownItem;

// ─── Export ───────────────────────────────────────────────────────────────────

export default Dropdown;
export { PanDropdown };
