import { getUser } from '../../services/user.service'
import {LOAD_USER, CLEAR_USER, CLEAR_LIKE_STATUS} from './types'

// Loads user initialy based on the token
export const loadUser = () => async (dispatch) => {
    // retrieving token from local storage
    let token = localStorage.getItem('token')
    if(token){
        // Calling user service to get data
        const userData = await getUser();

        if(userData){
            dispatch({
                type: LOAD_USER,
                payload: userData.data
            })
        }else{
            dispatch({
                type: CLEAR_USER
            })
        }
    }
}

// Logout action
export const clearUser = () => (dispatch) => {
    localStorage.removeItem('token')        
    dispatch({
        type: CLEAR_USER
    })
    dispatch({
        type: CLEAR_LIKE_STATUS
    })
}