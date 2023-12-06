import * as React from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { styles } from './src/styles';
import { withTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import { init, getSites, bulkInsertSiteCredentials } from './src/data/Database';
import { SearchNavStack, AddSiteNavStack, ProfileNavStack, SettingsNavStack } from './src/stacks/NavStack';
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

const Tab = createBottomTabNavigator();
//const Tab = createMaterialBottomTabNavigator();

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function App() {

  const [fontsLoaded] = useFonts({ 'Quicksand': require('./assets/fonts/Quicksand-Regular.ttf'), });

  const renderItem = ({ item }) => {
    return (
      <SearchResultItem item={item} onPress={() => { navigation.navigate('ResultItem', { item }) }} />
    );
  };

  const onLayoutRootView = React.useCallback(async () => {

    // TODO ONE TIME INIT ONLY
    await init();
    //await bulkInsertSiteCredentials();
    if (fontsLoaded) { await SplashScreen.hideAsync(); }
  }, [fontsLoaded]);
  if (!fontsLoaded) { return null; }

  const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};
  
  return (
    <View style={[styles.container, styles.quicksand]} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Feed"
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
  );
}

export default withTheme(App);