import React, { useState, useEffect } from 'react';
import {View, Text, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {reopenApp} from '../../redux/actions/auth';
import { CommonActions, useNavigation } from '@react-navigation/core';

//Redux
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';


const Splash = ({navigation}) => {

    const dispatch = useDispatch();
    const {error, screen, token} = useSelector(state => state.auth);

    // setTimeout(() => {
    //     navigation.navigate('Login');
    // }, 3000);

    useEffect(() => {
        if(screen){
            //Dirigir al usuario a Home
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [
                    {name: `${screen}`}
                ]
            });

            navigation.dispatch(resetAction);
        }
    }, [screen]);

    async function getTokenFunction() {
        dispatch(reopenApp());
    }

    getTokenFunction();

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