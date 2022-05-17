import React, {useEffect, useRef} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

import styles from './styles';
import { DANGER, INFO, SUCCESS, WARNING } from '../../constants/colors';

const types = {
    info: <AntDesign name="infocirlce" size={18} color={INFO} />,
    warning: <AntDesign name="exclamationcircle" size={18} color={WARNING} />,
    error: <AntDesign name="closecircle" size={18} color={DANGER} />,
    success: <AntDesign name="checkcircle" size={18} color={SUCCESS} />,
}

const SnackBar = ({isOpen = false, message = '', type= '', close}) => {

    let timer;

    const animationRef = useRef(new Animated.Value(60)); //Altura del componente

    useEffect(() => {
        if(isOpen){
            handleShowSnackBar();
        }
    }, [isOpen]);

    useEffect(() => {
        return () => clearTimeout(timer);
    }, []);

    const handleShowSnackBar = () => {
        Animated.timing(
            animationRef.current,
            {
                toValue: -10,
                duration: 300,
                useNativeDriver: true
            }
        ).start(() => handleHideSnackBar());
    };

    const handleHideSnackBar = () => {
        timer = setTimeout(() => {
            Animated.timing(
                animationRef.current,
                {
                    toValue: 60, //Altura del componente
                    duration: 300,
                    useNativeDriver: true
                }
            ).start(() => {
                clearTimeout(timer);
                close();
            });
        }, 5000);
    };

    const handleCloseSnackBar = () => {
        clearTimeout(timer);
        Animated.timing(
            animationRef.current,
            {
                toValue: 60, //Altura del componente
                duration: 300,
                useNativeDriver: true
            }
        ).start(() => close());
    };

    return (  
        <Animated.View style={{
            ...styles.principalContainer,
            transform: [{translateY: animationRef.current}]
        }}>
            <View style={styles.content}>
                <View style={styles.messageContainer}>
                    {types[type]}
                    <Text
                        style={styles.message}
                        numberOfLines={2}
                    >
                        {message}
                    </Text>
                </View>
                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        onPress={handleCloseSnackBar}
                    >
                        <Text style={styles.actionText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
}
 
export default SnackBar;