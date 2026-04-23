import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  FlatList, Dimensions,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { T, ACCENT } from '../constants/theme';
import { CARDS, Transaction } from '../constants/data';
import { Icon } from '../components/Icon';

const { width: SCREEN_W } = Dimensions.get('window');

interface HomeScreenProps {
  onQR: () => void;
  accent: string;
  transactions: Transaction[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onQR, accent, transactions }) => {
  const [balVisible, setBalVisible] = useState(true);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: T.bg }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Salam,</Text>
          <Text style={styles.name}>Əli Həsənov</Text>
        </View>
        <View style={styles.avatar}>
          <View style={[StyleSheet.absoluteFill, { borderRadius: 20, backgroundColor: accent, opacity: 0.85 }]} />
          <Text style={styles.avatarText}>Ə</Text>
        </View>
      </View>

      {/* Balance Card */}
      <View style={[styles.balanceCard, { borderColor: `${accent}30` }]}>
        <View style={[StyleSheet.absoluteFill, { borderRadius: 20, backgroundColor: `${accent}12` }]} />
        <Text style={styles.balanceLabel}>Ümumi Balans</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceAmount}>
            {balVisible ? '1 626,60' : '••••••'}{' '}
            <Text style={styles.balanceCurrency}>AZN</Text>
          </Text>
          <TouchableOpacity onPress={() => setBalVisible(!balVisible)} style={styles.eyeBtn}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              {balVisible ? (
                <>
                  <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeWidth={1.8} stroke={T.textSec} />
                  <Circle cx={12} cy={12} r={3} strokeWidth={1.8} stroke={T.textSec} />
                </>
              ) : (
                <Path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" strokeWidth={1.8} stroke={T.textSec} />
              )}
            </Svg>
          </TouchableOpacity>
        </View>

        <View style={styles.actionRow}>
          {[{ label: 'Göndər', icon: 'send' as const }, { label: 'Al', icon: 'plus' as const }, { label: 'QR', icon: 'qr' as const }].map((a) => (
            <TouchableOpacity
              key={a.label}
              onPress={a.label === 'QR' ? onQR : undefined}
              style={[styles.actionBtn, { borderColor: `${accent}40`, backgroundColor: `${accent}22` }]}
              activeOpacity={0.7}
            >
              <Icon name={a.icon} size={16} color={accent} />
              <Text style={styles.actionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Cards section */}
      <Text style={styles.sectionLabel}>Kartlar</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsScroll}
        style={styles.cardsContainer}
      >
        {CARDS.map((c) => (
          <View key={c.id} style={styles.cardItem}>
            <View style={[StyleSheet.absoluteFill, { borderRadius: 14, backgroundColor: c.color1 }]} />
            <View style={[StyleSheet.absoluteFill, { borderRadius: 14, backgroundColor: c.color2, opacity: 0.6 }]} />
            <Text style={styles.cardType}>{c.type}</Text>
            <View>
              <Text style={styles.cardLast4}>•••• {c.last4}</Text>
              <Text style={styles.cardBalance}>{c.balance.toFixed(2)} AZN</Text>
            </View>
          </View>
        ))}
        <View style={[styles.cardItem, styles.addCard]}>
          <Icon name="plus" size={18} color={T.textTert} />
          <Text style={styles.addCardLabel}>Kart əlavə et</Text>
        </View>
      </ScrollView>

      {/* Transactions */}
      <Text style={[styles.sectionLabel, { marginTop: 16 }]}>Son əməliyyatlar</Text>
      {transactions.map((t, i) => (
        <View
          key={i}
          style={[
            styles.txRow,
            i < transactions.length - 1 && { borderBottomWidth: 1, borderBottomColor: T.border },
          ]}
        >
          <View style={styles.txIcon}>
            <Text style={{ fontSize: 18 }}>{t.icon}</Text>
          </View>
          <View style={styles.txInfo}>
            <Text style={styles.txMerchant}>{t.merchant}</Text>
            <Text style={styles.txDate}>{t.date}</Text>
          </View>
          <Text style={[styles.txAmount, { color: t.amount > 0 ? T.success : T.text }]}>
            {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)} AZN
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  greeting: { color: T.textSec, fontSize: 13, fontWeight: '500' },
  name: { color: T.text, fontSize: 18, fontWeight: '700', marginTop: 2 },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  avatarText: { color: 'white', fontWeight: '700', fontSize: 15, zIndex: 1 },
  balanceCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    overflow: 'hidden',
  },
  balanceLabel: {
    color: T.textSec,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  balanceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6 },
  balanceAmount: { color: T.text, fontSize: 32, fontWeight: '700', letterSpacing: -0.5 },
  balanceCurrency: { fontSize: 16, color: T.textSec, fontWeight: '500' },
  eyeBtn: { padding: 4 },
  actionRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  actionBtn: {
    flex: 1, borderRadius: 12, borderWidth: 1, paddingVertical: 9,
    alignItems: 'center', gap: 4,
  },
  actionLabel: { color: T.text, fontSize: 12, fontWeight: '600' },
  sectionLabel: {
    color: T.textSec, fontSize: 12, fontWeight: '600',
    letterSpacing: 0.5, textTransform: 'uppercase',
    paddingHorizontal: 16, marginBottom: 10,
  },
  cardsContainer: { paddingLeft: 16 },
  cardsScroll: { gap: 10, paddingRight: 16, paddingBottom: 4 },
  cardItem: {
    width: 130, height: 78, borderRadius: 14,
    padding: 10, justifyContent: 'space-between', overflow: 'hidden',
  },
  cardType: { fontSize: 9, color: 'rgba(255,255,255,0.6)', fontWeight: '600', letterSpacing: 0.8 },
  cardLast4: { fontSize: 13, color: 'rgba(255,255,255,0.95)', fontWeight: '600' },
  cardBalance: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 1 },
  addCard: {
    borderWidth: 2, borderColor: T.border, borderStyle: 'dashed',
    backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  addCardLabel: { fontSize: 10, color: T.textTert, fontWeight: '500' },
  txRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, marginHorizontal: 16,
  },
  txIcon: {
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: T.surfaceHigh, alignItems: 'center', justifyContent: 'center',
  },
  txInfo: { flex: 1 },
  txMerchant: { color: T.text, fontSize: 14, fontWeight: '600' },
  txDate: { color: T.textSec, fontSize: 12, marginTop: 1 },
  txAmount: { fontSize: 14, fontWeight: '600' },
});
