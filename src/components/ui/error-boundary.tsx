import { Button } from '@/components/ui/button';
import { Colors, Spacing, Typography } from '@/constants';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Appearance, StyleSheet, Text, View } from 'react-native';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Custom fallback UI */
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      const colorScheme = Appearance.getColorScheme() ?? 'light';
      const colors = Colors[colorScheme];

      return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <Text style={[Typography.title, styles.title, { color: colors.text }]}>
            문제가 발생했습니다
          </Text>
          <Text style={[Typography.body, styles.message, { color: colors.textSecondary }]}>
            앱에서 오류가 발생했습니다.{'\n'}다시 시도해 주세요.
          </Text>
          <Button title="다시 시도" onPress={this.handleRetry} />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  title: {
    marginBottom: Spacing.sm,
  },
  message: {
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
});
