import { Button, Text } from '@/components/ui';
import { Spacing } from '@/constants';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export function ButtonDemo() {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      {/* Variants */}
      <Text variant="subtitle">Variants</Text>
      <View style={styles.row}>
        <Button fullWidth={false} onPress={() => {}}>
          <Text variant="label" color="background" bold>
            Primary
          </Text>
        </Button>
        <Button fullWidth={false} variant="secondary" onPress={() => {}}>
          <Text variant="label" color="accent" bold>
            Secondary
          </Text>
        </Button>
        <Button fullWidth={false} variant="destructive" onPress={() => {}}>
          <Text variant="label" color="background" bold>
            Destructive
          </Text>
        </Button>
        <Button fullWidth={false} variant="ghost" onPress={() => {}}>
          <Text variant="label" color="accent" bold>
            Ghost
          </Text>
        </Button>
      </View>

      {/* Sizes */}
      <Text variant="subtitle">Sizes</Text>
      <View style={styles.row}>
        <Button fullWidth={false} size="sm" onPress={() => {}}>
          <Text variant="caption" color="background" bold>
            Small
          </Text>
        </Button>
        <Button fullWidth={false} size="md" onPress={() => {}}>
          <Text variant="label" color="background" bold>
            Medium
          </Text>
        </Button>
        <Button fullWidth={false} size="lg" onPress={() => {}}>
          <Text variant="body" color="background" bold>
            Large
          </Text>
        </Button>
      </View>

      {/* Full Width */}
      <Text variant="subtitle">Full Width</Text>
      <Button onPress={() => {}}>
        <Text variant="body" color="background" bold>
          Full Width Button
        </Text>
      </Button>

      {/* Loading */}
      <Text variant="subtitle">Loading</Text>
      <Button fullWidth={false} isLoading={loading} onPress={toggleLoading}>
        <Text variant="label" color="background" bold>
          loading
        </Text>
      </Button>

      {/* Disabled */}
      <Text variant="subtitle">Disabled</Text>
      <Button disabled onPress={() => {}}>
        <Text variant="label" color="background" bold>
          Disabled
        </Text>
      </Button>

      {/* No Animation */}
      <Text variant="subtitle">No Press Animation</Text>
      <Button withAnimation={false} onPress={() => {}}>
        <Text variant="label" color="background" bold>
          No Animation
        </Text>
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
});
