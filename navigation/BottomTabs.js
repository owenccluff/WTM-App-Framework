import React, { useCallback, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import MapScreen from '../screens/MapScreen';
import RightSideMenu from '../components/RightSideMenu';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const tabs = [
  { name: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { name: 'Search', icon: 'search-outline', activeIcon: 'search' },
  { name: 'Map', icon: 'map-outline', activeIcon: 'map' },
  // This route is intentionally not registered. Menu is a tab-bar action.
];

/**
 * A custom tab bar gives the fourth item button semantics without adding a
 * fourth route. That keeps the navigation history truthful: opening the menu
 * is an overlay state, not a page transition.
 */
function IconTabBar({ state, descriptors, navigation, onMenuPress }) {
  return (
    <View style={styles.tabBar} accessibilityRole="tablist">
      {tabs.map((tab, index) => {
        const route = state.routes[index];
        const isFocused = state.index === index;
        const options = descriptors[route.key]?.options ?? {};

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={tab.name}
            accessibilityLabel={options.tabBarAccessibilityLabel ?? tab.name}
            accessibilityRole="tab"
            accessibilityState={{ selected: isFocused }}
            hitSlop={8}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Ionicons
              name={isFocused ? tab.activeIcon : tab.icon}
              size={25}
              color={isFocused ? colors.primary : colors.tabInactive}
            />
          </Pressable>
        );
      })}

      <Pressable
        accessibilityLabel="Open menu"
        accessibilityRole="button"
        hitSlop={8}
        onPress={onMenuPress}
        style={styles.tabButton}
      >
        <Ionicons name="menu-outline" size={27} color={colors.tabInactive} />
      </Pressable>
    </View>
  );
}

/**
 * Navigation shell owns overlay state because the menu is visually above the
 * navigator and must remain available regardless of the active page.
 */
export default function BottomTabs() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const openMenu = useCallback(() => setMenuVisible(true), []);
  const closeMenu = useCallback(() => setMenuVisible(false), []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
          }}
          tabBar={(props) => (
            <IconTabBar {...props} onMenuPress={openMenu} />
          )}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
        </Tab.Navigator>
      </NavigationContainer>

      <RightSideMenu visible={isMenuVisible} onClose={closeMenu} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-around',
    paddingBottom: 6,
    paddingTop: 6,
  },
  tabButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
