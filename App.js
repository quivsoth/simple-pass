import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withTheme } from 'react-native-paper';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { init, getSites, bulkInsertSiteCredentials } from './src/data/Database';

import { styles } from './src/styles';
import { NavStack } from './src/components/NavStack';
import Footer from './src/components/Footer'
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

const Stack = createNativeStackNavigator();

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

  return (
    <View style={[styles.container, styles.quicksand]} onLayout={onLayoutRootView}>
      <NavigationContainer >
        <NavStack />
        <Footer />
      </NavigationContainer>
    </View>
  );
}

export default withTheme(App);