/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { formatDate } from '../../utils/formatDate';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor:"rgba(0, 0, 0, 1)", // Black background with 80% opacity
    border: '2px solid rgba(255, 255, 255, 0.5)', // White border with 50% opacity
    boxShadow: 24,
    p: 4,
    color: 'white',
    borderRadius: '15px', // Rounded border
  };
  
  export default function BasicModal({contents}) {
    const newdate = new Date()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <button onClick={handleOpen}>{formatDate(contents.date)}</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=' underline'>{formatDate(contents.date)}:</div>
        <div dangerouslySetInnerHTML={{ __html: contents.data }} />
        </Box>
      </Modal>
    </div>
  );
}
