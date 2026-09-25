import React, { useCallback, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SkeletonEventCard from '../components/SkeletonEventCard';
import { colors } from '../theme/colors';

const INITIAL_ITEMS = Array.from({ length: 8 }, (_, index) => ({
  id: `skeleton-event-${index}`,
}));

/**
 * Feed responsibilities stay local to the screen while the eventual data
 * layer can be swapped in later. A cursor-based API should append the next
 * page from onEndReached and expose loading/error/empty states separately.
 */
export default function HomeScreen() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [isRefreshing, setRefreshing] = useState(false);

  const loadNextPage = useCallback(() => {
    // Replace this demo append with a guarded request such as:
    // fetchEvents({ cursor: nextCursor }).then(page => setItems(current => [...current, ...page.items])).
    // Keep request de-duplication and cursor ownership in a query/cache layer
    // once the app has real event data.
    setItems((current) => [
      ...current,
      ...Array.from({ length: 4 }, (_, index) => ({
        id: `skeleton-event-${current.length + index}`,
      })),
    ]);
  }, []);

  const refresh = useCallback(() => {
    setRefreshing(true);
    // A real implementation would invalidate the feed query and reset the
    // cursor after the first page succeeds.
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.content}
        data={items}
        keyExtractor={(item) => item.id}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.5}
        refreshControl={(
          <RefreshControl
            colors={[colors.primary]}
            onRefresh={refresh}
            refreshing={isRefreshing}
            tintColor={colors.primary}
          />
        )}
        renderItem={({ item }) => <SkeletonEventCard key={item.id} />}
        ListHeaderComponent={(
          <View style={styles.header}>
            <Text style={styles.title}>Discover events</Text>
            <Text style={styles.subtitle}>Find something worth showing up for.</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        // FlatList virtualization keeps long feeds memory-efficient on mobile.
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { padding: 16, paddingBottom: 24 },
  header: { paddingBottom: 18, paddingTop: 8 },
  title: { color: colors.text, fontSize: 28, fontWeight: '700' },
  subtitle: { color: colors.textSecondary, fontSize: 15, marginTop: 6 },
});
