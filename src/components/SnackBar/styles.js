import {StyleSheet} from 'react-native';
import { PRIMARY_GRAY, PRIMARY_WHITE } from '../../constants/colors';

export default StyleSheet.create({
    principalContainer: {
        position: "absolute",
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 60,
        bottom: 0,
        zIndex: 1000
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        height: '100%',
        width: '95%',
        paddingVertical: 15,
        backgroundColor: PRIMARY_GRAY
    },
    messageContainer: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.8
    },
    message: {
        color: PRIMARY_WHITE,
        marginLeft: 10
    } ,
    actionContainer: {
        alignItems: 'center',
        flex: 0.2,
        height: '100%',
        justifyContent: 'center'
    },
    actionText: {
        color: PRIMARY_WHITE,
        fontWeight: 'bold'
    } 

});