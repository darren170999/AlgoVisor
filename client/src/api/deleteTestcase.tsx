import axios from 'axios';

export async function deleteTestcase(qnid: number) {
    try {
        const response = await axios.delete(`https://algovisor.onrender.com/testcase/${qnid}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error("Failed to fetch previous attempt:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("An error occurred:", error);
        throw error;
    }
}
