import { InteractionsDemo } from '@/components/demo';
import {
  BottomSheet,
  type BottomSheetMethods,
  ExpandableBottomSheet,
  type ExpandableBottomSheetMethods,
  Text,
  Toast,
} from '@/components/ui';
import { Spacing } from '@/constants';
import { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import DemoScreen from './_wrapper';

export default function () {
  const basicRef = useRef<BottomSheetMethods>(null);
  const multiSnapRef = useRef<BottomSheetMethods>(null);
  const scrollRef = useRef<BottomSheetMethods>(null);
  const expandableRef = useRef<ExpandableBottomSheetMethods>(null);
  const expandableScrollRef = useRef<ExpandableBottomSheetMethods>(null);
  const dynamicRef = useRef<BottomSheetMethods>(null);
  const dynamicExpandableRef = useRef<ExpandableBottomSheetMethods>(null);

  const openBasic = useCallback(() => basicRef.current?.snapToIndex(0), []);
  const openMultiSnap = useCallback(() => multiSnapRef.current?.snapToIndex(0), []);
  const openScroll = useCallback(() => scrollRef.current?.snapToIndex(0), []);
  const openExpandable = useCallback(() => expandableRef.current?.snapToIndex(0), []);
  const openExpandableScroll = useCallback(() => expandableScrollRef.current?.snapToIndex(0), []);
  const openDynamic = useCallback(() => dynamicRef.current?.snapToIndex(0), []);
  const openDynamicExpandable = useCallback(() => dynamicExpandableRef.current?.snapToIndex(0), []);

  return (
    <View style={{ flex: 1 }}>
      <DemoScreen title="Interactions">
        <InteractionsDemo
          onOpenSheet={openBasic}
          showToast={(msg: string) => Toast.show(msg, { type: 'success', duration: 3000 })}
        />

        <Text variant="subtitle">Bottom Sheet Demos</Text>

        <View style={demoStyles.grid}>
          <DemoButton label="Basic (30%)" onPress={openBasic} />
          <DemoButton label="Multi Snap" onPress={openMultiSnap} />
          <DemoButton label="Scroll Content" onPress={openScroll} />
          <DemoButton label="Expandable" onPress={openExpandable} />
          <DemoButton label="Expandable + Scroll" onPress={openExpandableScroll} />
          <DemoButton label="Dynamic Sizing" onPress={openDynamic} />
          <DemoButton label="Dynamic Expandable" onPress={openDynamicExpandable} />
        </View>
      </DemoScreen>

      {/* 1. Basic — single snap */}
      <BottomSheet ref={basicRef} snapPoints={['30%']}>
        <View style={demoStyles.content}>
          <Text variant="subtitle">Basic Sheet</Text>
          <Text color="textSecondary">Single snap point at 30%</Text>
        </View>
      </BottomSheet>

      {/* 2. Multi snap — 30% / 60% */}
      <BottomSheet ref={multiSnapRef} snapPoints={['30%', '60%']}>
        <View style={demoStyles.content}>
          <Text variant="subtitle">Multi Snap</Text>
          <Text color="textSecondary">Drag up for 60%, down for 30%</Text>
          <Text color="textSecondary">Scroll enabled at 60%</Text>
        </View>
      </BottomSheet>

      {/* 3. Scroll content — internal ScrollView */}
      <BottomSheet ref={scrollRef} snapPoints={['40%', '70%']}>
        <View style={demoStyles.content}>
          <Text variant="subtitle">Scroll Content</Text>
          <Text color="textSecondary">Expand to 70% to scroll</Text>
          {Array.from({ length: 20 }, (_, i) => (
            <View key={i} style={demoStyles.listItem}>
              <Text>Scroll item {i + 1}</Text>
            </View>
          ))}
        </View>
      </BottomSheet>

      {/* 4. Expandable — detached card effect */}
      <ExpandableBottomSheet ref={expandableRef} snapPoints={['30%', '60%']}>
        <View style={demoStyles.content}>
          <Text variant="subtitle">Expandable</Text>
          <Text color="textSecondary">Drag past 60% to expand</Text>
          <Text color="textSecondary">Detached card at small sizes</Text>
        </View>
      </ExpandableBottomSheet>

      {/* 5. Expandable + scroll content */}
      <ExpandableBottomSheet ref={expandableScrollRef} snapPoints={['30%', '60%']}>
        <View style={demoStyles.content}>
          <Text variant="subtitle">Expandable + Scroll</Text>
          <Text color="textSecondary">Expand fully to scroll content</Text>
          {Array.from({ length: 30 }, (_, i) => (
            <View key={i} style={demoStyles.listItem}>
              <Text>Item {i + 1}</Text>
            </View>
          ))}
        </View>
      </ExpandableBottomSheet>

      {/* 6. Dynamic sizing — content height determines sheet height */}
      <BottomSheet ref={dynamicRef} snapPoints={['50%']} enableDynamicSizing>
        <View style={demoStyles.content}>
          <Text variant="subtitle">Dynamic Sizing</Text>
          <Text color="textSecondary">Sheet height matches content</Text>
          <Text color="textSecondary">snapPoints are ignored</Text>
        </View>
      </BottomSheet>

      {/* 7. Dynamic sizing + expandable — detached card at content height */}
      <ExpandableBottomSheet ref={dynamicExpandableRef} snapPoints={['50%']} enableDynamicSizing>
        <View style={demoStyles.content}>
          <Text variant="subtitle">Dynamic Expandable</Text>
          <Text color="textSecondary">Opens at content height</Text>
          <Text color="textSecondary">Drag up to expand fully</Text>
        </View>
      </ExpandableBottomSheet>
    </View>
  );
}

function DemoButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <View style={demoStyles.button}>
      <Text variant="label" color="accent" bold onPress={onPress} style={{ textAlign: 'center' }}>
        {label}
      </Text>
    </View>
  );
}

const demoStyles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  button: {
    backgroundColor: 'rgba(0,122,255,0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    minHeight: 44,
    justifyContent: 'center',
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  listItem: {
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
});
