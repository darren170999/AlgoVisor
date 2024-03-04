export async function saveAttempt(saveAttemptData: any): Promise<void> {
    try {
      const response = await fetch("http://localhost:8080/tutorials/code/attempt/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveAttemptData),
      });
      if (response.ok) {
        console.log("Form data posted successfully!");
        const data = await response.json();
        console.log(data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  }
  