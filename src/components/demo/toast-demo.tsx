import { Button, Text, Toast } from '@/components/ui';
import { Spacing } from '@/constants';
import { StyleSheet, View } from 'react-native';

export default function ToastDemo() {
  return (
    <>
      <Text variant="subtitle">Toast</Text>
      <View style={styles.row}>
        <Button
          fullWidth={false}
          variant="secondary"
          size="sm"
          onPress={() => Toast.show('기본 알림', { type: 'default' })}
        >
          <Text variant="label" color="accent" bold>
            Default
          </Text>
        </Button>
        <Button
          fullWidth={false}
          variant="secondary"
          size="sm"
          onPress={() => Toast.show('저장되었습니다', { type: 'success' })}
        >
          <Text variant="label" color="accent" bold>
            Success
          </Text>
        </Button>
      </View>
      <View style={styles.row}>
        <Button
          fullWidth={false}
          variant="secondary"
          size="sm"
          onPress={() => Toast.show('오류가 발생했습니다', { type: 'error' })}
        >
          <Text variant="label" color="accent" bold>
            Error
          </Text>
        </Button>
        <Button
          fullWidth={false}
          variant="secondary"
          size="sm"
          onPress={() => Toast.show('주의가 필요합니다', { type: 'warning' })}
        >
          <Text variant="label" color="accent" bold>
            Warning
          </Text>
        </Button>
        <Button
          fullWidth={false}
          variant="secondary"
          size="sm"
          onPress={() => Toast.show('참고 정보', { type: 'info' })}
        >
          <Text variant="label" color="accent" bold>
            Info
          </Text>
        </Button>
      </View>
      <View style={styles.row}>
        <Button
          fullWidth={false}
          variant="secondary"
          size="sm"
          onPress={() => Toast.show('상단 알림', { type: 'default', position: 'top' })}
        >
          <Text variant="label" color="accent" bold>
            Top
          </Text>
        </Button>
        <Button
          fullWidth={false}
          variant="secondary"
          size="sm"
          onPress={() => Toast.show('하단 알림', { type: 'default', position: 'bottom' })}
        >
          <Text variant="label" color="accent" bold>
            Bottom
          </Text>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
});
