// src/components/ProtectedRoute.js

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUniqueDeviceId } from "./uniqueDeviceId";
import { Typography } from "@mui/material";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Check if the user is authorized by calling the backend with the device ID
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const deviceId = await getUniqueDeviceId();

        // Make a request to the backend to check if the device is registered
        const response = await fetch(
          `http://localhost:5000/api/licence/check-device`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-device-id": deviceId, // Include device ID in headers
            },
            body: JSON.stringify({ deviceId }),
          }
        );

        const data = await response.json();

        if (response.ok && data.registered) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        console.error("Authorization check failed:", error);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthorization();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // If not authorized, redirect to the license check page
  if (!authorized) {
    navigate("/licenceCheck");
  }

  // Render the child component if authorized
  return children;
};

export default ProtectedRoute;
