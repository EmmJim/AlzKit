import React, { useState, useEffect } from 'react';
import {View, Text, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';


import styles from './styles';


const Splash = ({navigation}) => {

    setTimeout(() => {
        navigation.navigate('Login');
    }, 3000);

    return (  
        <Animatable.View 
            style={styles.principalContainer}
            animation="pulse"
            easing="ease-out" 
            iterationCount="infinite"
        >
            <Image style={styles.logo} source={require('../../../assets/Logo.png')} />
        </Animatable.View>
    );
}
 
export default Splash;