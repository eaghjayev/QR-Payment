import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AZQRLogoProps {
  size?: number;
}

export const AZQRLogo: React.FC<AZQRLogoProps> = ({ size = 64 }) => {
  return (
    <View style={[styles.container, {
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.22),
    }]}>
      <Text style={[styles.az, { fontSize: Math.round(size * 0.3) }]}>AZ</Text>
      <Text style={[styles.qr, { fontSize: Math.round(size * 0.22) }]}>QR</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e0f11',
    borderWidth: 2,
    borderColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  az: {
    color: '#F59E0B',
    fontWeight: '800',
    letterSpacing: 1,
    lineHeight: undefined,
    includeFontPadding: false,
  },
  qr: {
    color: '#F59E0B',
    fontWeight: '700',
    letterSpacing: 3,
    marginTop: -2,
    includeFontPadding: false,
  },
});
