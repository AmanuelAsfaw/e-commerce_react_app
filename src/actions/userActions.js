import axios from "axios";
import { API_URL, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "./types"

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
