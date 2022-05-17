import React, {useState, useEffect} from 'react';
import {
    View, Text, 
    TouchableOpacity, TouchableWithoutFeedback, 
    Keyboard, ScrollView, SafeAreaView, Image, ActivityIndicator
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { FontAwesome5, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerUsuario, logout } from '../../redux/actions/auth';
import { guardarLocalizacionPaciente } from '../../redux/actions/pacientes';
import { CommonActions, useNavigation } from '@react-navigation/core';

const BottomMenu = ({navigation, tipoUsuario}) => {
    return (  
        <View style={{backgroundColor: '#ff7ae7', height: 70, justifyContent: 'center'}}>
            {tipoUsuario === 1 ? 
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <View style={{ alignItems: 'center'}}>
                        <FontAwesome5 name="search-location" size={28} color="white" />
                        <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Localización</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                        style={{ alignItems: 'center'}}
                    >
                        <MaterialCommunityIcons name="home" size={28} color="white" />
                        <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Inicio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate('Profile');
                        }}
                        style={{ alignItems: 'center'}}
                    >
                        <FontAwesome5 name="user-alt" size={25} color="white" />
                        <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Mi Perfil</Text>
                    </TouchableOpacity>
                </View>
            : 
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <View style={{ alignItems: 'center'}}>
                        <FontAwesome5 name="search-location" size={30} color="white" />
                        <Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>Buscar paciente</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Home');
                        }}
                        style={{ alignItems: 'center'}}
                    >
                        <MaterialCommunityIcons name="home" size={28} color="white" />
                        <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Inicio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate('Profile');
                        }}
                        style={{ alignItems: 'center'}}
                    >
                        <FontAwesome5 name="user-alt" size={28} color="white" />
                        <Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>Mi Perfil</Text>
                    </TouchableOpacity>
                </View>       
            }
            
        </View>
    );
}
 
export default BottomMenu;