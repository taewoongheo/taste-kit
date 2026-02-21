import { Button, Text } from '@/components/ui';
import Dropdown from '@/components/ui/dropdown';
import { Colors, Spacing } from '@/constants';
import { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';

export function DropdownDemo() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [selected, setSelected] = useState('선택하세요');

  return (
    <>
      <Text variant="subtitle">Dropdown</Text>
      <View style={styles.row}>
        <Dropdown>
          <Dropdown.Trigger>
            <Button height={34} backgroundColor={colors.fillPrimary}>
              <Text variant="label" color="accent" weight="600">
                {selected}
              </Text>
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content
            position="bottom"
            style={{ backgroundColor: colors.backgroundElevated, borderRadius: 12, padding: 4 }}
          >
            {['한식', '중식', '일식', '양식'].map((item) => (
              <Dropdown.Item key={item} onPress={() => setSelected(item)}>
                <View style={styles.item}>
                  <Text>{item}</Text>
                </View>
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
        <Text color="textSecondary">{selected !== '선택하세요' ? `${selected} 선택됨` : ''}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'center' },
  item: { paddingVertical: 10, paddingHorizontal: 16 },
});
