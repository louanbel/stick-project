import axios from 'axios';

export const logoutUser = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/logout', {}, {
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
        const response = await axios.post('http://127.0.0.1:5000/login', {
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

export const registerUser = async (signal: AbortSignal, email: string, password: string) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/register', {
            signal: signal,
            email,
            password
        });

        if (response.status === 201) {
            console.log('Successfully registered');
            // Log in the user
            await loginUser(signal, email, password);
        } else {
            console.log("Error while registering:", response.data.msg);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log('Server error while registering:', error.response.data.msg);
        } else {
            console.log("Unexpected error while registering:", error);
        }
    }
};
