import axios from 'axios';
import { LOGIN_ERROR, LOGIN_EXITOSO, RESETEAR_USUARIO, REDIRECCIONAR_USUARIO, OBTENER_USUARIO } from '../types';
import {deleteToken, setToken, getToken} from '../../helpers/storage';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://192.168.100.4:4000';

const TOKEN = 'TOKEN';


export const login = (data) => {

    return async (dispatch) => {
        try{
            const response = await axios.post(`${API_URL}/api/auth`, data, {
                headers: {
                    'Content-Type': 'application/json',
            }});

            // console.log(response.data);

            if(!response.data){
                dispatch(loginError({
                    message: 'Ocurrió un error', 
                    type: 'error'
                }));
            }else{
                const {token} = response.data;
                await setToken(TOKEN, token);
                console.log(token);
                dispatch(loginSuccess({token}))
            }
        }catch(error) {
            console.log(error.response.data.errores);
            
            dispatch(loginError({
                message: error.response.data.msg, 
                type: 'error'
            }));
        }
    }
}

const loginError = error => ({
    type: LOGIN_ERROR,
    payload: error
});
const loginSuccess = token => ({
    type: LOGIN_EXITOSO,
    payload: token
});

export const logout = () => {
    return async(dispatch) => {
        try {
            await deleteToken(TOKEN);

            dispatch(authReset());
        } catch (error) {
            console.log(error);
        }
    }
}

const authReset = () => ({
    type: RESETEAR_USUARIO
});

export const reopenApp = () => {
    return async(dispatch) => {
        try {
            const result = await getToken(TOKEN);

            if(result){
                let token = result;
                await setToken(TOKEN, token);
                dispatch(loginSuccess({token}));
                dispatch(authRedirect('Home'));

            }else{
                dispatch(authRedirect('Login'));
            }

        } catch (error) {
            console.log(error);
        }

    }
}

const authRedirect = screen => ({
    type: REDIRECCIONAR_USUARIO,
    payload: screen
});

export const obtenerUsuario = (token) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`${API_URL}/api/auth`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': `${token}`
            }});

            dispatch(setUser(response.data.usuario));

            
        }catch(error) {
            console.log(error.response.data);
        }
    } 
}

const setUser = data => ({
    type: OBTENER_USUARIO,
    payload: data
});
