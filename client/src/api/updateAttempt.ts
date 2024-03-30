import axios from 'axios';

export async function updateAttempt(
  qnid: string | undefined,
  langUsed: number,
  username: string | null,
  saveAttemptData: { speed: number; memory: number }
): Promise<void> {
  try {
    const response = await axios.put(`http://localhost:8080/tutorials/code/attempt/${qnid}/${langUsed}/${username}`, saveAttemptData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      // console.log('Form data posted successfully!');
      const data = response.data;
      // console.log(data);
    } else {
      // console.log('Unexpected status code:', response.status);
    }
  } catch (error) {
    // console.error('An error occurred:', error);
    throw error;
  }
}
