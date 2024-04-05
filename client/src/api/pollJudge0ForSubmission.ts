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

export async function fetchSubmissionProduction(submissionToken: string): Promise<SubmissionResponse> {
  const options = {
    method: 'GET',
    url: `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}`,
    params: {
      base64_encoded: 'true',
      fields: '*'
    },
    headers: {
      'X-RapidAPI-Key': 'acdcf60472mshdc3e3ed45642c3bp1c9dd0jsnde507fbb32cf',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    // Handle errors, e.g., network error, server error
    console.error('Error fetching submission:', error);
    throw error;
  }
}
