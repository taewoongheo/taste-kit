import { Button, Text } from '@/components/ui';
import { AnimatedProgressBar } from '@/components/ui/progress';
import { Colors, Spacing } from '@/constants';
import { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';

export function ProgressDemo() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [progress, setProgress] = useState(0.3);

  return (
    <>
      <Text variant="subtitle">Progress</Text>
      <AnimatedProgressBar
        progress={progress}
        progressColor={colors.accent}
        trackColor={colors.fillPrimary}
        height={8}
        borderRadius={4}
        showPercentage
        percentagePosition="right"
        percentageTextStyle={{ color: colors.textSecondary, fontSize: 12 }}
      />
      <View style={styles.row}>
        <Button
          height={34}
          backgroundColor={colors.fillPrimary}
          onPress={() => setProgress((v) => Math.min(v + 0.2, 1))}
        >
          <Text variant="label" color="accent" weight="600">
            +20%
          </Text>
        </Button>
        <Button
          height={34}
          backgroundColor={colors.fillPrimary}
          onPress={() => setProgress((v) => Math.max(v - 0.2, 0))}
        >
          <Text variant="label" color="accent" weight="600">
            -20%
          </Text>
        </Button>
        <Button height={34} backgroundColor="transparent" onPress={() => setProgress(0)}>
          <Text variant="label" color="accent" weight="600">
            Reset
          </Text>
        </Button>
      </View>
      <Text color="textSecondary" variant="caption">
        Indeterminate:
      </Text>
      <AnimatedProgressBar
        progress={0}
        indeterminate
        progressColor={colors.accent}
        trackColor={colors.fillPrimary}
        height={6}
        borderRadius={3}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm },
});
