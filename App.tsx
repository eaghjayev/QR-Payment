import React, { useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { T, ACCENT } from './src/constants/theme';
import { MERCHANTS, INITIAL_TRANSACTIONS, ScanFlow, Transaction } from './src/constants/data';
import { HomeScreen } from './src/screens/HomeScreen';
import { ScannerScreen } from './src/screens/ScannerScreen';
import { ConfirmScreen } from './src/screens/ConfirmScreen';
import { ReceiptScreen } from './src/screens/ReceiptScreen';
import { BottomNav } from './src/components/BottomNav';

type Screen = 'home' | 'scanner' | 'confirm' | 'receipt';
type NavTab = 'home' | 'cards' | 'stats' | 'profile';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [navTab, setNavTab] = useState<NavTab>('home');
  const [scanFlow, setScanFlow] = useState<ScanFlow>('dynamic');
  const [paidAmount, setPaidAmount] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const accent = ACCENT;

  const handleScanned = (flow: ScanFlow) => {
    setScanFlow(flow);
    if (flow === 'autoconfirm') {
      setPaidAmount(MERCHANTS.autoconfirm.amount);
      setScreen('receipt');
    } else {
      setScreen('confirm');
    }
  };

  const handleConfirm = (amount: number) => {
    setPaidAmount(amount);
    setScreen('receipt');
  };

  const handleDone = () => {
    const now = new Date();
    const timeStr = `Bu gün, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const merchant = MERCHANTS[scanFlow];
    setTransactions((prev) => [
      { merchant: merchant.name, amount: -paidAmount, date: timeStr, icon: '🏪' },
      ...prev,
    ]);
    setScreen('home');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <View style={styles.homeContainer}>
            <View style={styles.homeContent}>
              <HomeScreen
                onQR={() => setScreen('scanner')}
                accent={accent}
                transactions={transactions}
              />
            </View>
            <BottomNav
              active={navTab}
              onChange={setNavTab}
              onQR={() => setScreen('scanner')}
              accent={accent}
            />
          </View>
        );
      case 'scanner':
        return <ScannerScreen onBack={() => setScreen('home')} onScanned={handleScanned} />;
      case 'confirm':
        return (
          <ConfirmScreen
            onBack={() => setScreen('scanner')}
            onConfirm={handleConfirm}
            qrType={scanFlow}
            merchant={MERCHANTS[scanFlow]}
            accent={accent}
          />
        );
      case 'receipt':
        return (
          <ReceiptScreen
            onDone={handleDone}
            qrType={scanFlow}
            merchant={MERCHANTS[scanFlow]}
            paidAmount={paidAmount}
            accent={accent}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={T.bg} />
        <View style={styles.root}>
          {renderScreen()}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: T.bg,
  },
  root: {
    flex: 1,
    backgroundColor: T.bg,
  },
  homeContainer: {
    flex: 1,
  },
  homeContent: {
    flex: 1,
    overflow: 'hidden',
  },
});
