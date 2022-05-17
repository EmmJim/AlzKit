import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';


import Map from '../../components/Map';


const MapScreen = ({route, navigation}) => {

    const {localizacion} = useSelector(state => state.pacientes);
    const {paciente, direccion} = route.params;

    return (
        <View style={{ backgroundColor: 'white'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity 
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{marginLeft: 20, flexDirection: 'row', alignItems: 'center', marginVertical: 20}}
                >
                    <Ionicons name="chevron-back" size={30} color="#0b737e" />
                    <Text style={{fontWeight: 'bold', color: '#0b737e'}}>Volver</Text>
                </TouchableOpacity>
                <Image style={{width: 30, height: 40, marginRight: 20}} source={require('../../../assets/Logo.png')} />
            </View>
            <View style={{height: '50%'}}>
                <Map localizacion={localizacion} paciente={paciente} />
            </View>
            <View style={{height: '70%', marginTop: 30}}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#0b737e', fontSize: 18}}>Localización del paciente: </Text>
                <Text style={{textAlign: 'center', color: '#0b737e', fontSize: 18}}>{paciente}</Text>
                <Text style={{textAlign: 'center', color: '#0b737e', marginTop: 10}}>{`${direccion.street} ${direccion.streetNumber}, ${direccion.district}, ${direccion.postalCode}, ${direccion.city}`}</Text>
            </View>
        </View>
    );
}
 
export default MapScreen;