import React, {useState, useEffect} from 'react';
import {
    View, Text, 
    TouchableOpacity, TouchableWithoutFeedback, 
    Keyboard, ScrollView, SafeAreaView, Image
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const Home = () => {
    return ( 
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps='handled'
            >
                <View
                    style={{flex: 1, backgroundColor: 'white', justifyContent: 'space-between'}}
                >
                    <View style={{paddingTop: 10, alignItems: 'center'}}>
                        <Image style={{width: 40, height: 55}} source={require('../../../assets/Logo.png')} />
                        <Text style={{marginTop: 20, fontSize: 20, fontWeight: 'bold', color: '#0b737e'}}>Bienvenido(a) Emmanuel!</Text>
                    </View>
                    <View>
                        <Text>Hola</Text>
                    </View>

                    <View style={{backgroundColor: '#ff7ae7', height: 60, justifyContent: 'center'}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                            <View style={{ alignItems: 'center'}}>
                                <FontAwesome5 name="search-location" size={30} color="white" />
                                <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Localización</Text>
                            </View>
                            <View style={{ alignItems: 'center'}}>
                                <FontAwesome5 name="brain" size={30} color="white" />
                                <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Terapias</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
     );
}
 
export default Home;