
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withTheme } from 'react-native-paper';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { init, getSites, bulkInsertSiteCredentials } from './src/data/Database';



import { styles } from './src/styles';
// import FrontPage from './FrontPage';
import Search from './src/Search';
import AddSite from './src/AddSite';
import ResultItem from './src/ResultItem';
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*


const Stack = createNativeStackNavigator();

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function App() {

  const [fontsLoaded] = useFonts({ 'Quicksand': require('./assets/fonts/Quicksand-Regular.ttf'), });

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
        <Stack.Navigator>
          <Stack.Screen name="Search" component={Search} options={{
            title: 'Search',
            headerStyle: {
              backgroundColor: '#4d089a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          <Stack.Screen name="AddSite" component={AddSite} options={{
            title: 'Add Site',
            headerStyle: {
              backgroundColor: '#4d089a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          <Stack.Screen
            name='ResultItem'
            component={ResultItem}
            options={({ navigation, route }) => ({
              title: 'Site Credentials',
              headerStyle: {
                backgroundColor: '#4d089a',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default withTheme(App);