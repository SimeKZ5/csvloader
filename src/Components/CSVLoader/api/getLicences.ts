export const getLicensesApi = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/licence", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching licenses:", error);
    throw error;
  }
};
