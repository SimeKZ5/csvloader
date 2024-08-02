import { Dialog, TextField } from "@mui/material";

interface CreateLicenceDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateLicenceDialog = ({ open, onClose }: CreateLicenceDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <TextField
        label="Upiši ime"
        onChange={(e) => console.log(e.target.value)}
      />
    </Dialog>
  );
};

export default CreateLicenceDialog;
