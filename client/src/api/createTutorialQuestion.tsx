export const createTutorial = async (formData: any): Promise<any> => {
    try {
        const response = await fetch("https://algovisor.onrender.com/tutorials/code/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Failed to create tutorial: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Failed to create tutorial: ${error}`);
    }
};
