export async function fetchAllTestcases(){
    try {
        const response = await fetch(`https://algovisor.onrender.com/testcase`);
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
