import axios from "axios";

export async function updateStatus(
    qnid: string | undefined,
    langUsed: number,
    username: string | null,
    saveAttemptData: {speed: number; memory: number }
  ): Promise<void> {
    try {
        const response = await axios.put(`https://algovisor.onrender.com/tutorials/code/attempt/status/${qnid}/${langUsed}/${username}`, saveAttemptData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          // console.log('Form data posted successfully!');
          // console.log(response.data); // This will be the response data
        } else {
          // console.log('Unexpected status code:', response.status);
        }
      } catch (error) {
        // console.error('An error occurred:', error);
      }
  }
  