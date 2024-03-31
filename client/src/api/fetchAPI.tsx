import axios from 'axios';

export async function fetchAPI() {
    try {
        const response = await axios.get('https://algovisor.onrender.com/settings');
        if (response.status === 200) {
            const data = response.data.data.data[0];
            const chatGPTApiKey = data.chatgptapikey;
            return chatGPTApiKey;
        } else {
            console.error('Failed to fetch API:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
