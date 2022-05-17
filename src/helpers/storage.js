import * as SecureStore from 'expo-secure-store';

export const deleteToken = async token => {
    return SecureStore.deleteItemAsync(token);
}

export const getToken = async token => {
    let response = await SecureStore.getItemAsync(token);
    return response;
}

export const setToken = async (key, value) => {
    return SecureStore.setItemAsync(key,value);
}