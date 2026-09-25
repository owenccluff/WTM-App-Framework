import React, { useEffect, useRef } from 'react';
import {
  Animated,
  BackHandler,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../theme/colors';

const PANEL_WIDTH = 300;

/**
 * The menu is an overlay component rather than a route. Animated values are
 * kept in the component so opening/closing does not cause navigator rerenders.
 * A production settings system can replace the placeholder rows with typed
 * preference descriptors and route/account-specific sections.
 */
export default function RightSideMenu({ visible, onClose }) {
  const translateX = useRef(new Animated.Value(PANEL_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      duration: 240,
      toValue: visible ? 0 : PANEL_WIDTH,
      useNativeDriver: true,
    }).start();
  }, [translateX, visible]);

  useEffect(() => {
    if (!visible) return undefined;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => subscription.remove();
  }, [onClose, visible]);

  return (
    <View pointerEvents={visible ? 'box-none' : 'none'} style={StyleSheet.absoluteFill}>
      <Pressable accessibilityLabel="Close menu" onPress={onClose} style={styles.scrim} />
      <Animated.View
        accessibilityViewIsModal
        style={[styles.panel, { transform: [{ translateX }] }]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Menu</Text>
          <Pressable accessibilityLabel="Close menu" hitSlop={10} onPress={onClose}>
            <Ionicons color={colors.text} name="close" size={25} />
          </Pressable>
        </View>
        {['Notifications', 'Saved events', 'Settings', 'Help & feedback'].map((label) => (
          <Pressable
            accessibilityRole="button"
            key={label}
            onPress={() => { /* Wire each item to a feature route or action later. */ }}
            style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
          >
            <Text style={styles.itemText}>{label}</Text>
            <Ionicons color={colors.textSecondary} name="chevron-forward" size={18} />
          </Pressable>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.scrim },
  panel: {
    backgroundColor: colors.surface, elevation: 12, height: '100%', padding: 22,
    position: 'absolute', right: 0, shadowColor: '#000', shadowOffset: { height: 0, width: -4 },
    shadowOpacity: 0.14, shadowRadius: 12, width: PANEL_WIDTH,
  },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22, paddingTop: 26 },
  title: { color: colors.text, fontSize: 25, fontWeight: '700' },
  item: { alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18 },
  itemPressed: { opacity: 0.55 },
  itemText: { color: colors.text, fontSize: 16 },
});
