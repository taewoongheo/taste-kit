import { AnimatedPressable, Text } from '@/components/ui';
import { Checkbox } from '@/components/ui/checkbox';
import { Spacing } from '@/constants';
import { useThemeColor } from '@/hooks';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export function CheckboxDemo() {
  const accent = useThemeColor('accent');
  const [checks, setChecks] = useState([true, false, false]);

  const toggle = (i: number) => setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <>
      <Text variant="subtitle">Checkbox</Text>
      {['알림 받기', '다크 모드', '자동 저장'].map((label, i) => (
        <AnimatedPressable key={label} onPress={() => toggle(i)}>
          <View style={styles.row}>
            <Checkbox checked={checks[i]} checkmarkColor={accent} size={40} />
            <Text>{label}</Text>
          </View>
        </AnimatedPressable>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: 4 },
});
