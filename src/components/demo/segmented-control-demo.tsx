import { Text } from '@/components/ui';
import SegmentedControl from '@/components/ui/segmented-control';
import { useState } from 'react';

const tabs = ['전체', '진행 중', '완료'];

export function SegmentedControlDemo() {
  const [index, setIndex] = useState(0);

  return (
    <>
      <Text variant="subtitle">Segmented Control</Text>
      <SegmentedControl currentIndex={index} onChange={setIndex}>
        {tabs.map((tab) => (
          <Text key={tab} variant="label">
            {tab}
          </Text>
        ))}
      </SegmentedControl>
      <Text color="textSecondary">선택: {tabs[index]}</Text>
    </>
  );
}
