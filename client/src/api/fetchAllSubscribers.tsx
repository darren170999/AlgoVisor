import axios from 'axios';

export function fetchAllSubscribers() {
    return axios.get('https://algovisor.onrender.com/subscribers')
        .then(response => {
            if (response.status === 200) {
                return response.data.data.data;
            } else {
                console.error('Failed to fetch previous attempt:', response.statusText);
                return null;
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
            throw error;
        });
}
