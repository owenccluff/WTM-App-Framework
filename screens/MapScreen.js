import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../theme/colors';

/**
 * Map integration is intentionally deferred. The placeholder establishes the
 * layout contract for a future react-native-maps MapView and overlay controls.
 */
export default function MapScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Map</Text>
        <View style={styles.mapPlaceholder}>
          {/* Mount <MapView style={StyleSheet.absoluteFillObject} /> here later. */}
          <Ionicons color={colors.primary} name="location-outline" size={42} />
          <Text style={styles.placeholderTitle}>Map coming soon</Text>
          <Text style={styles.placeholderBody}>
            Event pins and location-based discovery will live in this space.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  container: { flex: 1, padding: 16 },
  title: { color: colors.text, fontSize: 28, fontWeight: '700', marginBottom: 18 },
  mapPlaceholder: {
    alignItems: 'center', backgroundColor: colors.surfaceMuted, borderRadius: 20,
    flex: 1, justifyContent: 'center', padding: 32,
  },
  placeholderTitle: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: 12 },
  placeholderBody: { color: colors.textSecondary, fontSize: 14, lineHeight: 20, marginTop: 8, textAlign: 'center' },
});
