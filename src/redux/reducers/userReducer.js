import { LOAD_USER, CLEAR_USER } from "../actions/types";

const initialState = null

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case LOAD_USER:
            return {...action.payload}
        case CLEAR_USER:
            return null
        default:
            return state;
    }
}

export default userReducer