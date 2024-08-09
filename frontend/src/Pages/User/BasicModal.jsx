/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { formatDate } from "../../utils/formatDate";
import { useEffect } from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(0, 0, 0, 1)", // Black background with 80% opacity
  border: "2px solid rgba(255, 255, 255, 0.5)", // White border with 50% opacity
  boxShadow: 24,
  p: 4,
  color: "white",
  borderRadius: "15px", // Rounded border
};

export default function BasicModal({ contents ,refresh }) {
  const [dates, setDates] = useState("");
  const handleDelete = async (id) => {
    console.log(id)
    try {
      const response = await fetch(`${BASE_URL}/user/journal/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Corrected header key
        },
        credentials:"include"
      });
      if (response.ok) {
        toast.success("Deleted Successfully");
        refresh()
      } else {
        toast.error("Error deleting");
      }
    } catch (error) {
      toast.error(`Error ${error.message}`);
    }
  };
  
  useEffect(() => {
    const config = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // or false for 24-hour format
    };
    const date = new Date(contents.date);
    const newDate = new Date(contents.createdAt);
    if (formatDate(date) === formatDate(newDate)) {
      setDates(formatDate(newDate.toISOString(), config));
    } else {
      setDates(formatDate(date.toISOString()));
    }
  }, [contents.date, contents.createdAt]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="w-full">
      <button onClick={handleOpen} className="p-3 w-fit border-b-2 border-white border-opacity-65 bg-black bg-opacity-30 m-2 rounded-lg">{dates}</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between mb-4">
          <div className=" p-2 w-fit border-b-2 ">{dates}:</div>
          <p className="text-red-600" onClick={()=>handleDelete(contents._id)}>{<DeleteIcon/>}</p>
          </div>
          <div className="px-2 py-2 border-2 border-white border-opacity-60 rounded" dangerouslySetInnerHTML={{ __html: contents.data }} />
        </Box>
      </Modal>
    </div>
  );
}
