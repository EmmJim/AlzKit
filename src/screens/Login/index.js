import React, {useState, useEffect} from 'react';
import {
    View, Text, 
    TouchableOpacity, TouchableWithoutFeedback, 
    Keyboard, ScrollView, SafeAreaView, Image, TextInput, Button
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const Login = ({navigation}) => {
    const [user, setUser] = useState({
        name: '',
        password: ''
    })


    const handleOnChange = (target, value) => {
        setUser( prevValues => ({
            ...prevValues,
            [target]: value
        }))
    }

    const handleOnSubmit = () => {
        if(user.name === 'Said' && user.password === '123'){
            navigation.navigate('Home');
        }
    } 
    // setTimeout(() => {
    //     navigation.navigate('Home');
    // }, 2000);
    return ( 
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps='handled'
            >
                <View
                    style={{flex: 1, backgroundColor: 'white', justifyContent: 'space-between'}}
                >
                    <Animatable.View style={{paddingTop: 80, alignItems: 'center', marginBottom: 80}} animation="fadeInDownBig">
                        <Image style={{width: 85, height: 113}} source={require('../../../assets/Logo.png')} />
                    </Animatable.View>
                    <Animatable.View 
                        style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center', 
                            backgroundColor: '#ff7ae7', 
                            height: '50%',
                            borderTopRightRadius: 80,
                            shadowColor: 'black',
                            shadowOffset: {width: 10, height: -4},
                            shadowRadius: 3,
                            shadowOpacity: 0.8,
                            elevation: 50,
                            paddingLeft: 30
                        }}
                        animation="fadeInUpBig"
                        delay={1000}
                    >
                        <View style={{flexDirection: 'row', marginVertical: 15, alignItems: 'center'}}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 40}}>Usuario:</Text>
                            <TextInput placeholder='Tu Usuario' onChangeText={value => handleOnChange('name', value)} style={{backgroundColor: 'white', borderRadius: 10, paddingVertical: 3, paddingHorizontal: 10, width: '60%'}}></TextInput>
                        </View>
                        <View style={{flexDirection: 'row', marginVertical: 15, alignItems: 'center'}}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16,  marginRight: 15}}>Contraseña:</Text>
                            <TextInput placeholder='Tu Contraseña' onChangeText={value => handleOnChange('password', value)} style={{backgroundColor: 'white', borderRadius: 10, paddingVertical: 3, paddingHorizontal: 10, width: '60%'}}></TextInput>
                        </View>
                        <View style={{marginTop: 40, width: '40%', marginLeft: 85}}>
                            <TouchableOpacity
                                style={{backgroundColor: '#fff', padding: 12, borderRadius: 20, alignItems: 'center'}}
                                onPress={handleOnSubmit}
                            >
                                <Text style={{fontWeight: 'bold', color: '#0b737e'}}>Iniciar Sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </View>
            </ScrollView>
     );
}
 
export default Login;