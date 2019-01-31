import { AsyncStorage } from 'react-native';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL, FACEBOOK_LOGOUT_SUCCESS } from './types.js';
import { Facebook } from 'expo';

export const facebookLogin = (navigate) => {
    console.log('facebook login started');

    return async (dispatch) => {
        let token = await AsyncStorage.getItem('fb_token');
        if (token) {
            dispatch({
                type: FACEBOOK_LOGIN_SUCCESS,
                payload: token
            })
        } else {
            doFacebookLogin(dispatch, navigate)
        }
    }
};

export const facebookLogout = (navigate) => async dispatch => {
    try {
        console.log("Logging Out");
        await AsyncStorage.removeItem('fb_token');
        dispatch({
            type: FACEBOOK_LOGOUT_SUCCESS,
        });
        navigate('welcome');
    } catch (error) {
        console.log(error);
    }
};

const doFacebookLogin = async (dispatch, navigate) => {
    console.log('doFacebookLogin');

    let result = await Facebook.logInWithReadPermissionsAsync('2248764682030987', {
        permissions: ['public_profile'],
        behavior: 'native'
    })
    if (result.type === 'cancel') {
        console.log('doFacebookLogin canceled');
        dispatch({
            type: FACEBOOK_LOGIN_FAIL,
        });
        navigate('welcome', { canceled: true });
        return;
    }
    await AsyncStorage.setItem('fb_token', result.token)
    return dispatch({
        type: FACEBOOK_LOGIN_SUCCESS,
        payload: result.token
    });
}

