import { AnimatedPressable } from '@/components/ui/animated-pressable';
import { Text } from '@/components/ui/text';
import { Layout, Spacing } from '@/constants';
import { useThemeColor } from '@/hooks';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export interface ListItemProps {
  /** Primary text */
  title: string;
  /** Secondary text */
  subtitle?: string;
  /** Left icon/element */
  icon?: ReactNode;
  /** Right accessory (chevron, switch, badge, etc.) */
  trailing?: ReactNode;
  /** Callback on tap */
  onPress?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Show bottom separator (default: true) */
  separator?: boolean;
  testID?: string;
}

export function ListItem({
  title,
  subtitle,
  icon,
  trailing,
  onPress,
  disabled = false,
  separator = true,
  testID,
}: ListItemProps) {
  const separatorColor = useThemeColor('separator');

  const content = (
    <View
      testID={testID}
      style={[
        styles.container,
        separator && { borderBottomWidth: Layout.separator, borderBottomColor: separatorColor },
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <View style={styles.body}>
        <Text variant="body" color={disabled ? 'textTertiary' : 'text'} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text variant="caption" color="textSecondary" numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      {trailing && <View style={styles.trailing}>{trailing}</View>}
    </View>
  );

  if (onPress) {
    return (
      <AnimatedPressable onPress={onPress} disabled={disabled}>
        {content}
      </AnimatedPressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: Layout.touchTarget,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  body: {
    flex: 1,
    gap: 2,
  },
  trailing: {
    marginLeft: Spacing.sm,
  },
});
