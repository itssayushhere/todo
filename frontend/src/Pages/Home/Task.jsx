/* eslint-disable react/prop-types */
import {  useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { CSSTransition } from "react-transition-group";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import DownIcon from "@mui/icons-material/KeyboardArrowDown";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";

const Task = ({ items }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col w-full items-center justify-center">
            <div className="sm:w-[700px] w-11/12 p-2 sm:m-2 border-b-2 border-black bg-black bg-opacity-25 rounded-xl text-white text-opacity-50 font-mono gap-3 flex items-center justify-between mt-1">
                <span className="ml-2">Tasks</span>
                <span className="mr-2">{formatDate(items.date)}</span>
            </div>
            {!open && (
                <button onClick={() => setOpen(true)}>
                    <DownIcon />
                </button>
            )}
            <CSSTransition
                in={open}
                timeout={300}
                classNames="task"
                unmountOnExit
            >
                <div className="sm:w-[700px] w-11/12 p-2 sm:m-2 m-2 bg-black bg-opacity-25 flex flex-col items-center rounded border-2 border-black border-opacity-20">
                    <ul className="w-full">
                        {items.input.map((item, index) => (
                            <li key={index} className="p-2 flex items-center justify-between">
                                <div className="flex">
                                    <p>{index + 1}.</p>
                                    <p>{item}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DoneIcon className="text-green-600 font-bold" />
                                    <DeleteIcon className="text-red-500 hover:text-red-800" />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setOpen(false)}>
                        <UpIcon />
                    </button>
                </div>
            </CSSTransition>
        </div>
    );
};

export default Task;
