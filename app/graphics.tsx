import { ChromaRing } from '@/components/graphics/chroma-ring';
import { GrainyGradient } from '@/components/graphics/grainy-gradient';
import { AnimatedMeshGradient } from '@/components/graphics/mesh-gradient';
import { AnimatedPressable, Text } from '@/components/ui';
import { Spacing } from '@/constants';
import { useThemeColor } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GraphicsScreen() {
  const bg = useThemeColor('background');
  const accent = useThemeColor('accent');
  const { top } = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth - Spacing.md * 2;

  return (
    <View style={[styles.root, { backgroundColor: bg }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: top + Spacing.md }]}
      >
        <View style={styles.headerRow}>
          <AnimatedPressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color={accent} />
          </AnimatedPressable>
          <View style={styles.headerText}>
            <Text variant="hero">Graphics</Text>
            <Text variant="label" color="textSecondary">
              Skia shader 기반 시각 효과
            </Text>
          </View>
        </View>

        {/* Chroma Ring */}
        <View style={styles.section}>
          <Text variant="subtitle">Chroma Ring</Text>
          <Text color="textSecondary" variant="caption">
            Liquid metal border shader
          </Text>
          <View style={styles.center}>
            <ChromaRing width={cardWidth} height={56} borderWidth={2} speed={1.0}>
              <Text bold>Chroma Ring Button</Text>
            </ChromaRing>
          </View>
          <View style={styles.center}>
            <ChromaRing
              width={120}
              height={120}
              borderRadius={60}
              borderWidth={3}
              glow="#ff6b9d"
              base="#4a1942"
              background="#1a0a1a"
            />
          </View>
        </View>

        {/* Mesh Gradient */}
        <View style={styles.section}>
          <Text variant="subtitle">Mesh Gradient</Text>
          <Text color="textSecondary" variant="caption">
            Animated 4-color mesh blending
          </Text>
          <View style={[styles.gradientCard, { borderRadius: 16, overflow: 'hidden' }]}>
            <AnimatedMeshGradient
              width={cardWidth}
              height={200}
              speed={0.5}
              colors={[
                { r: 0.36, g: 0.04, b: 0.71 },
                { r: 0.49, g: 0.23, b: 0.93 },
                { r: 0.98, g: 0.57, b: 0.24 },
                { r: 0.86, g: 0.18, b: 0.47 },
              ]}
            />
          </View>
          <View style={[styles.gradientCard, { borderRadius: 16, overflow: 'hidden' }]}>
            <AnimatedMeshGradient
              width={cardWidth}
              height={200}
              speed={0.3}
              noise={0.3}
              colors={[
                { r: 0.0, g: 0.5, b: 0.8 },
                { r: 0.0, g: 0.8, b: 0.6 },
                { r: 0.1, g: 0.3, b: 0.7 },
                { r: 0.0, g: 0.6, b: 0.9 },
              ]}
            />
          </View>
        </View>

        {/* Grainy Gradient */}
        <View style={styles.section}>
          <Text variant="subtitle">Grainy Gradient</Text>
          <Text color="textSecondary" variant="caption">
            Animated gradient with film grain
          </Text>
          <View style={[styles.gradientCard, { borderRadius: 16, overflow: 'hidden' }]}>
            <GrainyGradient
              width={cardWidth}
              height={200}
              colors={['#5b0bb5', '#7c3aed', '#fb923c', '#db2777']}
              speed={2.0}
              intensity={0.15}
            />
          </View>
          <View style={[styles.gradientCard, { borderRadius: 16, overflow: 'hidden' }]}>
            <GrainyGradient
              width={cardWidth}
              height={200}
              colors={['#0f766e', '#06b6d4', '#22d3ee']}
              speed={1.5}
              intensity={0.2}
              amplitude={0.15}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
    paddingBottom: Spacing['2xl'],
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  headerText: { flex: 1 },
  section: { gap: Spacing.sm, marginTop: Spacing.md },
  center: { alignItems: 'center' },
  gradientCard: { alignSelf: 'center' },
});
