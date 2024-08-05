import { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SettingsIcon from "@mui/icons-material/Settings";
import useGetLicence from "./hook/useGetLicence";
import useUploadExcelFile from "./hook/useUploadExcel";

const CSVLoader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const { licenceData } = useGetLicence();
  const { exportToS3D } = useUploadExcelFile();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File selected:", selectedFile.name);
    }
  };
  console.log(licenceData);
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      console.log("File dropped:", droppedFile.name);
    }
  };

  const handleExportS3D = () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }
    exportToS3D({ file, startRow: 12 });
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: 300, sm: 500, md: 600 },
          height: { xs: 250, sm: 350, md: 400 },
          backgroundColor: "red",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Button
            startIcon={<CloudUploadIcon />}
            variant="contained"
            component="label"
          >
            Upload
            <input
              type="file"
              accept=".csv, .xlsx"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          <Button startIcon={<SettingsIcon />} variant="contained">
            Settings
          </Button>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: dragging ? "lightblue" : "white",
            border: "2px dashed #ccc",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Typography variant="h6" color="textSecondary">
            {file
              ? `File: ${file.name}`
              : "Drag & Drop files here or click to upload"}
          </Typography>
        </Box>
        <Button sx={{ mt: 2 }} variant="contained" onClick={handleExportS3D}>
          Export
        </Button>
      </Box>
    </Container>
  );
};

export default CSVLoader;
