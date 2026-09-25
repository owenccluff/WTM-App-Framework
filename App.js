import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import BottomTabs from './navigation/BottomTabs';
import { colors } from './theme/colors';

/**
 * App is intentionally a thin composition root. Feature logic belongs below
 * this layer so the app can later add providers (authentication, data cache,
 * analytics, etc.) without coupling them to an individual screen.
 */
export default function App() {
  return (
    <View style={styles.appRoot}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
