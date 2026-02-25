import { Button, Text } from '@/components/ui';
import { useAppStore } from '@/stores';
import { router } from 'expo-router';

export function NavigationDemo() {
  return (
    <>
      <Text variant="subtitle">Navigation</Text>
      <Button
        variant="secondary"
        onPress={() => {
          useAppStore.getState().setOnboarded(false);
          router.replace('/onboarding');
        }}
      >
        <Text variant="body" color="accent" bold>
          온보딩 다시 보기
        </Text>
      </Button>
    </>
  );
}
