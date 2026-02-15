import { Colors, Layout, Spacing, Typography } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  StyleSheet,
  type TextInput,
  View,
  useColorScheme,
} from 'react-native';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  /** Auto focus on mount */
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = '검색',
  autoFocus = false,
}: SearchBarProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={[styles.container, { backgroundColor: colors.fillSecondary }]}>
      <Ionicons name="search" size={18} color={colors.textTertiary} style={styles.icon} />
      <RNTextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        autoFocus={autoFocus}
        autoCorrect={false}
        returnKeyType="search"
        style={[Typography.body, styles.input, { color: colors.text }]}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} hitSlop={8}>
          <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    borderRadius: Layout.radiusSm,
    paddingHorizontal: Spacing.sm,
  },
  icon: {
    marginRight: Spacing.xs,
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
  },
});
