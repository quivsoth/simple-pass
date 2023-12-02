
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon, withTheme } from 'react-native-paper';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import { init, getSites, insertSiteCredentials } from './Database';

import { styles } from './styles';
// import FrontPage from './FrontPage';
import Search from './Search';
import AddSite from './AddSite';
import ResultItem from './ResultItem';
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*


const Stack = createNativeStackNavigator();

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function App() {

  const [fontsLoaded] = useFonts({ 'Quicksand': require('./assets/fonts/Quicksand-Regular.ttf'), });

  const onLayoutRootView = React.useCallback(async () => {

    // TODO ONE TIME INIT ONLY
    //await init();
    //await insertSiteCredentials();


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
              headerStyle: {
                backgroundColor: '#4d089a',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
          {/* <Stack.Screen name="ResultItem" component={ResultItem} options={{
            title: 'Site',
            headerStyle: {
              backgroundColor: '#4d089a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-back-sharp"
                  size={22}
                />
              </TouchableOpacity>
            ),
          }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default withTheme(App);