import axios from 'axios';

export async function submitSourceCode(sourceCode: string, languageId: number): Promise<string> {
  try {
    const response = await axios.post('http://0.0.0.0:2358/submissions', {
      source_code: sourceCode,
      language_id: languageId,
    });
    return response.data.token;
  } catch (error) {
    console.error('Error compiling code:', error);
    throw error; // Rethrow the error for handling in the component
  }
}
