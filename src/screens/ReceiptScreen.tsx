import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { T } from '../constants/theme';
import { CARDS, Merchant, ScanFlow } from '../constants/data';
import { Icon } from '../components/Icon';

interface ReceiptScreenProps {
  onDone: () => void;
  qrType: ScanFlow;
  merchant: Merchant;
  paidAmount: number;
  accent: string;
}

export const ReceiptScreen: React.FC<ReceiptScreenProps> = ({
  onDone, qrType, merchant, paidAmount, accent,
}) => {
  const [autoOn, setAutoOn] = useState(false);
  const card = CARDS[0];

  const [receiptNo] = useState(() => 'QBZ-' + Math.floor(100000 + Math.random() * 900000));
  const [refNo] = useState(() => 'AZ' + Math.floor(1000000000 + Math.random() * 9000000000));
  const [authCode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
  const [dateStr] = useState(() => {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  });

  const wasAutoConfirm = qrType === 'autoconfirm';

  const fields: [string, string, boolean?][] = [
    ['Ekvayer', 'ABB (Azərbaycan Beynəlxalq Bankı)'],
    ['Satıcı', merchant.name],
    ['VÖEN', merchant.voen],
    ['Qəbz nömrəsi', receiptNo, true],
    ['Tarix və vaxt', dateStr],
    ['Məbləğ', `${paidAmount.toFixed(2)} AZN`],
    ['Avtorizasiya kodu', authCode],
    ['İstinad nömrəsi', refNo, true],
  ];

  return (
    <View style={[styles.container, { backgroundColor: T.bg }]}>
      {/* Success header */}
      <View style={[styles.successHeader, { borderBottomColor: T.border }]}>
        <View style={[styles.checkCircle, { borderColor: T.success, backgroundColor: `${T.success}20` }]}>
          <Icon name="check" size={30} color={T.success} />
        </View>
        <Text style={styles.successTitle}>Ödəniş uğurla tamamlandı</Text>
        <Text style={[styles.successAmount, { color: T.success }]}>
          {paidAmount.toFixed(2)} AZN
        </Text>
        {wasAutoConfirm && (
          <View style={[styles.autoConfirmBadge, { backgroundColor: `${accent}18`, borderColor: `${accent}30` }]}>
            <Icon name="wifi" size={12} color={accent} />
            <Text style={[styles.autoConfirmText, { color: accent }]}>
              Bu ödəniş avtomatik təsdiq ilə icra edildi
            </Text>
          </View>
        )}
      </View>

      {/* Receipt fields */}
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={[styles.fieldsCard, { backgroundColor: T.surface }]}>
          {fields.map(([label, value, copyable], i) => (
            <View
              key={label}
              style={[
                styles.fieldRow,
                i < fields.length - 1 && { borderBottomWidth: 1, borderBottomColor: T.border },
              ]}
            >
              <View style={styles.fieldContent}>
                <Text style={styles.fieldLabel}>{label}</Text>
                <Text style={styles.fieldValue}>{value}</Text>
              </View>
              {copyable && (
                <TouchableOpacity
                  onPress={() => Clipboard.setStringAsync(value)}
                  style={styles.copyBtn}
                >
                  <Icon name="copy" size={16} color={T.textSec} />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Auto-confirm toggle */}
        <View style={[styles.autoConfirmCard, { backgroundColor: T.surface }]}>
          <View style={styles.autoConfirmRow}>
            <View style={styles.autoConfirmLabel}>
              <Text style={styles.autoConfirmTitle}>Avtomatik Təsdiq</Text>
              <Text style={styles.autoConfirmDesc}>
                {merchant.name} üçün növbəti ödənişlər avtomatik icra edilsin
              </Text>
            </View>
            <TouchableOpacity onPress={() => setAutoOn(!autoOn)} style={styles.toggleBtn}>
              <Icon
                name={autoOn ? 'toggle' : 'toggleOff'}
                size={32}
                color={autoOn ? accent : T.textTert}
              />
            </TouchableOpacity>
          </View>
          {autoOn && (
            <View style={[styles.autoConfirmActive, { backgroundColor: `${accent}12`, borderColor: `${accent}25` }]}>
              <Text style={[styles.autoConfirmActiveText, { color: accent }]}>
                ✓ {merchant.name} üçün avtomatik təsdiq aktivdir. Kart: •••• {card.last4}
              </Text>
            </View>
          )}
        </View>

        {/* Share button */}
        <TouchableOpacity
          style={[styles.shareBtn, { backgroundColor: T.surface, borderColor: T.border }]}
          activeOpacity={0.7}
        >
          <Icon name="share" size={18} color={T.text} />
          <Text style={styles.shareBtnText}>Qəbzi Paylaş</Text>
        </TouchableOpacity>

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Done button */}
      <View style={[styles.footer, { borderTopColor: T.border }]}>
        <TouchableOpacity
          onPress={onDone}
          style={[styles.doneBtn, { backgroundColor: accent }]}
          activeOpacity={0.8}
        >
          <Text style={styles.doneBtnText}>Ana Səhifəyə Qayıt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  successHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  checkCircle: {
    width: 64, height: 64, borderRadius: 32,
    borderWidth: 2, alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  successTitle: { color: T.text, fontSize: 18, fontWeight: '700', textAlign: 'center' },
  successAmount: { fontSize: 28, fontWeight: '800', marginTop: 6, letterSpacing: -0.5 },
  autoConfirmBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderRadius: 20, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 12, marginTop: 10,
  },
  autoConfirmText: { fontSize: 11, fontWeight: '700' },
  body: { flex: 1, padding: 16 },
  fieldsCard: {
    borderRadius: 16, overflow: 'hidden', marginBottom: 16,
  },
  fieldRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 13, paddingHorizontal: 16,
  },
  fieldContent: { flex: 1, minWidth: 0 },
  fieldLabel: { color: T.textSec, fontSize: 11, fontWeight: '500', marginBottom: 3 },
  fieldValue: { color: T.text, fontSize: 13, fontWeight: '600', flexWrap: 'wrap' },
  copyBtn: { padding: 4, flexShrink: 0 },
  autoConfirmCard: {
    borderRadius: 16, padding: 16, marginBottom: 16,
  },
  autoConfirmRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  autoConfirmLabel: { flex: 1 },
  autoConfirmTitle: { color: T.text, fontSize: 14, fontWeight: '600' },
  autoConfirmDesc: { color: T.textSec, fontSize: 12, marginTop: 3, lineHeight: 17 },
  toggleBtn: { padding: 0 },
  autoConfirmActive: {
    marginTop: 12, padding: 10, borderRadius: 10, borderWidth: 1,
  },
  autoConfirmActiveText: { fontSize: 11, fontWeight: '600' },
  shareBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 13, borderRadius: 14, borderWidth: 1, marginBottom: 8,
  },
  shareBtnText: { color: T.text, fontSize: 14, fontWeight: '600' },
  footer: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16, borderTopWidth: 1 },
  doneBtn: {
    paddingVertical: 16, borderRadius: 14, alignItems: 'center',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.44, shadowRadius: 10, elevation: 8,
  },
  doneBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
});
