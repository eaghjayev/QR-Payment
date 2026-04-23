import React, { useRef, useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { T } from '../constants/theme';
import { ScanFlow } from '../constants/data';
import { Icon } from '../components/Icon';

const { width: SCREEN_W } = Dimensions.get('window');

const TABS = ['AZQR', 'ƏDV Geri Al', 'Azparking'];
const FLOWS: ScanFlow[] = ['static', 'dynamic', 'autoconfirm'];
const FLOW_LABELS = ['Statik QR', 'Dinamik QR', 'Avtomatik Təsdiq'];
const FLOW_COLORS = [T.textSec, '#5762FF', '#00d68f'];

interface ScannerScreenProps {
  onBack: () => void;
  onScanned: (flow: ScanFlow) => void;
}

export const ScannerScreen: React.FC<ScannerScreenProps> = ({ onBack, onScanned }) => {
  const [activeTab, setActiveTab] = useState('AZQR');
  const [scanning, setScanning] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    AsyncStorage.getItem('azqr_scan_count').then((val) => {
      setScanCount(parseInt(val || '0'));
    });
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(scanLineAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  const currentFlow = scanCount % 3;

  const handleScan = async () => {
    if (scanning) return;
    setScanning(true);
    setTimeout(async () => {
      const next = scanCount + 1;
      await AsyncStorage.setItem('azqr_scan_count', String(next));
      setScanCount(next);
      setScanning(false);
      onScanned(FLOWS[currentFlow]);
    }, 900);
  };

  const scanLineY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 176], // 220 * 0.8
  });

  const QR_SIZE = Math.min(SCREEN_W - 80, 220);
  const CORNER = 32;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.headerBtn}>
          <Icon name="close" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>QR Skan</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Icon name="flash" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <View style={styles.tabContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Viewfinder */}
      <View style={styles.viewfinder}>
        <View style={[styles.bgGradient]} />

        {/* QR Frame corners */}
        <View style={{ width: QR_SIZE, height: QR_SIZE, position: 'relative' }}>
          {/* Top-left */}
          <View style={[styles.corner, { top: 0, left: 0 }]}>
            <View style={[styles.cornerH, { top: 0, left: 0, right: 0 }]} />
            <View style={[styles.cornerV, { top: 0, left: 0, bottom: 0 }]} />
          </View>
          {/* Top-right */}
          <View style={[styles.corner, { top: 0, right: 0 }]}>
            <View style={[styles.cornerH, { top: 0, left: 0, right: 0 }]} />
            <View style={[styles.cornerV, { top: 0, right: 0, bottom: 0 }]} />
          </View>
          {/* Bottom-left */}
          <View style={[styles.corner, { bottom: 0, left: 0 }]}>
            <View style={[styles.cornerH, { bottom: 0, left: 0, right: 0 }]} />
            <View style={[styles.cornerV, { top: 0, left: 0, bottom: 0 }]} />
          </View>
          {/* Bottom-right */}
          <View style={[styles.corner, { bottom: 0, right: 0 }]}>
            <View style={[styles.cornerH, { bottom: 0, left: 0, right: 0 }]} />
            <View style={[styles.cornerV, { top: 0, right: 0, bottom: 0 }]} />
          </View>

          {/* Scan line */}
          <Animated.View
            style={[styles.scanLine, { transform: [{ translateY: scanLineY }] }]}
          />

          {/* Placeholder QR pattern */}
          <View style={styles.qrPlaceholder}>
            {Array.from({ length: 49 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.qrDot,
                  { backgroundColor: (i * 7 + i * 3) % 5 > 2 ? 'white' : 'transparent' },
                ]}
              />
            ))}
          </View>
        </View>

        <Text style={styles.hint}>QR kodu çərçivənin içinə yerləşdirin</Text>

        {scanning && (
          <View style={styles.scanningOverlay}>
            <View style={styles.scanningBadge}>
              <Text style={styles.scanningText}>Skan edilir...</Text>
            </View>
          </View>
        )}
      </View>

      {/* Scan button area */}
      <View style={[styles.bottomArea, { backgroundColor: T.bg }]}>
        <View style={styles.flowIndicator}>
          <Text style={styles.flowLabel}>Növbəti axın:</Text>
          <View style={[styles.flowBadge, { backgroundColor: `${FLOW_COLORS[currentFlow]}18` }]}>
            <Text style={[styles.flowBadgeText, { color: FLOW_COLORS[currentFlow] }]}>
              {FLOW_LABELS[currentFlow]}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleScan}
          disabled={scanning}
          style={[
            styles.scanBtn,
            { backgroundColor: scanning ? '#333' : '#5762FF' },
          ]}
          activeOpacity={0.8}
        >
          <Text style={styles.scanBtnText}>
            {scanning ? 'Skan edilir...' : 'QR Kodu Skan Et'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.85)',
    zIndex: 10,
  },
  headerBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: {
    color: 'white', fontSize: 17, fontWeight: '600', flex: 1,
  },
  tabBar: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    paddingHorizontal: 16,
    paddingBottom: 12,
    zIndex: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
  },
  tab: {
    flex: 1, paddingVertical: 9, alignItems: 'center',
    borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: '#5762FF' },
  tabText: { color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: '500' },
  tabTextActive: { color: '#fff', fontWeight: '700' },
  viewfinder: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  bgGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0d1117',
    opacity: 0.9,
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
  },
  cornerH: {
    position: 'absolute',
    height: 3,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  cornerV: {
    position: 'absolute',
    width: 3,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#5762FF',
    shadowColor: '#5762FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    top: 22,
  },
  qrPlaceholder: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    opacity: 0.2,
  },
  qrDot: {
    width: '12%',
    aspectRatio: 1,
    borderRadius: 1,
  },
  hint: {
    position: 'absolute',
    bottom: 40,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    textAlign: 'center',
  },
  scanningOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(87,98,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  scanningBadge: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  scanningText: { color: 'white', fontSize: 16, fontWeight: '600' },
  bottomArea: { padding: 16 },
  flowIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 10,
  },
  flowLabel: { color: T.textSec, fontSize: 11, fontWeight: '500' },
  flowBadge: { borderRadius: 20, paddingVertical: 2, paddingHorizontal: 10 },
  flowBadgeText: { fontSize: 11, fontWeight: '700' },
  scanBtn: {
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#5762FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  scanBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
});
