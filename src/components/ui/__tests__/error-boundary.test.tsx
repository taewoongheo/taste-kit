import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ErrorBoundary } from '../error-boundary';

function ThrowingChild(): React.ReactNode {
  throw new Error('Test error');
}

describe('ErrorBoundary', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <Text>Normal content</Text>
      </ErrorBoundary>,
    );
    expect(screen.getByText('Normal content')).toBeTruthy();
  });

  it('renders default error UI when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>,
    );
    expect(screen.getByText('문제가 발생했습니다')).toBeTruthy();
    expect(screen.getByText('다시 시도')).toBeTruthy();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<Text>Custom error</Text>}>
        <ThrowingChild />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Custom error')).toBeTruthy();
  });
});
