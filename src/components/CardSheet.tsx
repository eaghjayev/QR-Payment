import React from 'react';
import {
  View, Text, TouchableOpacity, Modal, StyleSheet, Pressable,
} from 'react-native';
import { T } from '../constants/theme';
import { Card } from '../constants/data';
import { CardViz } from './CardViz';
import { Icon } from './Icon';

interface CardSheetProps {
  cards: readonly Card[];
  selectedId: number;
  payAmount: number;
  onSelect: (card: Card) => void;
  onClose: () => void;
  accent: string;
}

export const CardSheet: React.FC<CardSheetProps> = ({
  cards, selectedId, payAmount, onSelect, onClose, accent,
}) => {
  return (
    <Modal transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Kart seçin</Text>
        {cards.map((card) => {
          const insufficient = card.balance < payAmount;
          return (
            <TouchableOpacity
              key={card.id}
              onPress={() => !insufficient && onSelect(card)}
              style={[
                styles.row,
                selectedId === card.id && { backgroundColor: `${accent}15`, borderLeftColor: accent },
                insufficient && styles.rowDisabled,
              ]}
              activeOpacity={insufficient ? 1 : 0.7}
            >
              <CardViz card={card} small />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{card.name}</Text>
                <Text style={styles.cardLast4}>•••• {card.last4}</Text>
                <View style={styles.balanceRow}>
                  <Text style={[styles.balance, { color: insufficient ? T.danger : T.success }]}>
                    {card.balance.toFixed(2)} AZN
                  </Text>
                  {insufficient && (
                    <Text style={styles.insufficientLabel}>Vəsait yoxdur</Text>
                  )}
                </View>
              </View>
              {selectedId === card.id && !insufficient && (
                <View style={[styles.checkCircle, { backgroundColor: accent }]}>
                  <Icon name="check" size={13} color="white" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    backgroundColor: T.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 32,
    paddingTop: 20,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: T.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    color: T.text,
    fontSize: 17,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  rowDisabled: {
    opacity: 0.45,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    color: T.text,
    fontSize: 14,
    fontWeight: '600',
  },
  cardLast4: {
    color: T.textSec,
    fontSize: 12,
    marginTop: 2,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  balance: {
    fontSize: 12,
    fontWeight: '600',
  },
  insufficientLabel: {
    color: T.danger,
    fontSize: 11,
    fontWeight: '600',
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
