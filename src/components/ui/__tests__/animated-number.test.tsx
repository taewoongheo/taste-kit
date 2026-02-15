import { render } from '@testing-library/react-native';
import { AnimatedNumber } from '../animated-number';

describe('AnimatedNumber', () => {
  it('renders the initial value', () => {
    const { getByText } = render(<AnimatedNumber value={42} />);

    expect(getByText('42')).toBeTruthy();
  });

  it('accepts custom formatter', () => {
    const formatter = (v: number) => `$${v.toFixed(2)}`;
    const { getByText } = render(<AnimatedNumber value={10} formatter={formatter} />);

    expect(getByText('$10.00')).toBeTruthy();
  });

  it('accepts variant and color props', () => {
    const { getByText } = render(
      <AnimatedNumber value={100} variant="hero" color="accent" />,
    );

    expect(getByText('100')).toBeTruthy();
  });

  it('accepts testID', () => {
    const { getByTestId } = render(<AnimatedNumber value={0} testID="counter" />);

    expect(getByTestId('counter')).toBeTruthy();
  });

  it('accepts align prop', () => {
    const { getByText } = render(<AnimatedNumber value={50} align="center" />);

    expect(getByText('50')).toBeTruthy();
  });
});
