import axios from 'axios';

export async function fetchSubmissionOutput(submissionToken: string): Promise<string> {
  try {
    const response = await axios.get(`http://0.0.0.0:2358/submissions/${submissionToken}`);
    return response.data.stdout;
  } catch (error) {
    // Handle errors, e.g., network error, server error
    console.error('Error fetching submission output:', error);
    throw error;
  }
}