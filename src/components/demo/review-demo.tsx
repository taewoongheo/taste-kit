import { Button, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import { useColorScheme } from '@/hooks';
import { Review } from '@/lib';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export function ReviewDemo() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [state, setState] = useState<{
    launchCount: number;
    daysSinceFirst: number;
  } | null>(null);

  const refresh = useCallback(async () => {
    const data = await Review.getTrackerState();
    setState({ launchCount: data.launchCount, daysSinceFirst: data.daysSinceFirst });
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: load on mount
  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <Text variant="subtitle">In-App Review</Text>

      {state && (
        <View style={[styles.card, { backgroundColor: colors.backgroundGrouped }]}>
          <Text variant="body">Launches: {state.launchCount}</Text>
          <Text variant="body">Days since first: {state.daysSinceFirst.toFixed(1)}</Text>
          <Text variant="caption" color="textSecondary">
            Conditions: 5 launches + 14 days
          </Text>
        </View>
      )}

      <Button
        onPress={async () => {
          await Review.trackLaunch();
          refresh();
        }}
      >
        Track Launch
      </Button>

      <Button
        variant="secondary"
        onPress={async () => {
          const requested = await Review.requestIfReady();
          if (!requested) alert('Conditions not met yet');
        }}
      >
        Request If Ready
      </Button>

      <Button
        variant="secondary"
        onPress={async () => {
          await Review.forceRequest();
        }}
      >
        Force Request (Demo)
      </Button>

      <Button
        variant="destructive"
        onPress={async () => {
          await Review.resetTracker();
          refresh();
        }}
      >
        Reset Tracker
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    borderRadius: 12,
    gap: Spacing.xs,
  },
});
