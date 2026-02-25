import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Colors, Spacing } from '@/constants';
import type { ReactNode } from 'react';
import { type FallbackProps, ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Appearance, StyleSheet, View } from 'react-native';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Custom fallback UI */
  fallback?: ReactNode;
}

function DefaultFallback({ resetErrorBoundary }: FallbackProps) {
  const colorScheme = Appearance.getColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text variant="title">문제가 발생했습니다</Text>
      <View style={styles.messageWrap}>
        <Text variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
          앱에서 오류가 발생했습니다.{'\n'}다시 시도해 주세요.
        </Text>
      </View>
      <Button fullWidth={false} onPress={resetErrorBoundary}>
        <Text variant="label" color="background" bold>
          다시 시도
        </Text>
      </Button>
    </View>
  );
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback ? () => <>{fallback}</> : DefaultFallback}
      onError={(error, info) => {
        console.error('ErrorBoundary caught:', error, info.componentStack);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  messageWrap: {
    marginBottom: Spacing.sm,
  },
});
