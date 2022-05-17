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
//Components
import BottomMenu from '../../components/BottomMenu';

const Profile = ({navigation}) => {

    const dispatch = useDispatch();
    const {token, usuario} = useSelector(state => state.auth);


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
                                <Text style={{marginTop: 5, fontSize: 25, fontWeight: 'bold', color: '#0b737e'}}>Mi Perfil</Text>
                            </View>
                        </>
                    }
                    { !usuario ?
                        <ActivityIndicator size="large" color="#ff7ae7" /> 
                    :
                        usuario?.tipoUsuario === 1 ? 
                        
                            <>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 7}}>Mi Nombre: <Text style={{color: '#ff7ae7', fontSize: 20}}>{usuario.nombre}</Text></Text>
                                    <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 7}}>Mi Edad: <Text style={{color: '#ff7ae7', fontSize: 20}}>60 años</Text></Text>
                                    <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 7}}>Mi Domicilio:</Text>
                                    <Text style={{color: '#ff7ae7', fontSize: 20, fontWeight: 'bold', marginBottom: 7}}>C. Artemis 229 Fracc. Los Ángeles</Text>
                                    <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 7}}>Mi Cuidador: <Text style={{color: '#ff7ae7', fontSize: 20}}>David</Text></Text>
                                    <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 7}}>Telefono de mi cuidador: <Text style={{color: '#ff7ae7', fontSize: 20}}>4492847821</Text></Text>
                                </View>
                                <BottomMenu navigation={navigation} tipoUsuario={1} />
                            </> 
                        
                        :   
                        
                        <>
                            <View style={{alignItems: 'center'}}>
                                <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 7}}>Nombre: <Text style={{color: '#ff7ae7', fontSize: 20}}>{usuario.nombre}</Text></Text>
                                <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 7}}>Edad: <Text style={{color: '#ff7ae7', fontSize: 20}}>38 años</Text></Text>
                                <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 7}}>Numero de Pacientes: <Text style={{color: '#ff7ae7', fontSize: 20}}>{usuario.pacientes.length}</Text></Text>
                            </View>
                            <BottomMenu navigation={navigation} tipoUsuario={2} />
                        </>
                        
                        
                    }
                </View>
            </ScrollView>
     );
}
 
export default Profile;