import axios from 'axios';
import { LOCALIZACION_EXITO, LOCALIZACION_ERROR } from '../types';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://192.168.100.4:4000';

const TOKEN = 'TOKEN';

export const obtenerLocalizacionPaciente = (token, id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/api/pacientes/localizacion/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': `${token}`
            }});

            dispatch(setLocationSuccess(response.data.localizacion));

        } catch (error) {
            console.log(error.response.data);
            dispatch(setLocationError());
        }
    }
}

export const guardarLocalizacionPaciente = (token, locationData, address, id) => {
    const data = {
        locationData, 
        address,
        id
    }
    return async (dispatch) => {
        try{
            const response = await axios.post(`${API_URL}/api/pacientes/localizacion`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': `${token}`
            }});

            dispatch(setLocationSuccess(response.data.usuario.localizacion));

            
        }catch(error) {
            console.log(error.response.data);
            dispatch(setLocationError());
        }
    } 
} 

const setLocationSuccess = (data) => ({
    type: LOCALIZACION_EXITO,
    payload: data
})
const setLocationError = () => ({
    type: LOCALIZACION_ERROR
})

export const guardarPushToken = (token, pushToken, id) => {
    const data = {
        pushToken,
        id
    }
    return async (dispatch) => {
        try{
            const response = await axios.post(`${API_URL}/api/pacientes/push-token`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': `${token}`
            }});

            console.log(response.data);

            
        }catch(error) {
            console.log(error.response.data);
        }
    } 
}