import {combineReducers} from 'redux';

import {authReducer} from './authReducer';
import { usuariosReducer } from './usuariosReducer';
import { pacientesReducer} from './pacientesReducer';

export default combineReducers({
    auth: authReducer,
    usuarios: usuariosReducer, 
    pacientes: pacientesReducer
})