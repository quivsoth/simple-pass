import * as React from 'react';
import { View } from 'react-native';
import { MD3DarkTheme, MD3LightTheme as DefaultTheme, PaperProvider, withTheme } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SearchNavStack, AddSiteNavStack, ProfileNavStack, SettingsNavStack } from './src/stacks/NavStack';

import { styles } from './src/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

import { useStore } from './src/store';
import { shallow } from 'zustand/shallow';
import { init, getSites, bulkInsertSiteCredentials } from './src/data/Database';
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

const Tab = createBottomTabNavigator();
//const Tab = createMaterialBottomTabNavigator();

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function App() {

  const { addItem } = useStore(({ addItem }) => ({ addItem }), shallow);
  const [fontsLoaded] = useFonts({ 'Quicksand': require('./assets/fonts/Quicksand-Regular.ttf'), });

  const theme = {
    ...DefaultTheme,
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
      heroColor: '#e91e63',
    },
  };

  // const { theme } = useMaterial3Theme();
  // const paperTheme = { ...DefaultTheme, colors: theme.dark };

  const onLayoutRootView = React.useCallback(async () => { 
    await init().then(
      getSites().then(result => result.map(item => addItem(item)))
    );
    //await bulkInsertSiteCredentials();
    if (fontsLoaded) { await SplashScreen.hideAsync(); }
  }, [fontsLoaded]);
  if (!fontsLoaded) { return null; }

  const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

  return (
    <PaperProvider theme={theme}>

      <View style={[styles.container, styles.quicksand]} onLayout={onLayoutRootView}>

        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="NavStack"
            activeColor="#e91e63"
            // barStyle={{ backgroundColor: 'tomato' }}
            screenOptions={{ headerShown: false, }}
          >
            <Tab.Screen
              name="NavStack"
              component={SearchNavStack}
              options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="magnify" color={color} size={size} />
                ),
              }}
            />

            <Tab.Screen
              name="AddCredentialsStack"
              component={AddSiteNavStack}
              options={{
                tabBarLabel: 'Add Credentials',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="plus" color={color} size={size} />
                ),
              }}
            />

            <Tab.Screen
              name="ProfileStack"
              component={ProfileNavStack}
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
              }}
            />

            <Tab.Screen
              name="SettingsStack"
              component={SettingsNavStack}
              options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>

    </PaperProvider>
  );
}

export default withTheme(App);