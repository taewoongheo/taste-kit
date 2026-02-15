import { fireEvent, render, screen } from '@testing-library/react-native';
import { SearchBar } from '../search-bar';

describe('SearchBar', () => {
  const onChangeText = jest.fn();

  beforeEach(() => onChangeText.mockClear());

  it('renders with placeholder', () => {
    render(<SearchBar value="" onChangeText={onChangeText} />);
    expect(screen.getByPlaceholderText('검색')).toBeTruthy();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar value="" onChangeText={onChangeText} placeholder="Search" />);
    expect(screen.getByPlaceholderText('Search')).toBeTruthy();
  });

  it('calls onChangeText when typing', () => {
    render(<SearchBar value="" onChangeText={onChangeText} />);
    fireEvent.changeText(screen.getByPlaceholderText('검색'), 'test');
    expect(onChangeText).toHaveBeenCalledWith('test');
  });

  it('renders clear button when value is not empty', () => {
    const { toJSON } = render(<SearchBar value="hello" onChangeText={onChangeText} />);
    const json = JSON.stringify(toJSON());
    // When value has text, there should be a Pressable with hitSlop (clear button)
    expect(json).toContain('"hitSlop":8');
  });

  it('does not render clear button when value is empty', () => {
    const { toJSON } = render(<SearchBar value="" onChangeText={onChangeText} />);
    const json = JSON.stringify(toJSON());
    expect(json).not.toContain('"hitSlop":8');
  });
});
