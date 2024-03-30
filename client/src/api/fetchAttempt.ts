interface PreviousAttemptData {
    attempt: string;
    language: string;
    // Add other properties as needed
  }
  
  export async function fetchAttempt(qnid: string | undefined, langUsed: number, username: string| null): Promise<PreviousAttemptData | null> {
    try {
      const response = await fetch(`http://34.124.242.8:8080/tutorials/code/attempt/${qnid}/${langUsed}/${username}`);
      if (response.ok) {
        const data = await response.json();
        return data.data.data;
      } else {
        console.error("Failed to fetch previous attempt:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  }
  