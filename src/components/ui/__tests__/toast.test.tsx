import { render, screen } from '@testing-library/react-native';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { ToastProvider, useToast } from '../toast';

function ToastTrigger({
  message,
  type,
}: { message: string; type?: 'success' | 'error' | 'warning' | 'info' }) {
  const { show } = useToast();
  useEffect(() => {
    show({ message, type });
  }, [show, message, type]);
  return null;
}

describe('Toast', () => {
  it('renders toast message when triggered', () => {
    render(
      <ToastProvider>
        <ToastTrigger message="저장되었습니다" type="success" />
      </ToastProvider>,
    );
    expect(screen.getByText('저장되었습니다')).toBeTruthy();
  });

  it('renders children normally', () => {
    render(
      <ToastProvider>
        <Text>Content</Text>
      </ToastProvider>,
    );
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('throws when useToast used outside provider', () => {
    function Broken() {
      useToast();
      return null;
    }
    const spy = jest.spyOn(console, 'error').mockImplementation();
    expect(() => render(<Broken />)).toThrow('useToast must be used within ToastProvider');
    spy.mockRestore();
  });
});
