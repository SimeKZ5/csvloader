export const uploadExcelFile = async (
  file: File,
  startRow: number = 12
): Promise<Blob> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("startRow", startRow.toString());

    const response = await fetch("http://localhost:5000/api/excel/uploads", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error uploading Excel file:", error);
    throw error;
  }
};
