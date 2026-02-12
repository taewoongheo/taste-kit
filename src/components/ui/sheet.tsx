import { Colors, Layout, Spacing } from '@/constants/design-tokens';
import BottomSheetLib, {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type BottomSheetType from '@gorhom/bottom-sheet';
import type { ReactNode } from 'react';
import { type RefObject, useCallback } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

export interface SheetProps {
  /** Ref to control the sheet imperatively */
  sheetRef: RefObject<BottomSheetType | null>;
  /** Snap points (e.g. ['25%', '50%']) */
  snapPoints: (string | number)[];
  /** Enable dynamic sizing instead of snap points */
  enableDynamicSizing?: boolean;
  /** Called when sheet is dismissed */
  onDismiss?: () => void;
  /** Enable backdrop press to dismiss (default: true) */
  enableBackdropDismiss?: boolean;
  /** Content */
  children: ReactNode;
}

export function Sheet({
  sheetRef,
  snapPoints,
  enableDynamicSizing = false,
  onDismiss,
  enableBackdropDismiss = true,
  children,
}: SheetProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={enableBackdropDismiss ? 'close' : 'none'}
      />
    ),
    [enableBackdropDismiss],
  );

  return (
    <BottomSheetLib
      ref={sheetRef}
      index={-1}
      snapPoints={enableDynamicSizing ? undefined : snapPoints}
      enableDynamicSizing={enableDynamicSizing}
      enablePanDownToClose
      onClose={onDismiss}
      backdropComponent={renderBackdrop}
      backgroundStyle={[styles.background, { backgroundColor: colors.backgroundElevated }]}
      handleIndicatorStyle={{ backgroundColor: colors.fillPrimary }}
      style={styles.sheet}
    >
      <BottomSheetView style={styles.content}>{children}</BottomSheetView>
    </BottomSheetLib>
  );
}

const styles = StyleSheet.create({
  sheet: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  background: {
    borderTopLeftRadius: Layout.radiusLg,
    borderTopRightRadius: Layout.radiusLg,
  },
  content: {
    padding: Spacing.md,
  },
});
