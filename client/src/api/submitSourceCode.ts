import axios from 'axios';

export async function submitSourceCode(sourceCode: string, languageId: number): Promise<string> {
  try {
    const response = await axios.post('http://34.124.242.8/submissions', {
      source_code: sourceCode,
      language_id: languageId,
    });
    return response.data.token;
  } catch (error) {
    console.error('Error compiling code:', error);
    throw error; // Rethrow the error for handling in the component
  }
}

export async function submitSourceCodeProduction(sourceCode: string, languageId: number): Promise<string> {
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: {
      // base64_encoded: 'true',
      // fields: '*'
    },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': 'acdcf60472mshdc3e3ed45642c3bp1c9dd0jsnde507fbb32cf',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    data: {
      source_code: sourceCode,
      language_id: languageId,
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.token;
  } catch (error) {
    console.error('Error submitting source code:', error);
    throw error;
  }
}
