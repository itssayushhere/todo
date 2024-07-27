/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import { formatDate } from "../../utils/formatDate";
import { CSSTransition } from "react-transition-group";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import DownIcon from "@mui/icons-material/KeyboardArrowDown";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import RemoveIcon from "@mui/icons-material/Remove";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { toast } from "react-toastify";

const Task = ({ items, recall }) => {
  //@ State initialization
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState("Present Tasks");
  const [done, setDone] = useState([]);
  const [count, setCount] = useState(0);
  const [edit, setEdit] = useState(false);
  const [current, setCurrent] = useState(0);
  const [editing, setEditing] = useState("");

  //@ Determine task date category
  useEffect(() => {
    const today = new Date();
    const taskDate = new Date(items.date);

    if (taskDate.toDateString() === today.toDateString()) {
      setDay("Present Tasks");
      setOpen(true);
    } else if (taskDate < today) {
      setDay("Past Tasks");
    } else {
      setDay("Future Tasks");
    }
  }, [items.date]);

  //@ Toggle task list open/close
  const toggleOpen = () => setOpen(!open);

  //@ Calculate the number of done tasks
  useEffect(() => {
    setCount(done.filter((item) => items.input.includes(item)).length);
  }, [done, items.input]);

  //@ Load done tasks from local storage
  useEffect(() => {
    const doneTasks = JSON.parse(localStorage.getItem("done")) || [];
    setDone(doneTasks);
  }, []);
  //task function
  const markTaskDone = (task) => {
    const doneArray = [...done, task];
    setDone(doneArray);
    localStorage.setItem("done", JSON.stringify(doneArray));
  };

  const unmarkTaskDone = (task) => {
    const doneArray = done.filter((item) => item !== task);
    setDone(doneArray);
    localStorage.setItem("done", JSON.stringify(doneArray));
  };
  //@Remove from local Storage
  const removeFromLocalStorage = (task, taskDescription) => {
    if (
      !window.confirm(
        `Are you sure you want to remove Task: (${taskDescription}) from Date: (${task.date})?`
      )
    ) {
      return; // Exit if the user cancels the confirmation
    }

    const storedTasks = JSON.parse(localStorage.getItem("list")) || [];
    const storedDone = JSON.parse(localStorage.getItem("done")) || [];

    if (storedDone.includes(taskDescription)) {
      const updatedDone = storedDone.filter((item) => item !== taskDescription);
      localStorage.setItem("done", JSON.stringify(updatedDone));
    }

    const dateIndex = storedTasks.findIndex((item) => item.date === task.date);
    if (dateIndex === -1) return; // Date not found, exit the function

    storedTasks[dateIndex].input = storedTasks[dateIndex].input.filter(
      (item) => item !== taskDescription
    );

    if (storedTasks[dateIndex].input.length === 0) {
      storedTasks.splice(dateIndex, 1);
    }

    localStorage.setItem("list", JSON.stringify(storedTasks));
    toast.success("Removed")
    recall();
  };
  //@Edit the task
  const handleEdit = useCallback(
    ({ date }, input) => {
      if (editing.trim() === "") {
        return setEdit(false);
      }

      const storedArray = JSON.parse(localStorage.getItem("list")) || [];
      const dateIndex = storedArray.findIndex((item) => item.date === date);
      if (dateIndex === -1) return;

      const inputIndex = storedArray[dateIndex].input.findIndex(
        (item) => item === input
      );
      if (inputIndex === -1) return;

      storedArray[dateIndex].input[inputIndex] = editing.trim();
      localStorage.setItem("list", JSON.stringify(storedArray));
      setEdit(false);
      setEditing("");
      setCurrent(0);
      recall();
    },
    [editing, recall]
  );
  //@Return statement
  return (
    <div className="flex flex-col w-full items-center justify-center my-1">
      <div
        className="sm:w-[700px] w-11/12 p-2 border-b-2 border-black bg-white bg-opacity-10 rounded-t-xl text-white text-opacity-70 font-mono gap-3 flex items-center justify-between mt-1 cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span
              className={
                day === "Present Tasks" ? "ml-2 text-white font-black" : "ml-2"
              }
            >
              {day}
            </span>
            ({count}/{items.input.length})
          </div>
          <span
            className={
              day === "Present Tasks" ? "ml-2 text-white font-black" : "ml-2"
            }
          >
            {formatDate(items.date)}
          </span>
        </div>
        <div>{open ? <UpIcon /> : <DownIcon />}</div>
      </div>
      <CSSTransition in={open} timeout={300} classNames="task" unmountOnExit>
        <div className="sm:w-[700px] w-11/12 p-2 bg-black bg-opacity-25 flex flex-col items-center border-2 border-black border-opacity-20 rounded-b-2xl">
          <ul className="w-full">
            {items.input.map((item, index) => (
              <li key={index} className="p-2 flex items-center justify-between">
                {done.includes(item) ? (
                  <div className="flex opacity-30">
                    <p>{index + 1}.</p>
                    <p>{item}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      <p>{index + 1}.</p>
                      {current === index && edit ? (
                        <p>
                          <input
                            type="text"
                            className="bg-black bg-opacity-0 text-white text-opacity-100 border px-2 sm:w-64 w-44 rounded border-white cursor-text"
                            value={editing}
                            onChange={(e) => setEditing(e.target.value)}
                            autoFocus
                          />
                        </p>
                      ) : (
                        <p>{item}</p>
                      )}
                    </div>
                    {current === index && edit ? (
                      <button
                        className="mb-1 opacity-75"
                        onClick={() => handleEdit(items, item)}
                      >
                        <DoneOutlinedIcon fontSize="small" />
                      </button>
                    ) : (
                      <button
                        className="mb-1 opacity-75"
                        onClick={() => {
                          setCurrent(index);
                          setEdit(true);
                          setEditing(item);
                        }}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </button>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-3">
                  {done.includes(item) ? (
                    <button
                      className="text-green-600"
                      onClick={() => unmarkTaskDone(item)}
                    >
                      <DoneIcon />
                    </button>
                  ) : (
                    <button type="button" onClick={() => markTaskDone(item)}>
                      <RemoveIcon className="text-green-600 font-bold" />
                    </button>
                  )}
                  <button onClick={() => removeFromLocalStorage(items, item)}>
                    <DeleteIcon className="text-red-500 hover:text-red-800" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Task;
