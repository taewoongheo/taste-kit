import { fireEvent, render, screen } from '@testing-library/react-native';
import { Toggle } from '../toggle';

jest.mock('react-native-gesture-handler', () => {
  const actual = jest.requireActual('react-native-gesture-handler');
  return {
    ...actual,
    GestureDetector: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Toggle', () => {
  const onValueChange = jest.fn();

  beforeEach(() => onValueChange.mockClear());

  it('renders in off state', () => {
    render(<Toggle value={false} onValueChange={onValueChange} testID="toggle" />);
    const toggle = screen.getByTestId('toggle');
    expect(toggle.props.accessibilityState).toEqual({ checked: false, disabled: false });
  });

  it('renders in on state', () => {
    render(<Toggle value={true} onValueChange={onValueChange} testID="toggle" />);
    const toggle = screen.getByTestId('toggle');
    expect(toggle.props.accessibilityState).toEqual({ checked: true, disabled: false });
  });

  it('calls onValueChange with toggled value on press', () => {
    render(<Toggle value={false} onValueChange={onValueChange} testID="toggle" />);
    fireEvent.press(screen.getByTestId('toggle'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  it('does not call onValueChange when disabled', () => {
    render(<Toggle value={false} onValueChange={onValueChange} disabled testID="toggle" />);
    fireEvent.press(screen.getByTestId('toggle'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('has switch accessibility role', () => {
    render(<Toggle value={false} onValueChange={onValueChange} testID="toggle" />);
    expect(screen.getByTestId('toggle').props.accessibilityRole).toBe('switch');
  });
});
