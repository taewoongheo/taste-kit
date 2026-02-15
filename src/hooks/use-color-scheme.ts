import { useAppStore } from '@/stores';
import { useColorScheme as useRNColorScheme } from 'react-native';

export function useColorScheme(): 'light' | 'dark' {
  const systemScheme = useRNColorScheme();
  const themeMode = useAppStore((s) => s.themeMode);

  if (themeMode === 'system') {
    return systemScheme ?? 'light';
  }
  return themeMode;
}
