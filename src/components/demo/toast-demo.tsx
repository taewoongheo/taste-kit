import { Button, Text, Toast } from '@/components/ui';
import { Spacing } from '@/constants';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ToastDemo() {
  const updateIdRef = useRef<string>('');

  return (
    <>
      <Text variant="subtitle">Toast</Text>

      {/* Type variants */}
      <Text variant="label" color="textSecondary">
        Type
      </Text>
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
      </View>
      <View style={styles.row}>
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

      {/* Position */}
      <Text variant="label" color="textSecondary" style={styles.sectionLabel}>
        Position
      </Text>
      <View style={styles.row}>
        <Button
          fullWidth={false}
          variant="secondary"
          size="sm"
          onPress={() => Toast.show('상단 알림', { position: 'top' })}
        >
          <Text variant="label" color="accent" bold>
            Top
          </Text>
        </Button>
        <Button
          fullWidth={false}
          variant="secondary"
          size="sm"
          onPress={() => Toast.show('하단 알림', { position: 'bottom' })}
        >
          <Text variant="label" color="accent" bold>
            Bottom
          </Text>
        </Button>
      </View>

      {/* Action */}
      <Text variant="label" color="textSecondary" style={styles.sectionLabel}>
        Action
      </Text>
      <View style={styles.row}>
        <Button
          fullWidth={false}
          variant="secondary"
          size="sm"
          onPress={() =>
            Toast.show('항목이 삭제되었습니다', {
              type: 'default',
              action: {
                label: '되돌리기',
                onPress: () => Toast.show('되돌렸습니다', { type: 'success' }),
              },
            })
          }
        >
          <Text variant="label" color="accent" bold>
            Undo
          </Text>
        </Button>
      </View>

      {/* Duration */}
      <Text variant="label" color="textSecondary" style={styles.sectionLabel}>
        Duration
      </Text>
      <View style={styles.row}>
        <Button
          fullWidth={false}
          variant="secondary"
          size="sm"
          onPress={() => Toast.show('1초 후 사라짐', { duration: 1000 })}
        >
          <Text variant="label" color="accent" bold>
            1s
          </Text>
        </Button>
        <Button
          fullWidth={false}
          variant="secondary"
          size="sm"
          onPress={() => Toast.show('5초 후 사라짐', { duration: 5000 })}
        >
          <Text variant="label" color="accent" bold>
            5s
          </Text>
        </Button>
      </View>

      {/* Update */}
      <Text variant="label" color="textSecondary" style={styles.sectionLabel}>
        Update
      </Text>
      <View style={styles.row}>
        <Button
          fullWidth={false}
          variant="secondary"
          size="sm"
          onPress={() => {
            updateIdRef.current = Toast.show('업로드 중...', { type: 'info', duration: 0 });
            setTimeout(() => {
              Toast.update(updateIdRef.current, '업로드 완료!', {
                type: 'success',
                duration: 2000,
              });
            }, 2000);
          }}
        >
          <Text variant="label" color="accent" bold>
            Update
          </Text>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
  sectionLabel: { marginTop: Spacing.sm },
});
