/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { CSSTransition } from "react-transition-group";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import DownIcon from "@mui/icons-material/KeyboardArrowDown";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import RemoveIcon from "@mui/icons-material/Remove";
const Task = ({ items }) => {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState("Present Tasks");
  const [done, setDone] = useState([]);
  const [count,setCount] = useState(0)
  //@ Check if task is of Present , Future , past 
  useEffect(() => {
    const date = new Date();
    if (formatDate(items.date) == formatDate(date)) {
      setOpen(true);
    } else if (formatDate(items.date) < formatDate(date)) {
      setDay("Past Tasks");
    } else {
      setDay("Future Tasks");
    }
  }, [items.date]);
  const toogleopen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  //@Check how much is done
  useEffect(() => {
    const countDoneTasks = items.input.filter((item) => done.includes(item)).length;
    setCount(countDoneTasks);
  }, [done, items.input]);

  //@Checked task or done task function
  useEffect(() => {
    const donetask = JSON.parse(localStorage.getItem("done")) || [];
    setDone(donetask);
  }, []);
  const donetask = (done) => {
    const doneArray = JSON.parse(localStorage.getItem("done")) || [];
    doneArray.push(done);
    setDone(doneArray);
    localStorage.setItem("done", JSON.stringify(doneArray));
  };
  const notdonetask = (notdone) => {
    const doneArray = JSON.parse(localStorage.getItem("done"));
    const data = doneArray.filter((items) => items != notdone);
    setDone(data);
    localStorage.setItem("done", JSON.stringify(data));
  };
  const string = "Present Tasks"
  //@removeing list from localstorage
  return (
    <div className="flex flex-col w-full items-center justify-center my-1">
      <div
        className="sm:w-[700px] w-11/12 p-2  border-b-2 border-black bg-black bg-opacity-25 rounded-t-xl text-white text-opacity-70 font-mono gap-3 flex items-center justify-between mt-1 cursor-pointer"
        onClick={toogleopen}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span
              className={
                day == string
                  ? "ml-2 text-white font-extrabold "
                  : "ml-2 "
              }
            >
              {day}
            </span>
            ({count}/{items.input.length})
          </div>
          <span
            className={
              day == string ? "ml-2 text-white font-extrabold" : "ml-2 "
            }
          >
            {formatDate(items.date)}
          </span>
        </div>
        <div>{open ? <UpIcon /> : <DownIcon />}</div>
      </div>
      <CSSTransition in={open} timeout={300} classNames="task" unmountOnExit>
        <div className="sm:w-[700px] w-11/12 p-2  bg-black bg-opacity-25 flex flex-col items-center  border-2 border-black border-opacity-20 rounded-b-2xl">
          <ul className="w-full">
            {items.input.map((item, index) => (
              <li key={index} className="p-2 flex items-center justify-between">
                {done.includes(item) ?<div className="flex opacity-30">
                  <p>{index + 1}.</p>
                  <p>{item}</p>
                </div>:<div className="flex">
                  <p>{index + 1}.</p>
                  <p>{item}</p>
                </div> }
                <div className="flex items-center gap-3">
                  {done.includes(item) ? (
                    <button
                      className="text-green-600"
                      onClick={() => notdonetask(item)}
                    >
                      <RemoveIcon />
                    </button>
                  ) : (
                    <button type="button" onClick={() => donetask(item)}>
                      <DoneIcon className="text-green-600 font-bold" />
                    </button>
                  )}
                  <DeleteIcon className="text-red-500 hover:text-red-800" />
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
