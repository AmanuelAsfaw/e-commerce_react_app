import axios from "axios";
import { API_URL, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "./types"

export const loginAction = (email, password) => async (dispatch) => {
    try{
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            API_URL + '/api/users/token/',
            {
                'username': email,
                'password': password
            },
            config
        ); 

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        
        localStorage.setItem('userInfo', JSON.stringify(data))
        
    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const logoutAction = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    
    dispatch({ 
        type: USER_LOGOUT
    })
} 

export const registerAction = (name, email, password) => async (dispatch) => {
    try{
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            API_URL + '/api/users/register/',
            {
                'name': name,
                'email': email,
                'password': password
            },
            config
        ); 

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data))
        
    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({ type: USER_DETAILS_REQUEST });

        const { userLogin: {userInfo }}= getState()
        console.log(userInfo);
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer '+userInfo.token
            }
        }

        const { data } = await axios.get(
            'http://127.0.0.1:8000' + '/api/users/profile',
            config
        ); 

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });        
        
    }catch(error){
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}
