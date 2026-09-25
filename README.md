# WTM App Framework

Starter cross-platform React Native event app using React Navigation, an icon-only bottom tab bar, and an animated right-side menu.

## Prerequisites

- Node.js LTS and npm
- React Native development environment configured for the target platform
  - Android Studio, Android SDK, and an Android emulator/device for Android
  - Xcode and CocoaPods for iOS on macOS

## Install dependencies

From the project root:

```bash
npm install
```

## Start the JavaScript bundler

```bash
npm start
```

Keep Metro running while launching the app from a second terminal.

## Run on Android

With an emulator running or an Android device connected:

```bash
npx react-native run-android
```

## Run on iOS

On macOS, install native iOS dependencies first:

```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

## Project note

This starter currently contains the shared React Native JavaScript source. If the repository does not yet contain native `android/` and `ios/` directories, create a React Native CLI project shell first or copy these source files into an existing React Native application before running the platform commands above.

## Main folders

- `screens/` — Home, Search, and Map pages
- `components/` — reusable skeleton card and animated menu
- `navigation/` — bottom tab navigation shell
- `theme/` — centralized color palette
