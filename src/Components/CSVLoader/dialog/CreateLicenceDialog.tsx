import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getLicensesApi } from "../api/getLicences";
import { useEffect, useState } from "react";

interface CreateLicenceDialogProps {
  open: boolean;
  onClose: () => void;
}

interface License {
  _id: string;
  name: string;
  licenseUsed: boolean;
  machineId: string;
  date: string;
  license: string;
  __v: number;
}

const CreateLicenceDialog = ({ open, onClose }: CreateLicenceDialogProps) => {
  const theme = useTheme();

  const [licenses, setLicenses] = useState<License[]>([]);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const data = await getLicensesApi();
        setLicenses(data);
      } catch (error) {
        console.error("Failed to fetch licenses:", error);
      }
    };

    fetchLicenses();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md" // Set maxWidth to md for a more comfortable display
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
          padding: theme.spacing(2),
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" component="div">
          Kreiraj novu licencu
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(2),
          }}
        >
          <TextField
            label="Upiši ime"
            fullWidth
            variant="outlined"
            onChange={(e) => console.log(e.target.value)}
            sx={{ mt: 1 }}
          />
          {/* Add more fields if needed */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          sx={{ marginRight: theme.spacing(1) }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log(getLicensesApi())}
          /* disabled={true} */
        >
          Kreiraj licencu
        </Button>
      </DialogActions>
      {/* Dynamic Table */}
      <Box
        sx={{
          maxHeight: 300, // Adjust the height as needed
          overflowY: "auto",
          mt: 2, // Add margin to separate the table from the buttons
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">License Used</TableCell>
              <TableCell align="left">Machine ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">License</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {licenses.map((license) => (
              <TableRow key={license._id}>
                <TableCell align="left">{license._id}</TableCell>
                <TableCell align="left">{license.name}</TableCell>
                <TableCell align="left">
                  {license.licenseUsed ? "Yes" : "No"}
                </TableCell>
                <TableCell align="left">{license.machineId}</TableCell>
                <TableCell align="left">
                  {new Date(license.date).toLocaleString()}
                </TableCell>
                <TableCell align="left">{license.license}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Dialog>
  );
};

export default CreateLicenceDialog;
