import { Button, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import { useColorScheme } from '@/hooks';
import { Purchase } from '@/lib';
import type { PurchasesOfferings, PurchasesPackage } from 'react-native-purchases';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export function PurchaseDemo() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [initialized, setInitialized] = useState(false);
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: init once on mount
  useEffect(() => {
    try {
      Purchase.init();
      setInitialized(true);
    } catch (e) {
      setError(`Init failed: ${e}`);
    }
  }, []);

  const loadOfferings = useCallback(async () => {
    try {
      setError(null);
      const result = await Purchase.getOfferings();
      setOfferings(result);
    } catch (e) {
      setError(`Offerings failed: ${e}`);
    }
  }, []);

  const handlePurchase = useCallback(async (pkg: PurchasesPackage) => {
    try {
      setError(null);
      const customerInfo = await Purchase.purchase(pkg);
      const activeKeys = Object.keys(customerInfo.entitlements.active);
      setInfo(`Purchased! Active entitlements: ${activeKeys.join(', ') || 'none'}`);
    } catch (e) {
      setError(`Purchase failed: ${e}`);
    }
  }, []);

  const handleRestore = useCallback(async () => {
    try {
      setError(null);
      const customerInfo = await Purchase.restore();
      const activeKeys = Object.keys(customerInfo.entitlements.active);
      setInfo(`Restored! Active entitlements: ${activeKeys.join(', ') || 'none'}`);
    } catch (e) {
      setError(`Restore failed: ${e}`);
    }
  }, []);

  const loadCustomerInfo = useCallback(async () => {
    try {
      setError(null);
      const customerInfo = await Purchase.getCustomerInfo();
      const activeKeys = Object.keys(customerInfo.entitlements.active);
      setInfo(`ID: ${customerInfo.originalAppUserId}\nActive: ${activeKeys.join(', ') || 'none'}`);
    } catch (e) {
      setError(`Customer info failed: ${e}`);
    }
  }, []);

  const packages = offerings?.current?.availablePackages ?? [];

  return (
    <>
      <Text variant="subtitle">In-App Purchase</Text>

      <View style={[styles.card, { backgroundColor: colors.backgroundGrouped }]}>
        <Text variant="body">SDK: {initialized ? 'Initialized' : 'Not initialized'}</Text>
        <Text variant="caption" color="textSecondary">
          react-native-purchases v9
        </Text>
      </View>

      <Button onPress={loadOfferings}>
        <Text variant="label" color="background" bold>
          Load Offerings
        </Text>
      </Button>

      {packages.length > 0 && (
        <View style={[styles.card, { backgroundColor: colors.backgroundGrouped }]}>
          <Text variant="caption" color="textSecondary">
            Packages ({packages.length})
          </Text>
          {packages.map((pkg) => (
            <Button key={pkg.identifier} variant="secondary" onPress={() => handlePurchase(pkg)}>
              <Text variant="label" color="accent" bold>
                {pkg.identifier} — {pkg.product.priceString}
              </Text>
            </Button>
          ))}
        </View>
      )}

      <Button variant="secondary" onPress={handleRestore}>
        <Text variant="label" color="accent" bold>
          Restore Purchases
        </Text>
      </Button>

      <Button variant="ghost" onPress={loadCustomerInfo}>
        <Text variant="label" color="accent" bold>
          Customer Info
        </Text>
      </Button>

      {info && (
        <View style={[styles.card, { backgroundColor: colors.backgroundGrouped }]}>
          <Text variant="body">{info}</Text>
        </View>
      )}

      {error && (
        <View style={[styles.card, { backgroundColor: colors.backgroundGrouped }]}>
          <Text variant="body" color="destructive">
            {error}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    borderRadius: 12,
    gap: Spacing.xs,
  },
});
