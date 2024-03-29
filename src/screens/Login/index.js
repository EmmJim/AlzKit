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
import { login } from '../../redux/actions/auth';
import {signUpReset} from '../../redux/actions/usuarios'


//Hooks
import {useSnackBar} from '../../hooks/useSnackBar';


const Login = ({navigation}) => {
    const snackbar = useSnackBar();
    const dispatch = useDispatch();
    const {error, token} = useSelector(state => state.auth);
    const {mensaje} = useSelector(state => state.usuarios);
    console.log(token);
    console.log(error);

    const [formValues, setFormValues] = useState({
        nombre: '',
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
        if(formValues.nombre === '' && formValues.password === '' && formValues.tipoUsuario === null){
            snackbar('Todos los campos son obligatorios', 'error');
        }else{
            dispatch(login(formValues));
        }
    } 
    // setTimeout(() => {
    //     navigation.navigate('Home');
    // }, 2000);

    useEffect(() => {
        if(token){
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [
                    {name: `Home`}
                ]
            });
        
            navigation.dispatch(resetAction);
        }
    }, [token]);

    useEffect(() => {
        if(error && Object.keys(error).length > 0){
            snackbar(error.message, error.type);
        }
    }, [error]);


    useEffect(() => {
        dispatch(signUpReset());
    }, []);

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
                            height: '60%',
                            borderTopRightRadius: 80,
                            shadowColor: 'black',
                            shadowOffset: {width: 10, height: -4},
                            shadowRadius: 3,
                            shadowOpacity: 0.8,
                            elevation: 50,
                            paddingLeft: 20
                        }}
                        animation="fadeInUpBig"
                        delay={1000}
                    >
                        <View style={{flexDirection: 'row', marginVertical: 15, alignItems: 'center'}}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, marginRight: 40}}>Nombre:</Text>
                            <TextInput placeholder='Tu Nombre' onChangeText={value => handleOnChange('nombre', value)} style={{backgroundColor: 'white', borderRadius: 10, paddingVertical: 3, paddingHorizontal: 10, width: '55%', marginRight: 10}}></TextInput>
                            <FontAwesome5 name="user-alt" size={22} color="white" />
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

                        <View style={{marginTop: 10, marginLeft: 50}}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('SignUp');
                            }}>
                                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>¿Aún no tienes cuenta? Registrate Aquí</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{marginTop: 40, width: '40%', marginLeft: 100}}>
                            <TouchableOpacity
                                style={{backgroundColor: '#fff', padding: 12, borderRadius: 20, alignItems: 'center'}}
                                onPress={handleOnSubmit}
                            >
                                <Text style={{fontWeight: 'bold', color: 'black'}}>Iniciar Sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </View>
            </ScrollView>
     );
}
 
export default Login;