const BASE_URL = "http://localhost:5000/api/licence";

export const deleteLicenseByKey = async (licenseKey: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${licenseKey}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
