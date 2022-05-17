import React from 'react';
import {Text, View, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const Map = ({localizacion, paciente}) => {
    console.log(localizacion.coordenadas)
    return (
        
        <MapView
            style={{flex: 1}}
            mapType="standard"
            initialRegion={{
            latitude: localizacion.coordenadas[0],
            longitude: localizacion.coordenadas[1],
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
            }}
        >
            <Marker
                coordinate={{
                    latitude: localizacion.coordenadas[0],
                    longitude: localizacion.coordenadas[1],
                }} 
            >
                <Text style={{textAlign: 'center', fontSize: 18, color: 'red', fontWeight: 'bold',}}>{paciente}</Text>
                <Image style={{width: 30, height: 20}} source={require('../../../assets/Circle.png')} /> 
            </Marker>
        </MapView>
    );
}
 
export default Map;