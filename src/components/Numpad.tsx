import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { T } from '../constants/theme';

interface NumpadProps {
  value: string;
  onChange: (v: string) => void;
}

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];

export const Numpad: React.FC<NumpadProps> = ({ value, onChange }) => {
  const press = (k: string) => {
    if (k === '⌫') { onChange(value.slice(0, -1)); return; }
    if (k === '.' && value.includes('.')) return;
    if (k === '.' && value === '') { onChange('0.'); return; }
    const dotIdx = value.indexOf('.');
    if (dotIdx !== -1 && value.length - dotIdx > 2) return;
    if (value === '0' && k !== '.') { onChange(k); return; }
    if (value.length >= 9) return;
    onChange(value + k);
  };

  return (
    <View style={styles.grid}>
      {keys.map((k) => (
        <TouchableOpacity
          key={k}
          onPress={() => press(k)}
          style={[styles.key, k === '⌫' && styles.backspaceKey]}
          activeOpacity={0.6}
        >
          {k === '⌫' ? (
            <Svg width={20} height={16} viewBox="0 0 24 20">
              <Path
                d="M9 4L2 10l7 6M2 10h20"
                strokeWidth={2}
                stroke={T.textSec}
                strokeLinecap="round"
              />
              <Path
                d="M11 7l6 6M17 7l-6 6"
                strokeWidth={2}
                stroke={T.textSec}
                strokeLinecap="round"
              />
            </Svg>
          ) : (
            <Text style={styles.keyText}>{k}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 4,
  },
  key: {
    width: '30%',
    height: 54,
    backgroundColor: T.surface,
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  backspaceKey: {
    backgroundColor: T.surfaceHigh,
  },
  keyText: {
    color: T.text,
    fontSize: 22,
    fontWeight: '500',
    fontFamily: 'System',
  },
});
