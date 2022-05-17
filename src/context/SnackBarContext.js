import React, {createContext, useState} from 'react';
import SnackBar from '../components/SnackBar';

export const SnackBarContext = createContext();

const initialState = {
    isOpen: false,
    message: '',
    type: ''
}

const SnackBarProvider = (props) => {

    const [snackprops, setSnackProps] = useState(initialState);

    const snackbar = (message, type) => {
        setSnackProps({
            isOpen: true,
            message,
            type
        });
    };

    const handleHide = () => setSnackProps(initialState);

    return (  
        <SnackBarContext.Provider
            value={
                snackbar
            }
        >
            {props.children}
            <SnackBar {...snackprops} close={handleHide} />
            
        </SnackBarContext.Provider>
    );
}
 
export default SnackBarProvider;