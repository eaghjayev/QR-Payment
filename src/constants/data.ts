export const CARDS = [
  { id: 1, type: 'VISA DEBIT', last4: '4821', balance: 1245.60, color1: '#5762FF', color2: '#2d3891', name: 'Main Account' },
  { id: 2, type: 'MASTERCARD', last4: '9034', balance: 380.00, color1: '#1a1a2e', color2: '#16213e', name: 'Savings' },
  { id: 3, type: 'VISA CREDIT', last4: '2277', balance: 42.10, color1: '#b91c1c', color2: '#7f1d1d', name: 'Credit Card' },
];

export const MERCHANTS = {
  static: {
    name: 'KIOSK Sahil',
    voen: '1400234567',
    mcc: '5411 – Ərzaq mağazaları',
    amount: null as null,
  },
  dynamic: {
    name: 'Bravo Supermarket',
    voen: '1700891234',
    mcc: '5411 – Supermarketlər',
    amount: 23.80,
  },
  autoconfirm: {
    name: 'Bravo Supermarket',
    voen: '1700891234',
    mcc: '5411 – Supermarketlər',
    amount: 14.50,
  },
} as const;

export type ScanFlow = 'static' | 'dynamic' | 'autoconfirm';
export type MerchantKey = ScanFlow;

export type Card = typeof CARDS[number];
export type Merchant = typeof MERCHANTS[MerchantKey];

export type Transaction = {
  merchant: string;
  amount: number;
  date: string;
  icon: string;
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { merchant: 'Coffee Mug', amount: -4.50, date: 'Bu gün, 09:14', icon: '☕' },
  { merchant: 'Baku Mall', amount: -127.00, date: 'Dünən, 18:30', icon: '🛍️' },
  { merchant: 'Nar Mobile', amount: -15.00, date: '22 Apr', icon: '📱' },
  { merchant: 'Maaş', amount: +2400.00, date: '20 Apr', icon: '💸' },
];
