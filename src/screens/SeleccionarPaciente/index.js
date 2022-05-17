import React, {useState, useEffect} from 'react';
import {
    View, Text, 
    TouchableOpacity, TouchableWithoutFeedback, 
    Keyboard, ScrollView, SafeAreaView, Image, ActivityIndicator
} from 'react-native';
import { FontAwesome5, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerUsuario, logout } from '../../redux/actions/auth';
import { CommonActions, useNavigation } from '@react-navigation/core';
import { obtenerLocalizacionPaciente } from '../../redux/actions/pacientes';
import BottomMenu from '../../components/BottomMenu';

const SeleccionarPaciente = ({navigation}) => {

    const dispatch = useDispatch();
    const {token, usuario} = useSelector(state => state.auth);

    console.log(usuario)

    const cerrarSesion = () => {
        dispatch(logout());
    }

    useEffect(() => {
        if(!token){
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [
                    {name: 'Login'}
                ]
            });
    
            navigation.dispatch(resetAction);
        }
    }, [token])


    return ( 
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps='handled'
            >
                <View
                    style={{flex: 1, backgroundColor: 'white', justifyContent: 'space-between'}}
                >
                    <View style={{paddingTop: 20, justifyContent: 'space-between', flexDirection: 'row', marginLeft: 40, marginRight: 20}}>
                        <Image style={{width: 40, height: 55}} source={require('../../../assets/Logo.png')} />
                        <TouchableOpacity onPress={cerrarSesion}>
                            {usuario?.tipoUsuario === 1 ? 
                                    <View style={{alignItems: 'center'}}>
                                        <MaterialIcons name="logout" size={28} color="#ff7ae7" />
                                        <Text style={{fontSize: 14, fontWeight: 'bold', color: '#ff7ae7'}}>Cerrar Sesion</Text>
                                    </View>
                            :
                                <>
                                    <View style={{alignItems: 'center'}}>
                                        <MaterialIcons name="logout" size={28} color="#58A9B1" />
                                        <Text style={{fontSize: 14, fontWeight: 'bold', color: '#58A9B1'}}>Cerrar Sesion</Text>
                                    </View>
                                </>
                            }
                        </TouchableOpacity>
                    </View>
                    { !usuario ?
                        <ActivityIndicator size="large" color="#ff7ae7" /> 
                    :
                        <>
                            <TouchableOpacity 
                                onPress={() => {
                                    navigation.goBack();
                                }}
                                style={{marginLeft: 20, flexDirection: 'row', alignItems: 'center'}}
                            >
                                <Ionicons name="chevron-back" size={30} color="#0b737e" />
                                <Text style={{fontWeight: 'bold', color: '#0b737e'}}>Volver</Text>
                            </TouchableOpacity>
                            <View style={{alignItems: 'center'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{marginTop: 5, fontSize: 23, fontWeight: 'bold', color: '#0b737e', marginRight: 5}}>Localizar a mi paciente</Text>
                                    <MaterialCommunityIcons name="map-marker-radius" size={40} color="#0b737e" />
                                </View>
                                <Text style={{marginTop: 5, fontSize: 16, fontWeight: 'bold', color: '#0b737e', textAlign: 'center'}}>Selecciona al paciente para obtener su localizacion</Text>
                            </View>
                        </>
                    }
                    { !usuario ?
                        <ActivityIndicator size="large" color="#ff7ae7" /> 
                    :
                        <>
                            <View style={{alignItems: 'center'}}>
                                {usuario?.pacientes?.map(paciente => (
                                    <TouchableOpacity 
                                        key={paciente._id} 
                                        onPress={async() =>{
                                            await dispatch(obtenerLocalizacionPaciente(token.token, paciente._id));
                                            navigation.navigate('MapScreen', {
                                                paciente: paciente.nombre,
                                                direccion: paciente.informacion.direccion
                                            });
                                        }}
                                        style={{backgroundColor: '#58A9B1', padding: 10, width: '80%', marginVertical: 5, borderColor: '#0b737e', borderWidth: 1, borderRadius: 10}}
                                    >
                                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>{paciente.nombre}</Text>
                                    </TouchableOpacity>
                                    
                                ))}
                            </View>

                            <BottomMenu navigation={navigation} tipoUsuario={2} />
                        </> 
                    }
                </View>
            </ScrollView>
     );
}
 
export default SeleccionarPaciente;