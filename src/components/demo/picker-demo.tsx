import { Text } from '@/components/ui';
import { Picker } from '@/components/ui/picker';
import { Colors } from '@/constants';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

const items = ['월', '화', '수', '목', '금', '토', '일'];

export function PickerDemo() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [selected, setSelected] = useState('월');

  return (
    <>
      <Text variant="subtitle">Picker</Text>
      <Picker
        items={items}
        onItemChange={(item) => setSelected(item)}
        width="100%"
        itemHeight={40}
        fontSize={18}
        textColor={colors.textSecondary}
        selectedTextColor={colors.text}
        backgroundColor={colors.backgroundGrouped}
      />
      <Text color="textSecondary">선택: {selected}</Text>
    </>
  );
}
