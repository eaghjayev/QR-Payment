import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../constants/data';

interface CardVizProps {
  card: Card;
  small?: boolean;
}

export const CardViz: React.FC<CardVizProps> = ({ card, small }) => {
  const h = small ? 56 : 72;
  const w = small ? 96 : 120;

  return (
    <View style={[
      styles.card,
      { width: w, height: h },
    ]}>
      <View style={[StyleSheet.absoluteFill, {
        borderRadius: 10,
        backgroundColor: card.color1,
      }]} />
      <View style={[StyleSheet.absoluteFill, {
        borderRadius: 10,
        backgroundColor: card.color2,
        opacity: 0.6,
      }]} />
      <Text style={[styles.type, small && styles.typeSmall]}>{card.type}</Text>
      <Text style={[styles.last4, small && styles.last4Small]}>•••• {card.last4}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-between',
    flexShrink: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  type: {
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  typeSmall: {
    fontSize: 7,
  },
  last4: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    letterSpacing: 1,
  },
  last4Small: {
    fontSize: 10,
  },
});
