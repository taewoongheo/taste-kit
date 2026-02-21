import { GooeySwitch, Text } from '@/components/ui';
import { useState } from 'react';

export function ToggleDemo() {
  const [value, setValue] = useState(false);

  return (
    <>
      <Text variant="subtitle">Switch</Text>
      <GooeySwitch active={value} onToggle={setValue} size={80} />
    </>
  );
}
