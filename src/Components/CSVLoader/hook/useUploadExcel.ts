import { useMutation } from "@tanstack/react-query";
import { uploadExcelFile } from "../api/uploadFile";

// Define the input parameters type
interface UploadParams {
  file: File;
  startRow?: number;
}

const useUploadExcelFile = () => {
  // Set up the mutation with correct types
  const mutation = useMutation<Blob, Error, UploadParams>({
    mutationFn: ({ file, startRow = 12 }: UploadParams) =>
      uploadExcelFile(file, startRow),
    onSuccess: (data: Blob) => {
      // Create a URL for the blob and download it
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "output.S3D"); // Default file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("File exported and downloaded successfully.");
    },
    onError: (error: Error) => {
      console.error("Error exporting file:", error);
      alert("An error occurred while exporting the file.");
    },
  });

  return { exportToS3D: mutation.mutate, errorExportToS3D: mutation.error };
};

export default useUploadExcelFile;
