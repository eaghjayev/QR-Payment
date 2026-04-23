import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { T } from '../constants/theme';
import { Icon } from './Icon';

type NavTab = 'home' | 'cards' | 'stats' | 'profile';

interface BottomNavProps {
  active: NavTab;
  onChange: (tab: NavTab) => void;
  onQR: () => void;
  accent: string;
}

const NAV_ITEMS = [
  { id: 'home' as NavTab, icon: 'home' as const, label: 'Əsas' },
  { id: 'cards' as NavTab, icon: 'card' as const, label: 'Kartlar' },
  { id: 'stats' as NavTab, icon: 'chart' as const, label: 'Analitika' },
  { id: 'profile' as NavTab, icon: 'user' as const, label: 'Profil' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ active, onChange, onQR, accent }) => {
  return (
    <View style={[styles.nav, { backgroundColor: T.surface, borderTopColor: T.border }]}>
      {/* Home, Cards */}
      {NAV_ITEMS.slice(0, 2).map((item) => {
        const isActive = active === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => onChange(item.id)}
            style={styles.navItem}
            activeOpacity={0.7}
          >
            <Icon name={item.icon} size={22} color={isActive ? accent : T.textTert} />
            <Text style={[styles.navLabel, { color: isActive ? accent : T.textTert, fontWeight: isActive ? '700' : '500' }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* QR center button */}
      <TouchableOpacity onPress={onQR} style={styles.qrWrapper} activeOpacity={0.85}>
        <View style={[styles.qrBtn, { backgroundColor: accent }]}>
          <Icon name="qr" size={24} color="white" />
        </View>
      </TouchableOpacity>

      {/* Stats, Profile */}
      {NAV_ITEMS.slice(2).map((item) => {
        const isActive = active === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => onChange(item.id)}
            style={styles.navItem}
            activeOpacity={0.7}
          >
            <Icon name={item.icon} size={22} color={isActive ? accent : T.textTert} />
            <Text style={[styles.navLabel, { color: isActive ? accent : T.textTert, fontWeight: isActive ? '700' : '500' }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    borderTopWidth: 1,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    paddingVertical: 6,
  },
  navLabel: {
    fontSize: 10,
  },
  qrWrapper: {
    marginTop: -20,
    flexShrink: 0,
  },
  qrBtn: {
    width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
});
