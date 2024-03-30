export async function fetchAllQuestions(){
    try {
        const response = await fetch(`https://34.124.242.8:8080/tutorials`);
        if (response.ok) {
            const data = await response.json();
            return data.data;
        } else {
            console.error("Failed to fetch previous attempt:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("An error occurred:", error);
        throw error;
    }
}
