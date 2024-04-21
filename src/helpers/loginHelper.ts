import axios from 'axios';
import {LoginResponse, LoginStatus} from "../types/LoginResponse.ts";

export function isTokenExpired(): boolean {
    const token = localStorage.getItem('access_token');
    if (token === null) {
        return true;
    }
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    return tokenData.exp * 1000 < Date.now();
}

export const logoutUser = async () => {
    try {
        const response = await axios.post('https://stick-service.foelij1s8ku6i.eu-west-3.cs.amazonlightsail.com/logout', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });

        if (response.status === 200) {
            console.log('Successfully logged out');
            // Delete the access token from the local storage
            localStorage.removeItem('access_token');
        } else {
            console.log('Error while logging out:', response.data.msg);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Erreur retournée par le serveur
            console.log('Server error while logging out:', error.response.data.msg);
        } else {
            // Erreur réseau ou autre erreur inattendue
            console.log('Unexpected error while logging out:', error);
        }
    }
};

export const loginUser = async (signal: AbortSignal, email: string, password: string): Promise<boolean> => {
    try {
        const response = await axios.post('https://stick-service.foelij1s8ku6i.eu-west-3.cs.amazonlightsail.com/login', {
            signal: signal,
            email,
            password
        });

        if (response.status === 200) {
            console.log('Successfully logged in');
            // Store the access token in the local storage
            localStorage.setItem('access_token', response.data.access_token);
            return true;
        } else {
            console.log('Error while logging in:', response.data.msg);
            return false;
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log('Server erro while logging in:', error.response.data.msg);
        } else {
            console.log('Unexpected error while logging in:', error);
        }
        return false;
    }
};

export const registerUser = async (signal: AbortSignal, email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post('https://stick-service.foelij1s8ku6i.eu-west-3.cs.amazonlightsail.com/register', {
            signal: signal,
            email,
            password
        });

        if (response.status === 201) {
            console.log('Successfully registered');
            // Log in the user
            let isLogged = await loginUser(signal, email, password);
            if (isLogged) {
                return new LoginResponse(LoginStatus.SUCCESS, 'Successfully registered. Redirecting...');
            } else {
                return new LoginResponse(LoginStatus.FAILURE, 'Error while logging in after registration. Please retry.');
            }
        } else if (response.status === 409) {
            console.log('Email already exists');
            return new LoginResponse(LoginStatus.FAILURE, 'Email already used. Please choose another email.');
        }
        console.log("Error while registering:", response.data.msg);
        return new LoginResponse(LoginStatus.FAILURE, 'Error while registering. Please retry later.');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log('Server error while registering:', error.response.data.msg);
        } else {
            console.log("Unexpected error while registering:", error);
        }
        return new LoginResponse(LoginStatus.FAILURE, 'Unexpected error while registering. Please retry later.');
    }
};
