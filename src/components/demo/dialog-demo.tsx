import { Button, Dialog, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import { StyleSheet, View, useColorScheme } from 'react-native';

export function DialogDemo() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <>
      <Text variant="subtitle">Dialog</Text>
      <Dialog>
        <Dialog.Trigger>
          <Button height={34} backgroundColor={colors.fillPrimary}>
            <Text variant="label" color="accent" weight="600">
              Dialog 열기
            </Text>
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Backdrop blurAmount={20} backgroundColor="rgba(0,0,0,0.5)">
            <View style={[styles.card, { backgroundColor: colors.backgroundElevated }]}>
              <Text variant="title">알림</Text>
              <Text color="textSecondary" align="center">
                이것은 Reacticx Dialog 컴포넌트입니다. 3D 원근감 애니메이션으로 열리고 닫힙니다.
              </Text>
              <Dialog.Close>
                <Button height={40} backgroundColor={colors.accent} style={styles.closeBtn}>
                  <Text variant="label" color="background" weight="600">
                    닫기
                  </Text>
                </Button>
              </Dialog.Close>
            </View>
          </Dialog.Backdrop>
        </Dialog.Content>
      </Dialog>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: Spacing.lg,
    width: 300,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  closeBtn: { width: '100%', marginTop: Spacing.sm },
});
