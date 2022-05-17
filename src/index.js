import React from 'react';
import {Provider} from 'react-redux';
import SnackBarProvider from './context/SnackBarContext';

import store from './redux/store';
import Routes from './routes';


export default () => (
    <Provider
        store={store}
    >
        <SnackBarProvider>
            <Routes />
        </SnackBarProvider>
    </Provider>
);