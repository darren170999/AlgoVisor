import axios from 'axios';

export function pollJudge0ForSubmission(sourceCode: string, languageId: number): Promise<string> {
  return axios.post('http://0.0.0.0:2358/submissions', {
    source_code: sourceCode,
    language_id: languageId,
  })
  .then((response) => response.data.token)
  .catch((error) => {
    console.error('Error compiling code:', error);
    throw error; // Rethrow the error for handling in the component
  });
}