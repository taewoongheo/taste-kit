import { type FontSource, useFonts } from 'expo-font';

/**
 * Custom font map.
 * Add font files to assets/fonts/ and register them here.
 *
 * Example:
 * const fontMap: Record<string, FontSource> = {
 *   'Inter-Regular': require('../../assets/fonts/Inter-Regular.otf'),
 *   'Inter-Medium': require('../../assets/fonts/Inter-Medium.otf'),
 *   'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.otf'),
 *   'Inter-Bold': require('../../assets/fonts/Inter-Bold.otf'),
 * };
 */
const fontMap: Record<string, FontSource> = {};

export function useLoadFonts() {
  const [loaded, error] = useFonts(fontMap);
  return { loaded, error };
}
