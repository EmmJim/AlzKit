import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    REDIRECCIONAR_USUARIO,
    RESETEAR_SIGNUP
} from '../types';

const initialState = {
    error: null,
    screen: null,
    mensaje: null
}

export const usuariosReducer = (state = initialState, action) => {
    switch(action.type){
        case REGISTRO_EXITOSO:
            return {
                ...state,
                mensaje: action.payload,
            }
        case REGISTRO_ERROR: 
            return {
                ...state,
                error: action.payload || true,
            }
        case REDIRECCIONAR_USUARIO:
            return {
                ...state,
                screen: action.payload
            }
        case RESETEAR_SIGNUP: 
            return {
                ...state,
                error: null,
                screen: null,
                mensaje: null
            }
        default:
            return state;
    }
};