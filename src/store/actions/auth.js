import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const userSignup = ( userData ) => {
    return dispatch => {
        axios.post( '/user/signup/', userData)
            .then( response => {
                const result = response.data.data
                localStorage.setItem('token', result.token);
                localStorage.setItem('userName', result.user_detail.name);

                dispatch(authSuccess(result.token, result.user_detail.name));
            } )
            .catch( error => {
                dispatch( authFail( error ) );
            } );
    };
};

export const setUserSignup = ( userData ) => {
    return {
        type: actionTypes.USER_SIGNUP,
        result: userData
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userName) => {
        return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userName: userName
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
        };
        axios.post('/user/login/', authData)
            .then(response => {
                const result = response.data.data
                localStorage.setItem('token', result.token);
                localStorage.setItem('userName', result.user_detail.name);
                dispatch(authSuccess(result.token, result.user_detail.name));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userName');
            dispatch(authSuccess(token, userId));        
        }
    };
};