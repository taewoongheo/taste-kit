import { render } from '@testing-library/react-native';
import { Divider } from '../divider';

describe('Divider', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Divider />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with inset', () => {
    const { toJSON } = render(<Divider inset={56} />);
    expect(toJSON()).toBeTruthy();
  });
});
