import { InteractionsDemo } from '@/components/demo';
import { BottomSheet, Text, Toast } from '@/components/ui';
import type { BottomSheetMethods } from '@/components/ui/bottom-sheet/types';
import { Spacing } from '@/constants';
import { useCallback, useRef } from 'react';
import { View } from 'react-native';
import { DemoScreen } from './_wrapper';

export default function () {
  const sheetRef = useRef<BottomSheetMethods>(null);
  const openSheet = useCallback(() => sheetRef.current?.snapToIndex(0), []);

  return (
    <DemoScreen title="Interactions">
      <InteractionsDemo
        onOpenSheet={openSheet}
        showToast={(msg: string) => Toast.show(msg, { type: 'success', duration: 3000 })}
      />
      <BottomSheet ref={sheetRef} snapPoints={['30%']}>
        <View style={{ padding: Spacing.md }}>
          <Text variant="subtitle">Bottom Sheet</Text>
          <Text color="textSecondary">Swipe down to dismiss</Text>
        </View>
      </BottomSheet>
    </DemoScreen>
  );
}
