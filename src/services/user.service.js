import axios from "axios"
import { restURL } from "../utils/configProvider";

// Login user
export const login = async (username, password) => {
    try {
        const login = await axios.post(restURL + '/api/user/login', {
            username, password
        });
        return login.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Get user's data
export const getUser = async () => {
    try {
        const user = await axios.get(restURL + '/api/user');
        return user.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Register user
export const register = async (name, email, username, password) => {
    try {
        const register = await axios.post(restURL + '/api/user/register', {
            name, email, username, password
        });
        return register.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}