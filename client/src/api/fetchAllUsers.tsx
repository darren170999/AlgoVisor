import axios from 'axios';

export async function fetchAllUsers() {
    try {
        const response = await axios.get('http://localhost:8080/users');
        if (response.status === 200) {
            return response.data.data.data;
        } else {
            console.error('Failed to fetch previous attempt:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
