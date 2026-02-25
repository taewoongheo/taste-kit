import { Text } from '@/components/ui/text';
import { Colors, Layout, Spacing, Typography } from '@/constants';
import { useColorScheme } from '@/hooks';
import { useState } from 'react';
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';
import {
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
  StyleSheet,
  View,
} from 'react-native';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  /** Label above the input */
  label?: string;
  /** Error message below the input */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
}

export function TextInput({ label, error, disabled = false, ...inputProps }: TextInputProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [focused, setFocused] = useState(false);

  const borderColor = error ? colors.destructive : focused ? colors.accent : colors.separator;

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="label" color="textSecondary">
          {label}
        </Text>
      )}
      <RNTextInput
        {...inputProps}
        editable={!disabled}
        onFocus={(e) => {
          setFocused(true);
          inputProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          inputProps.onBlur?.(e);
        }}
        placeholderTextColor={colors.textTertiary}
        style={[
          Typography.body,
          styles.input,
          {
            color: disabled ? colors.textTertiary : colors.text,
            backgroundColor: colors.backgroundGrouped,
            borderColor,
          },
        ]}
      />
      {error && (
        <Text variant="caption" color="destructive">
          {error}
        </Text>
      )}
    </View>
  );
}

export interface ControlledTextInputProps<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
}

export function ControlledTextInput<T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledTextInputProps<T>) {
  const { field, fieldState } = useController({ control, name });

  return (
    <TextInput
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      value={field.value ?? ''}
      error={fieldState.error?.message}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xs,
  },
  input: {
    height: 44,
    paddingHorizontal: Spacing.md,
    borderRadius: Layout.radiusSm,
    borderWidth: 1,
  },
});
