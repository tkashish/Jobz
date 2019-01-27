import { AsyncStorage } from 'react-native';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types.js';
import { Facebook } from 'expo';

export const facebookLogin = () => {
    return async (dispatch) => {
        let token = await AsyncStorage.getItem('fb_token')
        console.log("facebooklogin");
        console.log(token);
        
        if (token) {
            dispatch({
                type: FACEBOOK_LOGIN_SUCCESS,
                payload: token
            })
        } else {
            doFacebookLogin(dispatch)
        }
    }
};

const doFacebookLogin = async dispatch => {
    let result = await Facebook.logInWithReadPermissionsAsync('2248764682030987', {
        permissions: ['public_profile'],
        behavior: 'native'
    })
    if (result.type === 'cancel') {
        return dispatch({
            type: FACEBOOK_LOGIN_FAIL,
        });
    }
    await AsyncStorage.setItem('fb_token', result.token)
    return dispatch({
        type: FACEBOOK_LOGIN_SUCCESS,
        payload: result.token
    });
}

