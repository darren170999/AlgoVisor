export const sendQuestionNotifications = async (): Promise<any> => {
    try {
        const response = await fetch("https://34.124.242.8:8080/subscribers/notify")
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Failed to create tutorial: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Failed to create tutorial: ${error}`);
    }
};
