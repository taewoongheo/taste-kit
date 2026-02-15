import { OnboardingFunnel, type OnboardingStep } from '@/components/onboarding';
import { useAppStore } from '@/stores';
import { router } from 'expo-router';
import { useCallback } from 'react';

const steps: OnboardingStep[] = [
  {
    title: '환영합니다',
    description: '인터랙션에 특화된\n앱 템플릿입니다.',
  },
  {
    title: '풍부한 인터랙션',
    description: 'Spring 애니메이션, 햅틱 피드백,\n제스처 기반 컴포넌트를 제공합니다.',
  },
  {
    title: '시작할 준비가 됐나요?',
    description: '지금 바로 만들어보세요.',
  },
];

export default function OnboardingScreen() {
  const setOnboarded = useAppStore((s) => s.setOnboarded);

  const handleComplete = useCallback(() => {
    setOnboarded(true);
    router.replace('/(tabs)');
  }, [setOnboarded]);

  return <OnboardingFunnel steps={steps} onComplete={handleComplete} onSkip={handleComplete} />;
}
