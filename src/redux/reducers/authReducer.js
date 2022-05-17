import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    RESETEAR_USUARIO,
    OBTENER_USUARIO,
    CERRAR_SESION,
    REDIRECCIONAR_USUARIO
} from '../types';

const initialState = {
    token: null,
    autenticado: null,
    usuario: null,
    mensaje: null,
    error: null,
    loading: false,
    screen: null
}

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_ERROR:
            return {
                ...state,
                error: action.payload || true,
                usuario: null
            }
        case LOGIN_EXITOSO: 
            return {
                ...state,
                error: null,
                token: action.payload
            }
        case RESETEAR_USUARIO: 
            return {
                ...state,
                ...initialState,
                usuario: null,
            }
        case REDIRECCIONAR_USUARIO:
            return {
                ...state,
                screen: action.payload
            }
        case OBTENER_USUARIO: 
            return {
                ...state,
                usuario: action.payload
            }
        default:
            return state;
    }
};