import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../Home';
import SettingsScreen from '../SettingsScreen';

const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
        </Drawer.Navigator>
    )
}