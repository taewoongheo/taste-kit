import { render } from '@testing-library/react-native';
import { Skeleton } from '../skeleton';

describe('Skeleton', () => {
  it('renders with default props', () => {
    const { toJSON } = render(<Skeleton />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with custom dimensions', () => {
    const { toJSON } = render(<Skeleton width={160} height={16} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders circle mode', () => {
    const { toJSON } = render(<Skeleton circle height={48} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with custom radius', () => {
    const { toJSON } = render(<Skeleton height={120} radius={12} />);
    expect(toJSON()).toBeTruthy();
  });
});
