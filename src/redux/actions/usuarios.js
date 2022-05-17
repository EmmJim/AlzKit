import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    REDIRECCIONAR_USUARIO,
    RESETEAR_SIGNUP
} from '../types';
import axios from 'axios';
import {deleteToken, setToken, getToken} from '../../helpers/storage';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://192.168.100.4:4000';


export const signUp = (data) => {

    return async (dispatch) => {
        try{
            const response = await axios.post(`${API_URL}/api/usuarios`, data, {
                headers: {
                    'Content-Type': 'application/json',
            }});

            dispatch(signUpExitoso(response.data.msg));
            dispatch(redireccionarUsuario('Login'));

            
        }catch(error) {
            console.log(error.response.data);
            dispatch(signUpError({
                msg: error.response.data,
                type: 'error' 
            }));
            
        }
    }
}

const signUpExitoso = msg => ({
    type: REGISTRO_EXITOSO,
    payload: msg
})

const signUpError = error => ({
    type: REGISTRO_ERROR,
    payload: error
})

const redireccionarUsuario = screen => ({
    type: REDIRECCIONAR_USUARIO,
    payload: screen
})

export const signUpReset = () => {
    return async (dispatch) => {
        dispatch(resetSignUp());
    }
}

const resetSignUp = () => ({
    type: RESETEAR_SIGNUP
})