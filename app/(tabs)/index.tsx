import { AnimatedPressable, Text } from '@/components/ui';
import { Colors, Spacing, Springs } from '@/constants';
import { useColorScheme } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const demos = [
  { title: 'Graphics (Shaders)', route: '/graphics' },
  { title: 'Text', route: '/demo/text' },
  { title: 'Button', route: '/demo/button' },
  { title: 'Image', route: '/demo/image' },
  { title: 'TextInput', route: '/demo/input' },
  { title: 'Divider', route: '/demo/divider' },
  { title: 'Skeleton', route: '/demo/skeleton' },
  { title: 'Bottom Sheet', route: '/demo/interactions' },
  { title: 'Dialog', route: '/demo/dialog' },
  { title: 'Navigation', route: '/demo/navigation' },
  { title: 'Tag', route: '/demo/tag' },
  { title: 'Checkbox', route: '/demo/checkbox' },
  { title: 'Dropdown', route: '/demo/dropdown' },
  { title: 'Toast', route: '/demo/toast' },
  { title: 'Notification', route: '/demo/notification' },
  { title: 'Repository (CRUD)', route: '/demo/repository' },
  { title: 'In-App Review', route: '/demo/review' },
  { title: 'In-App Purchase', route: '/demo/purchase' },
] as const;

function useEntranceStyle(delay: number) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const spring = Springs.gentle;

  // biome-ignore lint/correctness/useExhaustiveDependencies: run only on mount
  useEffect(() => {
    opacity.value = delay > 0 ? withDelay(delay, withSpring(1, spring)) : withSpring(1, spring);
    translateY.value = delay > 0 ? withDelay(delay, withSpring(0, spring)) : withSpring(0, spring);
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
}

function DemoLink({ title, route, index }: { title: string; route: string; index: number }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const bgGrouped = colors.backgroundGrouped;
  const style = useEntranceStyle(index * 30);

  return (
    <Animated.View style={style}>
      <AnimatedPressable onPress={() => router.push(route as never)}>
        <View style={[styles.card, { backgroundColor: bgGrouped }]}>
          <Text variant="label">{title}</Text>
          <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const bg = colors.background;
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: bg }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: top + Spacing.md }]}
      >
        <View style={styles.headerText}>
          <Text variant="hero">Components</Text>
          <Text variant="label" color="textSecondary">
            UI 컴포넌트 카탈로그
          </Text>
        </View>

        {demos.map((demo, i) => (
          <DemoLink key={demo.route} title={demo.title} route={demo.route} index={i} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  content: {
    padding: Spacing.md,
    gap: Spacing.sm,
    paddingBottom: Spacing['2xl'],
  },
  headerText: { marginBottom: Spacing.md },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: 12,
  },
});
