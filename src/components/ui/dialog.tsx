import { Button } from '@/components/ui/button';
import { Colors, Layout, Spacing, Typography } from '@/constants';
import { Modal, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';

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
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <Pressable
          style={[styles.dialog, { backgroundColor: colors.backgroundElevated }]}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={[Typography.title3, styles.title, { color: colors.text }]}>{title}</Text>
          {message && (
            <Text style={[Typography.body, styles.message, { color: colors.textSecondary }]}>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  message: {
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  actions: {
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
});
