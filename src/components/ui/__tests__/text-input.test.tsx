import { render, screen } from '@testing-library/react-native';
import { TextInput } from '../text-input';

describe('TextInput', () => {
  it('renders with placeholder', () => {
    render(<TextInput placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('renders with label', () => {
    render(<TextInput label="이메일" placeholder="example@mail.com" />);
    expect(screen.getByText('이메일')).toBeTruthy();
  });

  it('renders error message', () => {
    render(<TextInput label="이름" error="필수 항목입니다" />);
    expect(screen.getByText('필수 항목입니다')).toBeTruthy();
  });

  it('renders without label', () => {
    render(<TextInput placeholder="No label" />);
    expect(screen.getByPlaceholderText('No label')).toBeTruthy();
    expect(screen.queryByText('이메일')).toBeNull();
  });

  it('renders in disabled state', () => {
    render(<TextInput placeholder="Disabled" disabled />);
    const input = screen.getByPlaceholderText('Disabled');
    expect(input.props.editable).toBe(false);
  });
});
