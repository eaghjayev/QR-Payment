import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Image,
} from 'react-native';
import { T } from '../constants/theme';
import { CARDS, Merchant, ScanFlow } from '../constants/data';
import { Icon } from '../components/Icon';
import { CardViz } from '../components/CardViz';
import { CardSheet } from '../components/CardSheet';
import { Numpad } from '../components/Numpad';

interface ConfirmScreenProps {
  onBack: () => void;
  onConfirm: (amount: number) => void;
  qrType: ScanFlow;
  merchant: Merchant;
  accent: string;
}

export const ConfirmScreen: React.FC<ConfirmScreenProps> = ({
  onBack, onConfirm, qrType, merchant, accent,
}) => {
  const [amount, setAmount] = useState('');
  const [selectedCard, setSelectedCard] = useState(CARDS[0]);
  const [showSheet, setShowSheet] = useState(false);

  const isDynamic = qrType === 'dynamic' || qrType === 'autoconfirm';
  const payAmount = isDynamic ? (merchant.amount ?? 0) : (parseFloat(amount) || 0);
  const isValid = payAmount > 0 && selectedCard.balance >= payAmount;
  const insufficient = selectedCard.balance < payAmount && payAmount > 0;

  const displayAmount = amount === '' ? '0' : amount;

  return (
    <View style={[styles.container, { backgroundColor: T.bg }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: T.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Icon name="back" size={22} color={T.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ödənişi Təsdiqlə</Text>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* AZQR Logo centered */}
        <View style={styles.logoContainer}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            source={require('../../assets/azqr-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Merchant info */}
        <View style={styles.merchantRow}>
          <View style={[styles.merchantIcon, { backgroundColor: `${accent}22`, borderColor: `${accent}30` }]}>
            <Icon name="qr" size={22} color={accent} />
          </View>
          <View style={styles.merchantInfo}>
            <Text style={styles.merchantName} numberOfLines={1}>{merchant.name}</Text>
            <View style={styles.merchantMeta}>
              <Text style={styles.merchantVoen}>VÖEN: {merchant.voen}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={[styles.merchantMcc, { color: accent }]}>
                MCC {merchant.mcc.split('–')[0].trim()}
              </Text>
            </View>
          </View>
        </View>

        {/* Card selector */}
        <TouchableOpacity
          onPress={() => setShowSheet(true)}
          style={[
            styles.cardSelector,
            {
              borderColor: insufficient ? T.danger : T.border,
              backgroundColor: T.surface,
            },
          ]}
          activeOpacity={0.8}
        >
          <CardViz card={selectedCard} small />
          <View style={styles.cardSelectorInfo}>
            <Text style={styles.cardSelectorName}>
              {selectedCard.name} •••• {selectedCard.last4}
            </Text>
            <Text style={[
              styles.cardSelectorBalance,
              { color: insufficient ? T.danger : T.textSec, fontWeight: insufficient ? '600' : '400' },
            ]}>
              {insufficient
                ? '⚠ Kifayət qədər vəsait yoxdur'
                : `${selectedCard.balance.toFixed(2)} AZN mövcuddur`}
            </Text>
          </View>
          <Icon name="chevDown" size={16} color={T.textSec} />
        </TouchableOpacity>

        {/* Amount display */}
        <View style={styles.amountSection}>
          {isDynamic ? (
            <View style={styles.amountFixed}>
              <Text style={styles.amountFixedLabel}>Ödəniş məbləği</Text>
              <Text style={styles.amountFixedValue}>
                {(merchant.amount ?? 0).toFixed(2)}{' '}
                <Text style={styles.amountCurrency}>AZN</Text>
              </Text>
              <View style={styles.amountNote}>
                <Icon name="info" size={13} color={T.textTert} />
                <Text style={styles.amountNoteText}>Məbləğ satıcı tərəfindən müəyyən edilib</Text>
              </View>
            </View>
          ) : (
            <View style={styles.amountInput}>
              <Text style={styles.amountInputLabel}>Məbləği daxil edin</Text>
              <View style={styles.amountInputRow}>
                <Text style={[
                  styles.amountDigits,
                  { fontSize: displayAmount.length > 6 ? 38 : 52 },
                  { color: amount ? T.text : T.textTert },
                ]}>
                  {displayAmount}
                </Text>
                <View style={[styles.cursor, { backgroundColor: accent }]} />
                <Text style={styles.amountUnit}>AZN</Text>
              </View>
            </View>
          )}
        </View>

        {/* Numpad (static only) */}
        {!isDynamic && (
          <View style={styles.numpadContainer}>
            <Numpad value={amount} onChange={setAmount} />
          </View>
        )}

        {/* Spacer before confirm */}
        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Confirm button */}
      <View style={[styles.footer, { borderTopColor: T.border }]}>
        <TouchableOpacity
          onPress={isValid ? () => onConfirm(payAmount) : undefined}
          style={[
            styles.confirmBtn,
            {
              backgroundColor: isValid ? accent : T.surfaceHigh,
            },
          ]}
          activeOpacity={isValid ? 0.8 : 1}
        >
          <Text style={[styles.confirmBtnText, { color: isValid ? 'white' : T.textTert }]}>
            {isValid
              ? `${payAmount.toFixed(2)} AZN Ödə`
              : isDynamic ? 'Kart seçin' : 'Məbləği daxil edin'}
          </Text>
        </TouchableOpacity>
      </View>

      {showSheet && (
        <CardSheet
          cards={CARDS}
          selectedId={selectedCard.id}
          payAmount={payAmount}
          onSelect={(c) => { setSelectedCard(c); setShowSheet(false); }}
          onClose={() => setShowSheet(false)}
          accent={accent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: T.text, fontSize: 17, fontWeight: '700' },
  body: { flex: 1, paddingHorizontal: 16 },
  logoContainer: { alignItems: 'center', marginTop: 20, marginBottom: 22 },
  logo: { width: 64, height: 64, borderRadius: 12 },
  merchantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  merchantIcon: {
    width: 42, height: 42, borderRadius: 12,
    borderWidth: 1, alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  merchantInfo: { flex: 1, minWidth: 0 },
  merchantName: { color: T.text, fontSize: 15, fontWeight: '700' },
  merchantMeta: { flexDirection: 'row', gap: 6, marginTop: 3, flexWrap: 'wrap', alignItems: 'center' },
  merchantVoen: { fontSize: 11, color: T.textSec },
  dot: { fontSize: 11, color: T.textTert },
  merchantMcc: { fontSize: 11, fontWeight: '600' },
  cardSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 14,
    padding: 11,
    marginBottom: 20,
  },
  cardSelectorInfo: { flex: 1 },
  cardSelectorName: { color: T.text, fontSize: 13, fontWeight: '600' },
  cardSelectorBalance: { fontSize: 11, marginTop: 2 },
  amountSection: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  amountFixed: { alignItems: 'center' },
  amountFixedLabel: {
    color: T.textSec, fontSize: 12, fontWeight: '600',
    letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8,
  },
  amountFixedValue: {
    color: T.text, fontSize: 48, fontWeight: '800', letterSpacing: -1, lineHeight: 56,
  },
  amountCurrency: { fontSize: 20, color: T.textSec, fontWeight: '600' },
  amountNote: {
    flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10,
  },
  amountNoteText: { color: T.textSec, fontSize: 12 },
  amountInput: { alignItems: 'center', width: '100%' },
  amountInputLabel: {
    color: T.textSec, fontSize: 12, fontWeight: '600',
    letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12,
  },
  amountInputRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  amountDigits: {
    fontWeight: '800', letterSpacing: -1, lineHeight: 56,
    fontVariant: ['tabular-nums'],
  },
  cursor: {
    width: 3, height: 48, borderRadius: 2, marginBottom: 4,
  },
  amountUnit: {
    fontSize: 20, color: T.textSec, fontWeight: '700', paddingBottom: 4,
  },
  numpadContainer: { marginTop: 8 },
  footer: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16, borderTopWidth: 1 },
  confirmBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  confirmBtnText: { fontSize: 16, fontWeight: '700' },
});
