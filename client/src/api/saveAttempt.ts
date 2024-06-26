import axios from 'axios';

export async function saveAttempt(saveAttemptData: any): Promise<void> {
  try {
    const response = await axios.post("https://algovisor.onrender.com/tutorials/code/attempt/create", saveAttemptData, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
