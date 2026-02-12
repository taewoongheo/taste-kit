import { render, screen } from '@testing-library/react-native';
import type React from 'react';
import { Text } from 'react-native';
import { AnimatedPressable } from '../AnimatedPressable';

// GestureHandlerRootView is needed for gesture-handler components
jest.mock('react-native-gesture-handler', () => {
  const actual = jest.requireActual('react-native-gesture-handler');
  return {
    ...actual,
    GestureDetector: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('AnimatedPressable', () => {
  it('renders children', () => {
    render(
      <AnimatedPressable>
        <Text>Press me</Text>
      </AnimatedPressable>,
    );

    expect(screen.getByText('Press me')).toBeTruthy();
  });

  it('passes testID prop', () => {
    render(
      <AnimatedPressable testID="pressable-button">
        <Text>Button</Text>
      </AnimatedPressable>,
    );

    expect(screen.getByTestId('pressable-button')).toBeTruthy();
  });

  it('passes accessibilityLabel', () => {
    render(
      <AnimatedPressable accessibilityLabel="Tap to submit">
        <Text>Submit</Text>
      </AnimatedPressable>,
    );

    expect(screen.getByLabelText('Tap to submit')).toBeTruthy();
  });

  it('renders with disabled state', () => {
    render(
      <AnimatedPressable disabled>
        <Text>Disabled</Text>
      </AnimatedPressable>,
    );

    expect(screen.getByText('Disabled')).toBeTruthy();
  });

  it('renders with custom scale and opacity', () => {
    render(
      <AnimatedPressable scale={0.9} opacity={0.5}>
        <Text>Custom</Text>
      </AnimatedPressable>,
    );

    expect(screen.getByText('Custom')).toBeTruthy();
  });

  it('renders with haptic disabled', () => {
    render(
      <AnimatedPressable haptic={null}>
        <Text>No haptic</Text>
      </AnimatedPressable>,
    );

    expect(screen.getByText('No haptic')).toBeTruthy();
  });
});
