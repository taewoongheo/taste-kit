/**
 * ╔════════════════════════════════════════════════════════╗
 * ║                                                        ║
 * ║   ✦ Badge Component  ✦                                ║
 * ║                                                        ║
 * ╠════════════════════════════════════════════════════════╣
 * ║  Author      : Ritesh “rit3zh”                        ║
 * ║  Created On  : April 27, 2025                          ║
 * ║  A versatile badge for status indicators,              ║
 * ║  notifications, and contextual labels in your UI       ║
 * ╚════════════════════════════════════════════════════════╝
 */

import type React from 'react';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { sizeStyles, variantStyles } from './conf';
import type { IBadge } from './types';

const borderRadiusStyles = { sm: 4, md: 8, lg: 12, xl: 16, full: 999 } as const;

const Badge: React.FC<IBadge> & React.FunctionComponent<IBadge> = memo<IBadge>(
  ({
    label,
    variant = 'default',
    size = 'md',
    style,
    textStyle,
    icon,
    radius = 'md',
  }: IBadge): React.ReactNode & React.ReactElement & React.JSX.Element => {
    const vs = variantStyles[variant];
    const ss = sizeStyles[size];
    const rs = borderRadiusStyles[radius];

    return (
      <View
        style={[
          styles.badge,
          {
            backgroundColor: vs.backgroundColor,
            paddingVertical: ss.paddingVertical,
            paddingHorizontal: ss.paddingHorizontal,
            borderRadius: rs,
            borderColor: vs.borderColor,
            borderWidth: vs.borderWidth,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}
      >
        {icon}
        {label ? (
          <Text style={[styles.text, { color: vs.textColor, fontSize: ss.fontSize }, textStyle]}>
            {label}
          </Text>
        ) : null}
      </View>
    );
  },
);

export default memo<React.FC<IBadge> & React.FunctionComponent<IBadge>>(Badge);

const styles = StyleSheet.create({
  badge: {},
  text: {
    fontWeight: '500',
    marginLeft: 5,
  },
});
