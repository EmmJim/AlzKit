import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

//Screens
import Login from '../screens/Login';
import Splash from '../screens/Splash';
import Home from '../screens/Home';

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
                    name="Home"
                    component={Home}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppRoutes;