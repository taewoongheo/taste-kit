import { Button, PanDropdown, Text } from '@/components/ui';
import Dropdown from '@/components/ui/dropdown';
import { Colors, Spacing } from '@/constants';
import { useColorScheme } from '@/hooks';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const ITEMS = ['한식', '중식', '일식', '양식'];
const POSITIONS = ['bottom', 'top', 'auto'] as const;

export function DropdownDemo() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [selected, setSelected] = useState('선택하세요');

  const contentStyle = { backgroundColor: colors.backgroundElevated, borderRadius: 12, padding: 4 };

  return (
    <>
      <Text variant="subtitle">Dropdown</Text>

      {/* Basic — tap to select */}
      <View style={styles.row}>
        <Dropdown>
          <Dropdown.Trigger asChild>
            <Button variant="secondary" size="sm" fullWidth={false}>
              <Text bold>{selected}</Text>
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content position="bottom" style={contentStyle}>
            {ITEMS.map((item) => (
              <Dropdown.Item key={item} onPress={() => setSelected(item)}>
                <Text>{item}</Text>
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
        <Text color="textSecondary">{selected !== '선택하세요' ? `${selected} 선택됨` : ''}</Text>
      </View>

      {/* Position variants */}
      <Text variant="label" color="textSecondary" style={styles.sectionLabel}>
        Position
      </Text>
      <View style={styles.row}>
        {POSITIONS.map((pos) => (
          <Dropdown key={pos}>
            <Dropdown.Trigger asChild>
              <Button variant="ghost" size="sm" fullWidth={false}>
                <Text bold>{pos}</Text>
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content position={pos} style={contentStyle}>
              {ITEMS.map((item) => (
                <Dropdown.Item key={item} onPress={() => {}}>
                  <Text>{item}</Text>
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        ))}
      </View>

      {/* Pan — drag to select with haptic */}
      <Text variant="label" color="textSecondary" style={styles.sectionLabel}>
        Pan (drag to select)
      </Text>
      <View style={styles.row}>
        <PanDropdown>
          <PanDropdown.Trigger asChild>
            <Button variant="secondary" size="sm" fullWidth={false}>
              <Text bold>Pan Dropdown</Text>
            </Button>
          </PanDropdown.Trigger>
          <PanDropdown.Content position="bottom" style={contentStyle}>
            {ITEMS.map((item) => (
              <PanDropdown.Item key={item} onPress={() => setSelected(item)}>
                <Text>{item}</Text>
              </PanDropdown.Item>
            ))}
          </PanDropdown.Content>
        </PanDropdown>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'center', flexWrap: 'wrap' },
  sectionLabel: { marginTop: Spacing.sm },
});
