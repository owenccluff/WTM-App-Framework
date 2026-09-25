import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../theme/colors';

/**
 * SkeletonEventCard owns only the visual loading contract. Keeping it separate
 * makes it easy to swap in EventCard later without changing FlatList behavior.
 */
export default function SkeletonEventCard() {
  return (
    <View accessibilityLabel="Loading event" accessibilityRole="progressbar" style={styles.card}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.copy}>
        <View style={[styles.line, styles.titleLine]} />
        <View style={[styles.line, styles.metaLine]} />
        <View style={[styles.line, styles.shortLine]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 16, flexDirection: 'row', marginBottom: 14, overflow: 'hidden', padding: 12 },
  imagePlaceholder: { backgroundColor: colors.skeleton, borderRadius: 10, height: 90, width: 92 },
  copy: { flex: 1, justifyContent: 'center', marginLeft: 13 },
  line: { backgroundColor: colors.skeleton, borderRadius: 5, height: 11, marginBottom: 10 },
  titleLine: { width: '84%' },
  metaLine: { width: '62%' },
  shortLine: { marginBottom: 0, width: '38%' },
});
