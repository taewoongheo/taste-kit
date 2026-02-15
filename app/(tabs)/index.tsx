import {
  AnimatedPressable,
  Button,
  Card,
  Dialog,
  Divider,
  Image,
  ListItem,
  SearchBar,
  Sheet,
  Skeleton,
  Text,
  TextInput,
  Toggle,
  useToast,
} from '@/components/ui';
import { Spacing } from '@/constants';
import { useEntrance, useThemeColor } from '@/hooks';
import { Haptic } from '@/lib';
import { useAppStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import type BottomSheet from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const bg = useThemeColor('background');
  const accent = useThemeColor('accent');

  const { top } = useSafeAreaInsets();
  const [renderKey, setRenderKey] = useState(0);

  const sheetRef = useRef<BottomSheet>(null);
  const openSheet = useCallback(() => sheetRef.current?.snapToIndex(0), []);
  const { show } = useToast();

  const [dialogVisible, setDialogVisible] = useState(false);

  const handleReplay = useCallback(() => {
    Haptic.tap();
    setRenderKey((k) => k + 1);
  }, []);

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: bg }]}
      contentContainerStyle={[styles.content, { paddingTop: top + Spacing.md }]}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text variant="hero">Components</Text>
          <Text variant="label" color="textSecondary">
            UI 컴포넌트 카탈로그
          </Text>
        </View>
        <AnimatedPressable onPress={handleReplay}>
          <View style={[styles.replayButton, { backgroundColor: accent }]}>
            <Ionicons name="refresh" size={20} color="#fff" />
          </View>
        </AnimatedPressable>
      </View>

      <ComponentsContent
        key={renderKey}
        openSheet={openSheet}
        show={show}
        setDialogVisible={setDialogVisible}
      />

      <Sheet sheetRef={sheetRef} snapPoints={['30%']}>
        <Text variant="subtitle">Bottom Sheet</Text>
        <Text color="textSecondary">Swipe down to dismiss</Text>
      </Sheet>

      <Dialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        title="삭제하시겠습니까?"
        message="이 작업은 되돌릴 수 없습니다."
        actions={[
          { label: '취소', variant: 'ghost', onPress: () => setDialogVisible(false) },
          {
            label: '삭제',
            variant: 'destructive',
            onPress: () => {
              setDialogVisible(false);
              show({ message: '삭제되었습니다', type: 'success' });
            },
          },
        ]}
      />
    </ScrollView>
  );
}

function ComponentsContent({
  openSheet,
  show,
  setDialogVisible,
}: {
  openSheet: () => void;
  show: ReturnType<typeof useToast>['show'];
  setDialogVisible: (v: boolean) => void;
}) {
  const accent = useThemeColor('accent');
  const secondary = useThemeColor('textSecondary');

  const s1 = useEntrance({ fade: true, slideY: 30, delay: 0 });
  const s2 = useEntrance({ fade: true, slideY: 30, delay: 100 });
  const s3 = useEntrance({ fade: true, slideY: 30, delay: 200 });
  const s4 = useEntrance({ fade: true, slideY: 30, delay: 300 });

  const [toggleValue, setToggleValue] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Text */}
      <Animated.View style={[styles.section, s1.animatedStyle]}>
        <Text variant="subtitle">Text</Text>
        <Text variant="hero">hero</Text>
        <Text variant="title">title</Text>
        <Text variant="subtitle">subtitle</Text>
        <Text variant="body">body (default)</Text>
        <Text variant="label" color="textSecondary">
          label · secondary
        </Text>
        <Text variant="caption" color="textSecondary">
          caption · secondary
        </Text>
      </Animated.View>

      {/* Card */}
      <Animated.View style={[styles.section, s1.animatedStyle]}>
        <Text variant="subtitle">Card</Text>
        <Card variant="elevated">
          <Text>Elevated</Text>
        </Card>
        <Card variant="outlined">
          <Text>Outlined</Text>
        </Card>
        <Card variant="filled">
          <Text>Filled</Text>
        </Card>
      </Animated.View>

      {/* Button */}
      <Animated.View style={[styles.section, s1.animatedStyle]}>
        <Text variant="subtitle">Button</Text>
        <View style={styles.row}>
          <Button title="Primary" variant="primary" size="sm" />
          <Button title="Secondary" variant="secondary" size="sm" />
        </View>
        <View style={styles.row}>
          <Button title="Destructive" variant="destructive" size="sm" />
          <Button title="Ghost" variant="ghost" size="sm" />
        </View>
        <Button title="Loading" loading fullWidth />
        <Button title="Disabled" disabled fullWidth />
      </Animated.View>

      {/* Image */}
      <Animated.View style={[styles.section, s2.animatedStyle]}>
        <Text variant="subtitle">Image</Text>
        <Image
          source="https://picsum.photos/seed/taste-kit/400/200"
          radius="lg"
          contentFit="cover"
        />
        <View style={styles.row}>
          <Image
            source="https://picsum.photos/seed/avatar1/100/100"
            radius="full"
            style={{ width: 48, height: 48 }}
          />
          <Image
            source="https://picsum.photos/seed/avatar2/100/100"
            radius="full"
            style={{ width: 48, height: 48 }}
          />
          <Image
            source="https://picsum.photos/seed/avatar3/100/100"
            radius="full"
            style={{ width: 48, height: 48 }}
          />
        </View>
      </Animated.View>

      {/* TextInput */}
      <Animated.View style={[styles.section, s2.animatedStyle]}>
        <Text variant="subtitle">TextInput</Text>
        <TextInput label="이메일" placeholder="example@mail.com" keyboardType="email-address" />
        <TextInput label="비밀번호" placeholder="8자 이상" secureTextEntry />
        <TextInput label="에러 상태" placeholder="입력하세요" error="필수 항목입니다" />
      </Animated.View>

      {/* SearchBar */}
      <Animated.View style={[styles.section, s2.animatedStyle]}>
        <Text variant="subtitle">SearchBar</Text>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      </Animated.View>

      {/* Toggle & ListItem */}
      <Animated.View style={[styles.section, s3.animatedStyle]}>
        <Text variant="subtitle">ListItem & Toggle</Text>
        <Card variant="filled" padding={0}>
          <ListItem
            title="알림"
            icon={<Ionicons name="notifications-outline" size={22} color={accent} />}
            trailing={<Toggle value={toggleValue} onValueChange={setToggleValue} />}
          />
          <ListItem
            title="설정"
            subtitle="앱 설정을 관리합니다"
            icon={<Ionicons name="settings-outline" size={22} color={accent} />}
            trailing={<Ionicons name="chevron-forward" size={18} color={secondary} />}
            onPress={() => show({ message: '설정 탭', type: 'info' })}
          />
          <ListItem
            title="정보"
            icon={<Ionicons name="information-circle-outline" size={22} color={accent} />}
            trailing={<Ionicons name="chevron-forward" size={18} color={secondary} />}
            onPress={() => show({ message: '정보 탭', type: 'info' })}
            separator={false}
          />
        </Card>
      </Animated.View>

      {/* Divider */}
      <Animated.View style={[styles.section, s3.animatedStyle]}>
        <Text variant="subtitle">Divider</Text>
        <Text color="textSecondary">기본</Text>
        <Divider />
        <Text color="textSecondary">Inset (56)</Text>
        <Divider inset={56} />
      </Animated.View>

      {/* Skeleton */}
      <Animated.View style={[styles.section, s3.animatedStyle]}>
        <Text variant="subtitle">Skeleton</Text>
        <View style={styles.row}>
          <Skeleton circle height={48} />
          <View style={styles.skeletonLines}>
            <Skeleton width={160} height={16} />
            <Skeleton width={100} height={12} />
          </View>
        </View>
        <Skeleton height={120} radius={12} />
      </Animated.View>

      {/* Interactions */}
      <Animated.View style={[styles.section, s4.animatedStyle]}>
        <Text variant="subtitle">Interactions</Text>
        <AnimatedPressable onPress={openSheet}>
          <Card variant="filled">
            <Text>Sheet 열기</Text>
          </Card>
        </AnimatedPressable>
        <View style={styles.row}>
          <Button
            title="Toast: success"
            variant="secondary"
            size="sm"
            onPress={() => show({ message: '저장되었습니다', type: 'success' })}
          />
          <Button
            title="Toast: error"
            variant="secondary"
            size="sm"
            onPress={() => show({ message: '오류 발생', type: 'error' })}
          />
        </View>
        <Button
          title="Dialog 열기"
          variant="secondary"
          fullWidth
          onPress={() => setDialogVisible(true)}
        />
        <View style={styles.row}>
          <Button title="Haptic: tap" variant="ghost" size="sm" onPress={() => Haptic.tap()} />
          <Button
            title="Haptic: success"
            variant="ghost"
            size="sm"
            onPress={() => Haptic.success()}
          />
          <Button title="Haptic: error" variant="ghost" size="sm" onPress={() => Haptic.error()} />
        </View>
      </Animated.View>

      {/* Navigation */}
      <Animated.View style={[styles.section, s4.animatedStyle]}>
        <Text variant="subtitle">Navigation</Text>
        <Button
          title="온보딩 다시 보기"
          variant="secondary"
          fullWidth
          onPress={() => {
            useAppStore.getState().setOnboarded(false);
            router.replace('/onboarding');
          }}
        />
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
    paddingBottom: Spacing['2xl'],
  },
  section: {
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  skeletonLines: {
    flex: 1,
    gap: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
  },
  replayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
});
