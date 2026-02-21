import { Text } from '@/components/ui';
import { SearchBar } from '@/components/ui/search-bar/SearchBar';
import { useThemeColor } from '@/hooks';
import { useState } from 'react';

export function SearchBarDemo() {
  const accent = useThemeColor('accent');
  const [query, setQuery] = useState('');

  return (
    <>
      <Text variant="subtitle">SearchBar</Text>
      <SearchBar
        placeholder="검색어를 입력하세요"
        tint={accent}
        onSearch={setQuery}
        onClear={() => setQuery('')}
      />
      {query !== '' && <Text color="textSecondary">검색: {query}</Text>}
    </>
  );
}
