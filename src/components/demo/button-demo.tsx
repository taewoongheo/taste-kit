import { Button, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import { StyleSheet, View, useColorScheme } from 'react-native';

export function ButtonDemo() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <>
      <Text variant="subtitle">Button</Text>
      <View style={styles.row}>
        <Button height={34} backgroundColor={colors.accent} onPress={() => {}}>
          <Text variant="label" color="background" weight="600">
            Primary
          </Text>
        </Button>
        <Button height={34} backgroundColor={colors.fillPrimary} onPress={() => {}}>
          <Text variant="label" color="accent" weight="600">
            Secondary
          </Text>
        </Button>
      </View>
      <View style={styles.row}>
        <Button height={34} backgroundColor={colors.destructive} onPress={() => {}}>
          <Text variant="label" color="background" weight="600">
            Destructive
          </Text>
        </Button>
        <Button height={34} backgroundColor="transparent" onPress={() => {}}>
          <Text variant="label" color="accent" weight="600">
            Ghost
          </Text>
        </Button>
      </View>
      <Button
        height={34}
        backgroundColor={colors.accent}
        style={{ width: '100%' }}
        onPress={() => {}}
      >
        <Text variant="label" color="background" weight="600">
          Primary sm
        </Text>
      </Button>
      <Button
        height={44}
        backgroundColor={colors.accent}
        style={{ width: '100%' }}
        onPress={() => {}}
      >
        <Text variant="body" color="background" weight="600">
          Primary md
        </Text>
      </Button>
      <Button
        height={54}
        backgroundColor={colors.accent}
        style={{ width: '100%' }}
        onPress={() => {}}
      >
        <Text variant="title" color="background" weight="600">
          Primary lg
        </Text>
      </Button>
      <Button
        isLoading
        height={44}
        backgroundColor={colors.accent}
        style={{ width: '100%' }}
        loadingText="Loading..."
      >
        <Text variant="body" color="background" weight="600">
          Loading
        </Text>
      </Button>
      <Button height={44} backgroundColor={colors.fillSecondary} disabled style={{ width: '100%' }}>
        <Text variant="body" color="textTertiary" weight="600">
          Disabled
        </Text>
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm },
});
