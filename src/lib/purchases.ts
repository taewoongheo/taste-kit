import { Platform } from 'react-native';
import Purchases, {
  LOG_LEVEL,
  type CustomerInfo,
  type PurchasesOfferings,
  type PurchasesPackage,
} from 'react-native-purchases';

// Replace with your RevenueCat API keys
const API_KEYS = {
  apple: 'appl_YOUR_API_KEY',
  google: 'goog_YOUR_API_KEY',
};

/** Initialize RevenueCat SDK — call once on app start */
export function init(): void {
  if (__DEV__) {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
  }

  const apiKey = Platform.OS === 'ios' ? API_KEYS.apple : API_KEYS.google;
  Purchases.configure({ apiKey });
}

/** Fetch current offerings (product catalog) */
export async function getOfferings(): Promise<PurchasesOfferings> {
  return Purchases.getOfferings();
}

/** Purchase a package */
export async function purchase(pkg: PurchasesPackage): Promise<CustomerInfo> {
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return customerInfo;
}

/** Restore previous purchases */
export async function restore(): Promise<CustomerInfo> {
  return Purchases.restorePurchases();
}

/** Get current customer info (subscription status, entitlements) */
export async function getCustomerInfo(): Promise<CustomerInfo> {
  return Purchases.getCustomerInfo();
}

/** Check if a specific entitlement is active */
export function isEntitlementActive(customerInfo: CustomerInfo, entitlementId: string): boolean {
  return typeof customerInfo.entitlements.active[entitlementId] !== 'undefined';
}
