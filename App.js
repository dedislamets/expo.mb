import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import {store} from "./src/redux";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/router";
import Home from './src/pages/Home';
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LogLevel, OneSignal } from 'react-native-onesignal';
import Constants from "expo-constants";

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000); 



OneSignal.Debug.setLogLevel(LogLevel.Verbose);
OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);

// Also need enable notifications to complete OneSignal setup
OneSignal.Notifications.requestPermission(true);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Router/>
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
