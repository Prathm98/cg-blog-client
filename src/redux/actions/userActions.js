import { getUser } from '../../services/user.service'
import {LOAD_USER, CLEAR_USER} from './types'

export const loadUser = () => async (dispatch) => {
    let token = localStorage.getItem('token')
    if(token){
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

export const clearUser = () => (dispatch) => {
    localStorage.removeItem('token')        
    dispatch({
        type: CLEAR_USER
    })
}