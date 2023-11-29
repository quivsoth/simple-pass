
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withTheme } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';

import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { useFonts } from 'expo-font';

import { styles } from './styles';

// import FrontPage from './FrontPage';
import Search from './Search';
import AddSite from './AddSite';
import ResultItem from './ResultItem';
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

async function copyPrepopDB() {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync(Asset.fromModule(require("./assets/database/arcticfox.db")).uri, FileSystem.documentDirectory + 'SQLite/arcticfox.db')
  return SQLite.openDatabase('arcticfox.db');
}

const Stack = createNativeStackNavigator();

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function App() {

  const [fontsLoaded] = useFonts({ 'Quicksand': require('./assets/fonts/Quicksand-Regular.ttf'),});

  const onLayoutRootView = React.useCallback(async () => {
    copyPrepopDB();
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
          <Stack.Screen name="ResultItem" component={ResultItem} options={{
            title: 'Site',
            headerStyle: {
              backgroundColor: '#4d089a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default withTheme(App);