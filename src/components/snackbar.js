import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

export default function CustomizedSnackbars({ message, severity, timer, setShowAlert }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    } else {
      setShowAlert(false);
      setOpen(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ width: '100%',zIndex:"25000" }}>
      <Snackbar open={open} autoHideDuration={timer} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
