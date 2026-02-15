import * as Haptics from 'expo-haptics';

/** Light tap — 버튼, 토글, 일반 터치 */
export function tap() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

/** Medium impact — 스냅, 카드 드롭 */
export function impact() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

/** Heavy impact — 삭제 확인, 중요 액션 */
export function heavyImpact() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
}

/** 성공 피드백 — 완료, 저장 */
export function success() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}

/** 경고 피드백 */
export function warning() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
}

/** 에러 피드백 */
export function error() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
}

/** 선택 변경 — 피커, 세그먼트 전환 */
export function selection() {
  Haptics.selectionAsync();
}
