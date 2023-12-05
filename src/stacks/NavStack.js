
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Search from '../screens/Search';
import AddSite from '../screens/AddSite';
import ResultItem from '../components/ResultItem';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';

export const SearchNavStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={Search} options={{
                title: '',
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
                options={() => (
                    {
                        title: 'Site Credentials',
                        headerStyle: {
                            backgroundColor: '#4d089a',                            
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            //fontFamily: 'Quicksand'
                        },
                        headerBackTitle: 'Search',
                    }
                )}
            />
        </Stack.Navigator>
    )
}

export const AddSiteNavStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AddSite" component={AddSite} options={{
                title: 'Add Credentials',
                headerStyle: {
                    backgroundColor: '#4d089a',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </Stack.Navigator>
    )
}

export const ProfileNavStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} options={{
                title: 'Profile',
                headerStyle: {
                    backgroundColor: '#4d089a',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </Stack.Navigator>
    )
}

export const SettingsNavStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={Settings} options={{
                title: 'Settings',
                headerStyle: {
                    backgroundColor: '#4d089a',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </Stack.Navigator>
    )
}