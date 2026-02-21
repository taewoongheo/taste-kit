import { Text } from '@/components/ui';
import Stepper from '@/components/ui/stepper';
import { Spacing } from '@/constants';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export function StepperDemo() {
  const [value, setValue] = useState(1);

  return (
    <>
      <Text variant="subtitle">Stepper</Text>
      <View style={styles.row}>
        <Stepper value={value} onValueChange={setValue} min={0} max={10} step={1} />
        <Text>수량: {value}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
});
