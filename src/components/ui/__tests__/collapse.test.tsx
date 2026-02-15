import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Collapse } from '../collapse';

describe('Collapse', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Collapse expanded>
        <Text>Hello</Text>
      </Collapse>,
    );

    expect(getByText('Hello')).toBeTruthy();
  });

  it('renders with expanded=false', () => {
    const { getByText } = render(
      <Collapse expanded={false}>
        <Text>Hidden</Text>
      </Collapse>,
    );

    // Children are still in the tree (for measurement), just clipped
    expect(getByText('Hidden')).toBeTruthy();
  });

  it('accepts custom duration', () => {
    const { getByText } = render(
      <Collapse expanded duration={400}>
        <Text>Content</Text>
      </Collapse>,
    );

    expect(getByText('Content')).toBeTruthy();
  });

  it('accepts testID', () => {
    const { getByTestId } = render(
      <Collapse expanded testID="collapse">
        <Text>Content</Text>
      </Collapse>,
    );

    expect(getByTestId('collapse')).toBeTruthy();
  });
});
