import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from '../Card';

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <Text>Card content</Text>
      </Card>,
    );
    expect(screen.getByText('Card content')).toBeTruthy();
  });

  it('renders with elevated variant by default', () => {
    render(
      <Card testID="card">
        <Text>Elevated</Text>
      </Card>,
    );
    expect(screen.getByTestId('card')).toBeTruthy();
  });

  it('renders with outlined variant', () => {
    render(
      <Card variant="outlined" testID="card">
        <Text>Outlined</Text>
      </Card>,
    );
    expect(screen.getByTestId('card')).toBeTruthy();
  });

  it('renders with filled variant', () => {
    render(
      <Card variant="filled" testID="card">
        <Text>Filled</Text>
      </Card>,
    );
    expect(screen.getByTestId('card')).toBeTruthy();
  });

  it('accepts custom padding', () => {
    render(
      <Card padding={24} testID="card">
        <Text>Custom padding</Text>
      </Card>,
    );
    expect(screen.getByTestId('card')).toBeTruthy();
  });

  it('passes additional View props', () => {
    render(
      <Card accessibilityLabel="Info card">
        <Text>Accessible</Text>
      </Card>,
    );
    expect(screen.getByLabelText('Info card')).toBeTruthy();
  });
});
