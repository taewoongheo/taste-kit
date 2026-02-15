import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Layout, Spacing } from '@/constants';
import { useThemeColor } from '@/hooks';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

export interface DialogAction {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
}

export interface DialogProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  message?: string;
  actions: DialogAction[];
}

export function Dialog({ visible, onDismiss, title, message, actions }: DialogProps) {
  const bgElevated = useThemeColor('backgroundElevated');

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <Pressable
          style={[styles.dialog, { backgroundColor: bgElevated }]}
          onPress={(e) => e.stopPropagation()}
        >
          <Text variant="title" align="center">
            {title}
          </Text>
          {message && (
            <Text variant="body" color="textSecondary" align="center">
              {message}
            </Text>
          )}
          <View style={styles.actions}>
            {actions.map((action) => (
              <Button
                key={action.label}
                title={action.label}
                variant={action.variant ?? 'primary'}
                onPress={action.onPress}
                fullWidth
                size="md"
              />
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: Spacing.xl,
  },
  dialog: {
    width: '100%',
    maxWidth: 320,
    borderRadius: Layout.radiusLg,
    padding: Spacing.lg,
    gap: Spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  actions: {
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
});
