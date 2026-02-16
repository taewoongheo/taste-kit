import {
  AnimatedNumber,
  AnimatedPressable,
  Button,
  Collapse,
  Dialog,
  Divider,
  Image,
  Sheet,
  Skeleton,
  Text,
  TextInput,
  Toggle,
  useToast,
} from '@/components/ui';
import { Spacing, Springs } from '@/constants';
import { useThemeColor } from '@/hooks';
import { Haptic } from '@/lib';
import { useAppStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import type BottomSheet from '@gorhom/bottom-sheet';
import * as HapticsLib from 'expo-haptics';
import { router } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Staggered entrance animation — shared value + withDelay + withSpring
function useEntranceStyle(delay: number) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const spring = Springs.gentle;

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally run only on mount
  useEffect(() => {
    opacity.value = delay > 0 ? withDelay(delay, withSpring(1, spring)) : withSpring(1, spring);
    translateY.value = delay > 0 ? withDelay(delay, withSpring(0, spring)) : withSpring(0, spring);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return animatedStyle;
}

export default function HomeScreen() {
  const bg = useThemeColor('background');
  const accent = useThemeColor('accent');

  const { top } = useSafeAreaInsets();
  const [renderKey, setRenderKey] = useState(0);

  const sheetRef = useRef<BottomSheet>(null);
  const openSheet = useCallback(() => sheetRef.current?.snapToIndex(0), []);
  const { show } = useToast();

  const [dialogVisible, setDialogVisible] = useState(false);

  const handleReplay = useCallback(() => {
    Haptic.tap();
    setRenderKey((k) => k + 1);
  }, []);

  return (
    <View style={[styles.root, { backgroundColor: bg }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: top + Spacing.md }]}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text variant="hero">Components</Text>
            <Text variant="label" color="textSecondary">
              UI 컴포넌트 카탈로그
            </Text>
          </View>
          <AnimatedPressable onPress={handleReplay}>
            <View style={[styles.replayButton, { backgroundColor: accent }]}>
              <Ionicons name="refresh" size={20} color="#fff" />
            </View>
          </AnimatedPressable>
        </View>

        <ComponentsContent
          key={renderKey}
          openSheet={openSheet}
          show={show}
          setDialogVisible={setDialogVisible}
        />
      </ScrollView>

      <Sheet sheetRef={sheetRef} snapPoints={['30%']}>
        <Text variant="subtitle">Bottom Sheet</Text>
        <Text color="textSecondary">Swipe down to dismiss</Text>
      </Sheet>

      <Dialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        title="삭제하시겠습니까?"
        message="이 작업은 되돌릴 수 없습니다."
        actions={[
          {
            label: '취소',
            variant: 'ghost',
            onPress: () => setDialogVisible(false),
          },
          {
            label: '삭제',
            variant: 'destructive',
            onPress: () => {
              setDialogVisible(false);
              show({ message: '삭제되었습니다', type: 'success' });
            },
          },
        ]}
      />
    </View>
  );
}

function ComponentsContent({
  openSheet,
  show,
  setDialogVisible,
}: {
  openSheet: () => void;
  show: ReturnType<typeof useToast>['show'];
  setDialogVisible: (v: boolean) => void;
}) {
  const bgGrouped = useThemeColor('backgroundGrouped');

  const s1 = useEntranceStyle(0);
  const s2 = useEntranceStyle(100);
  const s3 = useEntranceStyle(200);
  const s4 = useEntranceStyle(300);
  const s5 = useEntranceStyle(400);

  const [toggleValue, setToggleValue] = useState(false);
  const [collapseExpanded, setCollapseExpanded] = useState(false);

  const [counterValue, setCounterValue] = useState(0);

  // Inline shake animation
  const shakeX = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));
  const shake = useCallback(() => {
    const distance = 8;
    const oscillations = 4;
    const duration = 60;
    const steps: number[] = [];
    for (let i = 0; i < oscillations; i++) {
      steps.push(i % 2 === 0 ? distance : -distance);
    }
    steps.push(0);
    shakeX.value = withSequence(...steps.map((v) => withTiming(v, { duration })));
    HapticsLib.notificationAsync(HapticsLib.NotificationFeedbackType.Error);
  }, [shakeX]);

  return (
    <>
      {/* Text */}
      <Animated.View style={[styles.section, s1]}>
        <Text variant="subtitle">Text</Text>
        <Text variant="hero">hero</Text>
        <Text variant="title">title</Text>
        <Text variant="subtitle">subtitle</Text>
        <Text variant="body">body (default)</Text>
        <Text variant="label" color="textSecondary">
          label · secondary
        </Text>
        <Text variant="caption" color="textSecondary">
          caption · secondary
        </Text>
      </Animated.View>

      {/* Button */}
      <Animated.View style={[styles.section, s1]}>
        <Text variant="subtitle">Button</Text>
        <View style={styles.row}>
          <Button title="Primary" variant="primary" size="sm" />
          <Button title="Secondary" variant="secondary" size="sm" />
        </View>
        <View style={styles.row}>
          <Button title="Destructive" variant="destructive" size="sm" />
          <Button title="Ghost" variant="ghost" size="sm" />
        </View>
        <Button title="Primary sm" variant="primary" size="sm" fullWidth />
        <Button title="Primary md" variant="primary" size="md" fullWidth />
        <Button title="Primary lg" variant="primary" size="lg" fullWidth />
        <Button title="Secondary sm" variant="secondary" size="sm" fullWidth />
        <Button title="Secondary md" variant="secondary" size="md" fullWidth />
        <Button title="Secondary lg" variant="secondary" size="lg" fullWidth />
        <Button title="Destructive sm" variant="destructive" size="sm" fullWidth />
        <Button title="Destructive md" variant="destructive" size="md" fullWidth />
        <Button title="Destructive lg" variant="destructive" size="lg" fullWidth />
        <Button title="Ghost sm" variant="ghost" size="sm" fullWidth />
        <Button title="Ghost md" variant="ghost" size="md" fullWidth />
        <Button title="Ghost lg" variant="ghost" size="lg" fullWidth />
        <Button title="Loading" loading fullWidth />
        <Button title="Disabled" disabled fullWidth />
      </Animated.View>

      {/* Image */}
      <Animated.View style={[styles.section, s2]}>
        <Text variant="subtitle">Image</Text>
        <Image
          source="https://picsum.photos/seed/taste-kit/400/200"
          radius="lg"
          contentFit="cover"
        />
        <View style={styles.row}>
          <Image
            source="https://picsum.photos/seed/avatar1/100/100"
            radius="full"
            style={{ width: 48, height: 48 }}
          />
          <Image
            source="https://picsum.photos/seed/avatar2/100/100"
            radius="full"
            style={{ width: 48, height: 48 }}
          />
          <Image
            source="https://picsum.photos/seed/avatar3/100/100"
            radius="full"
            style={{ width: 48, height: 48 }}
          />
        </View>
      </Animated.View>

      {/* TextInput */}
      <Animated.View style={[styles.section, s2]}>
        <Text variant="subtitle">TextInput</Text>
        <TextInput label="이메일" placeholder="example@mail.com" keyboardType="email-address" />
        <TextInput label="비밀번호" placeholder="8자 이상" secureTextEntry />
        <TextInput label="에러 상태" placeholder="입력하세요" error="필수 항목입니다" />
      </Animated.View>

      {/* Toggle */}
      <Animated.View style={[styles.section, s3]}>
        <Text variant="subtitle">Toggle</Text>
        <Toggle value={toggleValue} onValueChange={setToggleValue} />
      </Animated.View>

      {/* Divider */}
      <Animated.View style={[styles.section, s3]}>
        <Text variant="subtitle">Divider</Text>
        <Text color="textSecondary">기본</Text>
        <Divider />
        <Text color="textSecondary">Inset (56)</Text>
        <Divider inset={56} />
      </Animated.View>

      {/* Skeleton */}
      <Animated.View style={[styles.section, s3]}>
        <Text variant="subtitle">Skeleton</Text>
        <View style={styles.row}>
          <Skeleton circle height={48} />
          <View style={styles.skeletonLines}>
            <Skeleton width={160} height={16} />
            <Skeleton width={100} height={12} />
          </View>
        </View>
        <Skeleton height={120} radius={12} />
      </Animated.View>

      {/* Interactions */}
      <Animated.View style={[styles.section, s4]}>
        <Text variant="subtitle">Interactions</Text>
        <AnimatedPressable onPress={openSheet}>
          <View style={[styles.filledCard, { backgroundColor: bgGrouped }]}>
            <Text>Sheet 열기</Text>
          </View>
        </AnimatedPressable>
        <View style={styles.row}>
          <Button
            title="Toast: success"
            variant="secondary"
            size="sm"
            onPress={() => show({ message: '저장되었습니다', type: 'success' })}
          />
          <Button
            title="Toast: error"
            variant="secondary"
            size="sm"
            onPress={() => show({ message: '오류 발생', type: 'error' })}
          />
        </View>
        <Button
          title="Dialog 열기"
          variant="secondary"
          fullWidth
          onPress={() => setDialogVisible(true)}
        />
        <View style={styles.row}>
          <Button title="Haptic: tap" variant="ghost" size="sm" onPress={() => Haptic.tap()} />
          <Button
            title="Haptic: success"
            variant="ghost"
            size="sm"
            onPress={() => Haptic.success()}
          />
          <Button title="Haptic: error" variant="ghost" size="sm" onPress={() => Haptic.error()} />
        </View>
      </Animated.View>

      {/* Navigation */}
      <Animated.View style={[styles.section, s4]}>
        <Text variant="subtitle">Navigation</Text>
        <Button
          title="온보딩 다시 보기"
          variant="secondary"
          fullWidth
          onPress={() => {
            useAppStore.getState().setOnboarded(false);
            router.replace('/onboarding');
          }}
        />
      </Animated.View>

      {/* Animations */}
      <Animated.View style={[styles.section, s5]}>
        <Text variant="subtitle">Animations</Text>

        {/* Collapse */}
        <Button
          title={collapseExpanded ? 'Collapse 닫기' : 'Collapse 열기'}
          variant="secondary"
          size="sm"
          onPress={() => setCollapseExpanded((v) => !v)}
        />
        <Collapse expanded={collapseExpanded}>
          <View style={[styles.filledCard, { backgroundColor: bgGrouped }]}>
            <Text>접힌 콘텐츠가 여기에 표시됩니다.</Text>
            <Text color="textSecondary" variant="caption">
              height 애니메이션으로 자연스럽게 열고 닫힙니다.
            </Text>
          </View>
        </Collapse>

        {/* Shake */}
        <Animated.View style={shakeStyle}>
          <Button title="Shake!" variant="destructive" size="sm" onPress={shake} />
        </Animated.View>

        {/* AnimatedNumber */}
        <AnimatedNumber value={counterValue} align="center" />
        <View style={styles.row}>
          <Button
            title="+100"
            variant="secondary"
            size="sm"
            onPress={() => setCounterValue((v) => v + 100)}
          />
          <Button
            title="-50"
            variant="secondary"
            size="sm"
            onPress={() => setCounterValue((v) => v - 50)}
          />
          <Button title="Reset" variant="ghost" size="sm" onPress={() => setCounterValue(0)} />
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
    paddingBottom: Spacing['2xl'],
  },
  section: {
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  skeletonLines: {
    flex: 1,
    gap: Spacing.sm,
  },
  filledCard: {
    borderRadius: 12,
    padding: Spacing.md,
    overflow: 'hidden' as const,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
  },
  replayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
});
