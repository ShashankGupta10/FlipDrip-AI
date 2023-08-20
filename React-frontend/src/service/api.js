import axios from 'axios';

const url = 'http://localhost:4000';

export const authenticateLogin = async (user) => {
    try {
        
        return await axios.post(`${url}/users/login`, user)
    } catch (error) {
        console.log('Error while calling login API: ', error);
    }
}

export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`${url}/users/signup`, user)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}


export const payUsingPaytm = async(data)=>{
    try {
        let response=await axios.post(`${url}/payment`,data);
        return response.data
    } catch (error) {
         console.log('Error while calling Payment API: ', error);
    }
}