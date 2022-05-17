import React, {useState, useEffect} from 'react';
import {
    View, Text, 
    TouchableOpacity, TouchableWithoutFeedback, 
    Keyboard, ScrollView, SafeAreaView, Image, TextInput, Button, Switch
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { CommonActions, useNavigation } from '@react-navigation/core';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/actions/usuarios';


//Hooks
import {useSnackBar} from '../../hooks/useSnackBar';


const SignUp = ({navigation}) => {
    const snackbar = useSnackBar();
    const dispatch = useDispatch();
    const {error, mensaje, screen} = useSelector(state => state.usuarios);

    const [formValues, setFormValues] = useState({
        nombre: '',
        email: '',
        password: '',
        tipoUsuario: null
    })

    const [showPass, setShowPass] = useState(true);


    const handleOnChange = (target, value) => {
        setFormValues( prevValues => ({
            ...prevValues,
            [target]: value
        }))
    }

    const handleOnPressPaciente = () => {
        setFormValues({
            ...formValues,
            tipoUsuario: 1
        })
    }
    const handleOnPressCuidador = () => {
        setFormValues({
            ...formValues,
            tipoUsuario: 2
        })
    }

    const handleOnSubmit = async() => {
        if(formValues.nombre === '' && formValues.email === '' && formValues.password === '' && formValues.tipoUsuario === null){
            snackbar('Todos los campos son obligatorios', 'error');
        }else{
            dispatch(signUp(formValues));
        }
    } 
    // setTimeout(() => {
    //     navigation.navigate('Home');
    // }, 2000);

    useEffect(() => {
        if(screen !== null){
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [
                    {name: `${screen}`}
                ]
            });
        
            navigation.dispatch(resetAction);
        }
    }, [screen]);

    useEffect(() => {
        if(mensaje !== null){
            snackbar(mensaje, 'success');
        }
    }, [mensaje]);
    
    useEffect(() => {
        if(error !== null){
            snackbar(error.message, error.type);
        }
    },[error]);

    return ( 
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps='handled'
            >
                <View
                    style={{flex: 1, backgroundColor: 'white', justifyContent: 'space-between'}}
                >
                    <Animatable.View style={{paddingTop: 80, alignItems: 'center', marginBottom: 80}} animation="zoomIn">
                        <Image style={{width: 60, height: 80}} source={require('../../../assets/Logo.png')} />
                    </Animatable.View>
                    <Animatable.View 
                        style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center', 
                            backgroundColor: '#ff7ae7', 
                            height: '70%',
                            borderTopRightRadius: 80,
                            shadowColor: 'black',
                            shadowOffset: {width: 10, height: -4},
                            shadowRadius: 3,
                            shadowOpacity: 0.8,
                            elevation: 50,
                            paddingLeft: 20
                        }}
                        animation="fadeInUp"
                    >
                        <View style={{flexDirection: 'row', marginVertical: 15, alignItems: 'center'}}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 38}}>Nombre:</Text>
                            <TextInput placeholder='Tu Nombre' onChangeText={value => handleOnChange('nombre', value)} style={{backgroundColor: 'white', borderRadius: 10, paddingVertical: 3, paddingHorizontal: 10, width: '55%', marginRight: 10}}></TextInput>
                            <FontAwesome5 name="user-alt" size={22} color="white" />
                        </View>
                        <View style={{flexDirection: 'row', marginVertical: 15, alignItems: 'center'}}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 52}}>Email:</Text>
                            <TextInput placeholder='Tu Email' onChangeText={value => handleOnChange('email', value)} style={{backgroundColor: 'white', borderRadius: 10, paddingVertical: 3, paddingHorizontal: 10, width: '55%', marginRight: 10}}></TextInput>
                            <Ionicons name="ios-mail-sharp" size={22} color="white" />
                        </View>
                        <View style={{flexDirection: 'row', marginVertical: 15, alignItems: 'center'}}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16,  marginRight: 15}}>Contraseña:</Text>
                            <TextInput placeholder='Tu Contraseña' onChangeText={value => handleOnChange('password', value)} style={{backgroundColor: 'white', borderRadius: 10, paddingVertical: 3, paddingHorizontal: 10, width: '55%', marginRight: 8}} secureTextEntry={showPass}></TextInput>
                            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                                <Ionicons name={showPass === true ? "eye" : "eye-off"} size={28} color="white" />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{marginVertical: 20, flexDirection: 'row', alignItems: 'center', marginLeft: 100}}>
                            <TouchableOpacity
                                onPress={handleOnPressPaciente}
                            >
                                <Text style={formValues.tipoUsuario === 1 ? {backgroundColor: '#01dafd', borderTopLeftRadius: 50, borderBottomLeftRadius: 50,
                                    padding: 10,
                                    color: 'black'} : {backgroundColor: 'white', borderTopLeftRadius: 50, borderBottomLeftRadius: 50,
                                    padding: 10,
                                    color: 'black'}}
                                >Paciente</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleOnPressCuidador}
                            >
                                <Text style={formValues.tipoUsuario === 2 ? {backgroundColor: '#01dafd',
                                    borderTopRightRadius: 50,
                                    borderBottomRightRadius: 50,
                                    padding: 10,
                                    color: 'black'} : {backgroundColor: 'white', borderTopRightRadius: 50, borderBottomRightRadius: 50,
                                    padding: 10,
                                    color: 'black'}}
                                >Cuidador</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{marginTop: 10, marginLeft: 70}}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Login');
                            }}>
                                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>¿Ya tienes cuenta? Inicia Sesión</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{marginTop: 40, marginBottom: 30, width: '40%', marginLeft: 100}}>
                            <TouchableOpacity
                                style={{backgroundColor: '#fff', padding: 12, borderRadius: 20, alignItems: 'center'}}
                                onPress={handleOnSubmit}
                            >
                                <Text style={{fontWeight: 'bold', color: 'black'}}>Registrar mi cuenta</Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </View>
            </ScrollView>
     );
}
 
export default SignUp;