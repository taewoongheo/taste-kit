import { Button, Text } from '@/components/ui';
import { Spacing } from '@/constants';
import { useThemeColor } from '@/hooks';
import { Haptic } from '@/lib';
import type { ReactNode } from 'react';
import { useCallback, useRef } from 'react';
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OnboardingIndicator } from './onboarding-indicator';

export interface OnboardingStep {
  /** 제목 */
  title: string;
  /** 설명 */
  description: string;
  /** 추가 컨텐츠 (이미지, 애니메이션 등) */
  content?: ReactNode;
}

export interface OnboardingFunnelProps {
  steps: OnboardingStep[];
  /** 온보딩 완료 시 호출 */
  onComplete: () => void;
  /** 스킵 시 호출 (미제공 시 스킵 버튼 숨김) */
  onSkip?: () => void;
  /** 마지막 스텝 버튼 텍스트 (default: '시작하기') */
  completeLabel?: string;
}

export function OnboardingFunnel({
  steps,
  onComplete,
  onSkip,
  completeLabel = '시작하기',
}: OnboardingFunnelProps) {
  const { width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const bg = useThemeColor('background');

  const scrollRef = useRef<ScrollView>(null);
  const currentIndex = useRef(0);
  const activeIndex = useSharedValue(0);

  const isLastStep = useCallback(() => currentIndex.current >= steps.length - 1, [steps.length]);

  const handleNext = useCallback(() => {
    if (isLastStep()) {
      onComplete();
      return;
    }
    const next = currentIndex.current + 1;
    scrollRef.current?.scrollTo({ x: next * width, animated: true });
    Haptic.selection();
  }, [isLastStep, onComplete, width]);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = e.nativeEvent.contentOffset.x;
      const index = Math.round(offset / width);
      activeIndex.value = offset / width;

      if (index !== currentIndex.current) {
        currentIndex.current = index;
        Haptic.selection();
      }
    },
    [width, activeIndex],
  );

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {onSkip && (
        <View style={[styles.skipContainer, { top: top + Spacing.sm }]}>
          <Button title="건너뛰기" variant="ghost" size="sm" onPress={onSkip} />
        </View>
      )}

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {steps.map((step) => (
          <View key={step.title} style={[styles.step, { width }]}>
            {step.content && <View style={styles.content}>{step.content}</View>}
            <Text variant="title" align="center">
              {step.title}
            </Text>
            <Text variant="body" color="textSecondary" align="center">
              {step.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: bottom + Spacing.md }]}>
        <OnboardingIndicator count={steps.length} activeIndex={activeIndex} />
        <Button
          title={currentIndex.current >= steps.length - 1 ? completeLabel : '다음'}
          onPress={handleNext}
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipContainer: {
    position: 'absolute',
    right: Spacing.md,
    zIndex: 1,
  },
  step: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  content: {
    marginBottom: Spacing.xl,
  },
  footer: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.lg,
  },
});
