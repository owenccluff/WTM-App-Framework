import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../theme/colors';

const RESULTS = [
  { id: '1', title: 'Community design workshop', meta: 'Tomorrow · Downtown' },
  { id: '2', title: 'Open-air film night', meta: 'Friday · Riverside Park' },
  { id: '3', title: 'Local makers market', meta: 'Saturday · Arts District' },
];

/**
 * Search is deliberately UI-first. Later, debounce the query and send both
 * query + filter to the backend; server-side filtering prevents stale results
 * and keeps this screen fast as the event catalog grows.
 */
export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All events');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.controls}>
          <View style={styles.searchBox}>
            <Ionicons color={colors.textSecondary} name="search-outline" size={20} />
            <TextInput
              accessibilityLabel="Search events"
              onChangeText={setQuery}
              placeholder="Search events"
              placeholderTextColor={colors.textSecondary}
              style={styles.input}
              value={query}
            />
          </View>
          <Pressable
            accessibilityLabel="Choose event filter"
            accessibilityRole="button"
            onPress={() => setFilter(filter === 'All events' ? 'Nearby' : 'All events')}
            style={styles.filterButton}
          >
            <Text numberOfLines={1} style={styles.filterText}>{filter}</Text>
            <Ionicons color={colors.text} name="chevron-down" size={16} />
          </Pressable>
        </View>
        <FlatList
          contentContainerStyle={styles.results}
          data={RESULTS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.resultRow}>
              <View style={styles.resultIcon}>
                <Ionicons color={colors.primary} name="calendar-outline" size={22} />
              </View>
              <View style={styles.resultCopy}>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <Text style={styles.resultMeta}>{item.meta}</Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  container: { flex: 1, padding: 16 },
  title: { color: colors.text, fontSize: 28, fontWeight: '700', marginBottom: 18 },
  controls: { flexDirection: 'row', gap: 8 },
  searchBox: {
    alignItems: 'center', backgroundColor: colors.surfaceMuted, borderRadius: 12,
    flex: 1, flexDirection: 'row', paddingHorizontal: 12,
  },
  input: { color: colors.text, flex: 1, fontSize: 15, marginLeft: 8, minHeight: 46 },
  filterButton: {
    alignItems: 'center', backgroundColor: colors.surfaceMuted, borderRadius: 12,
    flexDirection: 'row', maxWidth: 125, paddingHorizontal: 12,
  },
  filterText: { color: colors.text, fontSize: 12, marginRight: 4 },
  results: { paddingTop: 22 },
  resultRow: {
    alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: 1,
    flexDirection: 'row', paddingVertical: 15,
  },
  resultIcon: {
    alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 12,
    height: 44, justifyContent: 'center', width: 44,
  },
  resultCopy: { flex: 1, marginLeft: 12 },
  resultTitle: { color: colors.text, fontSize: 16, fontWeight: '600' },
  resultMeta: { color: colors.textSecondary, fontSize: 13, marginTop: 4 },
});
