import { Checkbox, Text } from '@/components/ui';
import { Spacing } from '@/constants';
import { useThemeColor } from '@/hooks';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export function CheckboxDemo() {
  const accent = useThemeColor('accent');
  const sizes = ['sm', 'md'] as const;
  const labels = ['Small', 'Medium'];
  const [checks, setChecks] = useState([true, false]);

  const toggle = (i: number) => setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <>
      <Text variant="subtitle">Checkbox</Text>
      {sizes.map((size, i) => (
        <Pressable
          key={size}
          onPress={() => toggle(i)}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <View style={styles.row}>
            <Checkbox checked={checks[i]} checkmarkColor={accent} size={size} />
            <Text>{labels[i]}</Text>
          </View>
        </Pressable>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: 4 },
});
