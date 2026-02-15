import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ListItem } from '../list-item';

jest.mock('react-native-gesture-handler', () => {
  const actual = jest.requireActual('react-native-gesture-handler');
  return {
    ...actual,
    GestureDetector: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('ListItem', () => {
  it('renders title', () => {
    render(<ListItem title="알림" testID="item" />);
    expect(screen.getByText('알림')).toBeTruthy();
  });

  it('renders subtitle', () => {
    render(<ListItem title="설정" subtitle="앱 설정" testID="item" />);
    expect(screen.getByText('앱 설정')).toBeTruthy();
  });

  it('renders trailing element', () => {
    render(<ListItem title="설정" trailing={<Text>{'>'}</Text>} testID="item" />);
    expect(screen.getByText('>')).toBeTruthy();
  });

  it('renders icon element', () => {
    render(<ListItem title="알림" icon={<Text>🔔</Text>} testID="item" />);
    expect(screen.getByText('🔔')).toBeTruthy();
  });

  it('wraps in pressable when onPress provided', () => {
    const onPress = jest.fn();
    render(<ListItem title="Tap me" onPress={onPress} testID="item" />);
    expect(screen.getByText('Tap me')).toBeTruthy();
  });
});
