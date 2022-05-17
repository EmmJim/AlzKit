import React, {useState, useEffect, useRef} from 'react';
import {
    View, Text, 
    TouchableOpacity, TouchableWithoutFeedback, 
    Keyboard, ScrollView, SafeAreaView, Image, ActivityIndicator
} from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { FontAwesome5, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerUsuario, logout } from '../../redux/actions/auth';
import { guardarLocalizacionPaciente, guardarPushToken } from '../../redux/actions/pacientes';
import { CommonActions, useNavigation } from '@react-navigation/core';
import { io } from 'socket.io-client';

//Hooks
import {useSnackBar} from '../../hooks/useSnackBar';
import BottomMenu from '../../components/BottomMenu';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://192.168.100.4:4000';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const Home = ({navigation}) => {

    const dispatch = useDispatch();
    const snackbar = useSnackBar();
    const {token, usuario} = useSelector(state => state.auth);

    const socket = io(API_URL);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
    
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(async() => {
        if(usuario !== null){

            socket.on('connect', () => {
                socket.emit('conectado', {usuario: usuario._id})
            })
        
            socket.on('enviar-localizacion', async (payload) => {
                console.log(payload);
                await getLocation();
                await dispatch(guardarLocalizacionPaciente(token.token, location.coords, usuario._id));
                snackbar('Tu paciente, te ha enviado la localización', 'success');
            })
        }
    }, [usuario])

    useEffect(async() => {
        if(expoPushToken !== null){
            await dispatch(guardarPushToken(token.token, expoPushToken, usuario?._id));
        }
    }, [expoPushToken])


    //Localizacion

    const [location, setLocation] = useState({});
    const [address, setAddress] = useState({});

    console.log(address);

    const getLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();

        if(status !== 'granted'){
            console.log('Permission not granted');
            return;
        }

        let userLocation = await Location.getCurrentPositionAsync({});
        // console.log(userLocation)

        setLocation(userLocation);

        let {coords} = userLocation;

        if(coords){
            let { longitude, latitude } = coords;

            let regionName = await Location.reverseGeocodeAsync({
                longitude,
                latitude,
            });
            setAddress(regionName[0]);
        }
        // console.log(location)
    }
    

    const cerrarSesion = () => {
        dispatch(logout());
    }

    useEffect(async() => {
        await dispatch(obtenerUsuario(token.token));
        await getLocation();
    }, [])

    useEffect(() => {
        if(usuario !== null && location !== null && address !== null){
            dispatch(guardarLocalizacionPaciente(token.token, location.coords, address, usuario._id));
        }
    }, [location])

    useEffect(() => {
        if(!token){
            socket.off();

            const resetAction = CommonActions.reset({
                index: 0,
                routes: [
                    {name: 'Login'}
                ]
            });
    
            navigation.dispatch(resetAction);
        }
    }, [token])

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
            }
            if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
            
        } else {
            alert('Must use physical device for Push Notifications');
        }
        
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            });
        }
        
        return token;
    }
    console.log(usuario)

    const sendNotification = (token) => {
        fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: 'ExponentPushToken[E8bCNwFu4cw6ElZtccMinb]',
                title: `${usuario?.cuidador?.nombre}`,
                body: `${usuario?.nombre} te ha enviado su localización`,
                sound: "default",
                data: { data: 'goes here'},
                _displayInForeground: true,
            }),
        });
    }

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
                        <View style={{alignItems: 'center'}}>
                            <Text style={{marginTop: 5, fontSize: 18, fontWeight: 'bold', color: '#0b737e'}}>Bienvenido(a) {usuario?.nombre}</Text>
                        </View>
                    }
                    { !usuario ?
                        <ActivityIndicator size="large" color="#ff7ae7" /> 
                    :
                    usuario?.tipoUsuario === 1 ? 
                    <>
                        <View>
                            <View>
                                <Text style={{fontSize: 25, textAlign: 'center', fontWeight: 'bold', color: '#0b737e'}}>¿Qué haremos hoy?</Text>
                            </View>
                            <View style={{marginTop: 30, alignItems: 'center'}}>
                                <TouchableOpacity 
                                    onPress={async () => {
                                        await getLocation();
                                        const payload = {
                                            usuario,
                                            location
                                        }
                                        await socket.emit('enviar-localizacion', payload );
                                        sendNotification(expoPushToken);
                                        snackbar('No te preocupes, se le enviará tu localización a tu cuidador', 'success');
                                    }}
                                    style={{backgroundColor: '#58A9B1', height: 100, width: '80%', marginVertical: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderColor: '#0b737e', borderWidth: 1}}
                                >
                                    <MaterialIcons name="location-history" size={38} color="white" />
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, marginTop: 10}}>Ayuda con mi localización</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => {
                                        navigation.navigate('Profile');
                                    }}
                                    style={{backgroundColor: '#faa0f1', height: 100, width: '80%', marginVertical: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderColor: '#ff7ae7', borderWidth: 1}}
                                >
                                    <Ionicons name="information-circle" size={38} color="white" />
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, marginTop: 10}}>Mi información</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <BottomMenu navigation={navigation} tipoUsuario={1} />
                    </>
                    : usuario?.tipoUsuario === 2 ?
                    <>
                        <View>
                            <View>
                                <Text style={{fontSize: 22, textAlign: 'center', fontWeight: 'bold', color: '#0b737e'}}>¿Cómo te podemos</Text>
                                <Text style={{fontSize: 22, textAlign: 'center', fontWeight: 'bold', color: '#0b737e'}}>ayudar?</Text>
                            </View>
                            <View style={{marginTop: 30, alignItems: 'center'}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('SeleccionarPaciente');
                                    }} 
                                    style={{backgroundColor: '#58A9B1', height: 100, width: '80%', marginVertical: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderColor: '#0b737e', borderWidth: 1}}
                                >
                                    <MaterialIcons name="location-history" size={38} color="white" />
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, marginTop: 10}}>Localización de mi paciente</Text>
                                </TouchableOpacity>
                    
                                <TouchableOpacity 
                                    onPress={() => {
                                        navigation.navigate('ListaPacientes');
                                    }}
                                    style={{backgroundColor: '#faa0f1', height: 100, width: '80%', marginVertical: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderColor: '#ff7ae7', borderWidth: 1}}
                                >
                                    <MaterialCommunityIcons name="clipboard-list" size={36} color="white" />
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, marginTop: 10}}>Lista de pacientes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <BottomMenu navigation={navigation} tipoUsuario={2} />
                    </> : null
                    }
                </View>
            </ScrollView>
     );
}
 
export default Home;