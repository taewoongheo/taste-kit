import { Button, Text } from '@/components/ui';
import { Colors } from '@/constants';
import { useAppStore } from '@/stores';
import { router } from 'expo-router';
import { useColorScheme } from 'react-native';

export function NavigationDemo() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <>
      <Text variant="subtitle">Navigation</Text>
      <Button
        height={44}
        backgroundColor={colors.fillPrimary}
        style={{ width: '100%' }}
        onPress={() => {
          useAppStore.getState().setOnboarded(false);
          router.replace('/onboarding');
        }}
      >
        <Text variant="body" color="accent" weight="600">
          온보딩 다시 보기
        </Text>
      </Button>
    </>
  );
}
