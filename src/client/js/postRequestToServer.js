const sendPostRequest = async (url = "", requestData = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status}: ${response.statusText}`
      );
    }

    const responseData = await response.json();
    console.log("Data sent to the server:", requestData);
    console.log("Server response:", responseData);

    return responseData;
  } catch (error) {
    console.error("Error sending POST request:", error);
    throw error;
  }
};

export { sendPostRequest };
