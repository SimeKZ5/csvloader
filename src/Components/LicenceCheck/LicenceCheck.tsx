// src/components/LicenseCheck.tsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUniqueDeviceId } from "../../utils/uniqueDeviceId";

const LicenseCheck: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        // Get the unique device ID
        const deviceId = await getUniqueDeviceId();

        // Make an API call to check if the device is registered
        const response = await fetch(
          `http://localhost:5000/api/licence/check-device`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ deviceId }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          if (data.registered) {
            navigate("/");
          } else {
            setRegistered(false);
          }
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to check device registration");
      } finally {
        setLoading(false);
      }
    };

    checkRegistration();
  }, [navigate]);

  const handleLicenseSubmit = async () => {
    setLoading(true);
    try {
      const deviceId = await getUniqueDeviceId();

      // Step 1: Authorize the license
      const authResponse = await fetch(
        `http://localhost:5000/api/licence/authorize/${licenseKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deviceId }),
        }
      );

      const authData = await authResponse.json();

      if (
        authResponse.ok &&
        authData.message === "License successfully authorized"
      ) {
        const checkResponse = await fetch(
          `http://localhost:5000/api/licence/check-device`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ deviceId }),
          }
        );

        const checkData = await checkResponse.json();

        if (checkResponse.ok && checkData.registered) {
          // Navigate to the CSVLoader if check is successful
          navigate("/");
        } else {
          setError(checkData.message || "Device registration check failed");
        }
      } else {
        setError(authData.message || "License authorization failed");
      }
    } catch (err) {
      console.error("Error during license submission:", err);
      setError("Failed to authorize and check device registration");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          width: "100vh",
          height: "100vh",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        sx={{
          width: "100vh",
          height: "100vh",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        width: "100vh",
        height: "100vh",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box>
        <TextField
          label="Upišite kod licence"
          variant="outlined"
          fullWidth
          value={licenseKey}
          onChange={(e) => setLicenseKey(e.target.value)} // Update license key state
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLicenseSubmit}
          disabled={!licenseKey} // Disable button if license key is empty
          sx={{ mt: 2 }}
        >
          Potvrdi licencu
        </Button>
      </Box>
    </Container>
  );
};

export default LicenseCheck;
