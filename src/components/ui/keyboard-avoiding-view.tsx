import type { ReactNode } from 'react';
import {
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  StyleSheet,
  type ViewStyle,
} from 'react-native';

export interface KeyboardAvoidingViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function KeyboardAvoidingView({ children, style }: KeyboardAvoidingViewProps) {
  return (
    <RNKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, style]}
    >
      {children}
    </RNKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
