import axios from 'axios';

interface SubmissionResponse {
  stdout: string;
  memory: number;
  // Add other properties as needed
}

export async function fetchSubmission(submissionToken: string): Promise<SubmissionResponse> {
  try {
    const response = await axios.get(`http://34.124.242.8/submissions/${submissionToken}`);
    return response.data;
  } catch (error) {
    // Handle errors, e.g., network error, server error
    console.error('Error fetching submission:', error);
    throw error;
  }
}
