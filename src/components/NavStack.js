
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Search from '../Search';
import AddSite from '../AddSite';
import ResultItem from '../ResultItem';



export const NavStack = () => {
    return (
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
    )
}