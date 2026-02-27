import { AnimatedPressable, Button, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import { useColorScheme } from '@/hooks';
import { useMemoStore } from '@/stores';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export function RepositoryDemo() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { memos, create, remove } = useMemoStore();
  const [input, setInput] = useState('');

  return (
    <>
      <Text variant="subtitle">Repository (CRUD)</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.backgroundGrouped, color: colors.text }]}
          value={input}
          onChangeText={setInput}
          placeholder="New memo..."
          placeholderTextColor={colors.textTertiary}
        />
        <Button
          size="sm"
          fullWidth={false}
          onPress={async () => {
            if (!input.trim()) return;
            await create(input.trim());
            setInput('');
          }}
        >
          <Text variant="caption" color="background" bold>
            Add
          </Text>
        </Button>
      </View>

      {memos.map((memo) => (
        <View key={memo.id} style={[styles.card, { backgroundColor: colors.backgroundGrouped }]}>
          <View style={styles.cardContent}>
            <Text variant="body">{memo.content}</Text>
            <Text variant="caption" color="textTertiary">
              {memo.created_at}
            </Text>
          </View>
          <AnimatedPressable onPress={() => remove(memo.id)}>
            <Text variant="label" color="destructive">
              Delete
            </Text>
          </AnimatedPressable>
        </View>
      ))}

      {memos.length === 0 && (
        <Text variant="body" color="textSecondary">
          No memos yet. Add one above.
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: Spacing.sm,
    borderRadius: 10,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
    gap: Spacing.xs,
  },
});
