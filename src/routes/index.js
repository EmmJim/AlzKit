import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

//Screens
import Login from '../screens/Login';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import ListaPacientes from '../screens/ListaPacientes';
import SeleccionarPaciente from '../screens/SeleccionarPaciente';
import SettingsScreen from '../screens/SettingsScreen';
import MapScreen from '../screens/MapScreen';
import Profile from '../screens/Profile';


const Stack = createStackNavigator();

const AppRoutes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
                initialRouteName="Splash"
            >
                <Stack.Screen 
                    name="Splash"
                    component={Splash}
                />
                <Stack.Screen 
                    name="Login"
                    component={Login}
                />
                <Stack.Screen 
                    name="SignUp"
                    component={SignUp}
                />
                <Stack.Screen 
                    name="Home"
                    component={Home}
                />
                <Stack.Screen 
                    name="ListaPacientes"
                    component={ListaPacientes}
                />
                <Stack.Screen 
                    name="SeleccionarPaciente"
                    component={SeleccionarPaciente}
                />
                <Stack.Screen 
                    name="SettingsScreen"
                    component={SettingsScreen}
                />
                <Stack.Screen 
                    name="MapScreen"
                    component={MapScreen}
                />
                <Stack.Screen 
                    name="Profile"
                    component={Profile}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppRoutes;