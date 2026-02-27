import { Text } from '@/components/ui';
import { Colors } from '@/constants';
import { useColorScheme } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { t } = useTranslation();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Text variant="label" color="textSecondary">
        {t('home.placeholder')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
