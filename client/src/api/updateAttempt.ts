export async function updateAttempt(
    qnid: string | undefined,
    langUsed: number,
    username: string | null,
    saveAttemptData: { speed: number; memory: number }
  ): Promise<void> {
    try {
      const response = await fetch(`http://localhost:8080/tutorials/code/attempt/${qnid}/${langUsed}/${username}`, {
        method: "PUT",
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
    } catch (err) {
      console.log("An error occurred:", err);
      throw err;
    }
  }
  