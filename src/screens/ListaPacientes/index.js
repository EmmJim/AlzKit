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
import BottomMenu from '../../components/BottomMenu';

const ListaPacientes = ({navigation}) => {

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
        <>
            
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
                                style={{marginLeft: 20, flexDirection: 'row', alignItems: 'center', marginTop: 20}}
                            >
                                <Ionicons name="chevron-back" size={30} color="#0b737e" />
                                <Text style={{fontWeight: 'bold', color: '#0b737e'}}>Volver</Text>
                            </TouchableOpacity>
                            <View style={{alignItems: 'center', marginBottom: 20}}>
                                <Text style={{marginTop: 5, fontSize: 23, fontWeight: 'bold', color: '#0b737e'}}>Lista de Pacientes</Text>
                                <Text style={{marginTop: 5, fontSize: 18, fontWeight: 'bold', color: '#0b737e'}}>Cuidador: {usuario?.nombre}</Text>
                            </View>
                        </>
                    }
                    { !usuario ?
                        <ActivityIndicator size="large" color="#ff7ae7" /> 
                    :
                        <>
                        <ScrollView
                            contentContainerStyle={{flexGrow: 1}}
                            keyboardShouldPersistTaps='handled'
                        >
                            <View style={{alignItems: 'center'}}>
                                {usuario?.pacientes?.map(paciente => (
                                    <TouchableOpacity 
                                        key={paciente._id} 
                                        onPress={() =>{}}
                                        style={{backgroundColor: '#ffebfd', padding: 20, width: '80%', marginVertical: 5, borderColor: '#ff7ae7', borderWidth: 2, borderRadius: 10}}
                                    >
                                        <Text style={{color: 'black', fontWeight: 'bold'}}>Nombre: <Text style={{fontWeight: 'normal'}}>{paciente.nombre}</Text></Text>
                                        <Text style={{color: 'black', fontWeight: 'bold'}}>Edad: <Text style={{fontWeight: 'normal'}}>58 años</Text></Text>
                                        <Text style={{color: 'black', fontWeight: 'bold'}}>Teléfono: <Text style={{fontWeight: 'normal'}}>4491567892</Text></Text>
                                    </TouchableOpacity>
                                    
                                ))}
                            </View>
                        </ScrollView>
                            
                        </> 
                    }
                </View>
            <BottomMenu navigation={navigation} tipoUsuario={2} />
            </>
     );
}
 
export default ListaPacientes;