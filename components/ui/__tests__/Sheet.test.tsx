import type BottomSheet from '@gorhom/bottom-sheet';
import { render, screen } from '@testing-library/react-native';
import { createRef } from 'react';
import { Text } from 'react-native';
import { Sheet } from '../Sheet';

jest.mock('@gorhom/bottom-sheet', () => {
  const { View } = require('react-native');
  const { forwardRef } = require('react');

  type MockProps = Record<string, unknown> & { children?: React.ReactNode };

  const MockBottomSheet = forwardRef(({ children, ...props }: MockProps, _ref: unknown) => (
    <View testID="bottom-sheet" {...props}>
      {children}
    </View>
  ));
  MockBottomSheet.displayName = 'MockBottomSheet';

  return {
    __esModule: true,
    default: MockBottomSheet,
    BottomSheetView: ({ children, ...props }: MockProps) => <View {...props}>{children}</View>,
    BottomSheetBackdrop: (props: Record<string, unknown>) => <View testID="backdrop" {...props} />,
  };
});

describe('Sheet', () => {
  it('renders children', () => {
    const ref = createRef<BottomSheet>();
    render(
      <Sheet sheetRef={ref} snapPoints={['50%']}>
        <Text>Sheet content</Text>
      </Sheet>,
    );
    expect(screen.getByText('Sheet content')).toBeTruthy();
  });

  it('renders with custom snap points', () => {
    const ref = createRef<BottomSheet>();
    render(
      <Sheet sheetRef={ref} snapPoints={['25%', '50%', '90%']}>
        <Text>Multi snap</Text>
      </Sheet>,
    );
    expect(screen.getByText('Multi snap')).toBeTruthy();
  });

  it('renders with dynamic sizing', () => {
    const ref = createRef<BottomSheet>();
    render(
      <Sheet sheetRef={ref} snapPoints={[]} enableDynamicSizing>
        <Text>Dynamic</Text>
      </Sheet>,
    );
    expect(screen.getByText('Dynamic')).toBeTruthy();
  });

  it('accepts onDismiss callback', () => {
    const onDismiss = jest.fn();
    const ref = createRef<BottomSheet>();
    render(
      <Sheet sheetRef={ref} snapPoints={['50%']} onDismiss={onDismiss}>
        <Text>Dismissable</Text>
      </Sheet>,
    );
    expect(screen.getByText('Dismissable')).toBeTruthy();
  });
});
