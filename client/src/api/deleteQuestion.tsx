import axios from 'axios';

export async function deleteQuestion(qnid: number) {
    try {
        const response = await axios.delete(`http://localhost:8080/tutorials/code/${qnid}`);
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
