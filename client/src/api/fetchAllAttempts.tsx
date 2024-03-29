export async function fetchAllAttempts(){
    try {
        const response = await fetch(`http://localhost:8080/tutorials/code/attempt`);
        if (response.ok) {
            const data = await response.json();
            // console.log(data.data)
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
