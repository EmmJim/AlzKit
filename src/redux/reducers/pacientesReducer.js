import {
    LOCALIZACION_EXITO,
    LOCALIZACION_ERROR
} from '../types';

const initialState = {
    error: null,
    localizacion: null
}

export const pacientesReducer = (state = initialState, action) => {
    switch(action.type){
        case LOCALIZACION_EXITO: 
            return {
                ...state,
                localizacion: action.payload, 
                error: null
            }
        case LOCALIZACION_ERROR: 
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
};