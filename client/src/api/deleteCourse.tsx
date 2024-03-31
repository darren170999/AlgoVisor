import axios from 'axios';

export async function deleteCourse(name: string) {
    try {
        const response = await axios.delete(`https://algovisor.onrender.com/courses/${name}`);
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
