import axios from 'axios';
import { subscriberFormDataProps } from '../types/subscriberFormDataProps';

export async function unsubscribe(subscriberFormData: subscriberFormDataProps) {
  try {
    if (subscriberFormData && subscriberFormData.email) {
      const response = await axios.delete("http://localhost:8080/subscriber", {
        headers: {
          "Content-Type": "application/json"
        },
        data: subscriberFormData
      });

      if (response.status === 200) {
        // Handle success, e.g., show a confirmation message
        console.log("Successfully unsubscribed");
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to unsubscribe");
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
