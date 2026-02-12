import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Button } from '../Button';

jest.mock('react-native-gesture-handler', () => {
  const actual = jest.requireActual('react-native-gesture-handler');
  return {
    ...actual,
    GestureDetector: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Button', () => {
  it('renders title text', () => {
    render(<Button title="Submit" />);
    expect(screen.getByText('Submit')).toBeTruthy();
  });

  it('renders with primary variant by default', () => {
    render(<Button title="Primary" testID="btn" />);
    expect(screen.getByTestId('btn')).toBeTruthy();
  });

  it('renders with secondary variant', () => {
    render(<Button title="Secondary" variant="secondary" testID="btn" />);
    expect(screen.getByTestId('btn')).toBeTruthy();
  });

  it('renders with destructive variant', () => {
    render(<Button title="Delete" variant="destructive" testID="btn" />);
    expect(screen.getByTestId('btn')).toBeTruthy();
  });

  it('renders with ghost variant', () => {
    render(<Button title="Ghost" variant="ghost" testID="btn" />);
    expect(screen.getByTestId('btn')).toBeTruthy();
  });

  it('renders all sizes', () => {
    const { rerender } = render(<Button title="Sm" size="sm" testID="btn" />);
    expect(screen.getByTestId('btn')).toBeTruthy();

    rerender(<Button title="Md" size="md" testID="btn" />);
    expect(screen.getByTestId('btn')).toBeTruthy();

    rerender(<Button title="Lg" size="lg" testID="btn" />);
    expect(screen.getByTestId('btn')).toBeTruthy();
  });

  it('renders disabled state with accessibility', () => {
    render(<Button title="Disabled" disabled testID="btn" />);
    const btn = screen.getByTestId('btn');
    expect(btn).toBeTruthy();
    expect(btn.props.accessibilityState).toEqual({ disabled: true });
  });

  it('shows loading spinner instead of title', () => {
    render(<Button title="Loading" loading testID="btn" />);
    // Title should not be visible when loading
    expect(screen.queryByText('Loading')).toBeNull();
  });

  it('renders with icon', () => {
    render(<Button title="With Icon" icon={<Text>★</Text>} />);
    expect(screen.getByText('★')).toBeTruthy();
    expect(screen.getByText('With Icon')).toBeTruthy();
  });

  it('supports fullWidth prop', () => {
    render(<Button title="Full" fullWidth testID="btn" />);
    expect(screen.getByTestId('btn')).toBeTruthy();
  });
});
