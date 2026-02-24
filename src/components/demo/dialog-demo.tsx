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
        <Dialog.Trigger asChild>
          <Button fullWidth={false} variant="secondary" size="sm">
            <Text variant="label" color="accent" bold>
              Dialog 열기
            </Text>
          </Button>
        </Dialog.Trigger>
        <Dialog.Content backdropBlur={10} backdropColor="rgba(0,0,0,0.2)">
          <View style={[styles.card, { backgroundColor: colors.backgroundElevated }]}>
            <Text variant="title">알림</Text>
            <Text color="textSecondary" style={{ textAlign: 'center' }}>
              이것은 Reacticx Dialog 컴포넌트입니다. 3D 원근감 애니메이션으로 열리고 닫힙니다.
            </Text>
            <Dialog.Close asChild>
              <Button style={styles.closeBtn}>
                <Text variant="label" color="background" bold>
                  닫기
                </Text>
              </Button>
            </Dialog.Close>
          </View>
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
  closeBtn: { marginTop: Spacing.sm },
});
