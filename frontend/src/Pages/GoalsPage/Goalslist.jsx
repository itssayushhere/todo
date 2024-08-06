/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  formatDate,
  getCurrentDateFormatted,
  getDateFormatted,
} from "../../utils/formatDate.js";
import DeleteIcon from "@mui/icons-material/Delete";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
const Goalslist = ({ data, reload }) => {
  const [updated, setUpdated] = useState(false);
  const [edit, setEdit] = useState(false);
  const [work, setwork] = useState(false);
  const [input, setInput] = useState({
    goal: data.goal || "",
    status: data.status || "",
    deadline: data.deadline || "",
  });
  useEffect(() => {
    if (formatDate(data.createdAt) !== formatDate(data.updatedAt)) {
      setUpdated(true);
    }
  }, [data.createdAt, data.updatedAt]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleupdate = async (id) => {
    setwork(true);
    if (
      input.goal === data.goal &&
      input.status === data.status &&
      input.deadline === data.deadline
    ) {
      return setwork(false), setEdit(false);
    }
    try {
      const response = await fetch(`${BASE_URL}/goal/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal: input.goal,
          status: input.status,
          deadline: input.deadline,
        }),
        credentials: "include",
      });
      if (response.ok) {
        reload();
        setwork(false);
        toast.success("Updated");
        setEdit(false);
      } else {
        toast.error("try error");
        setEdit(false);
        setwork(false);
      }
    } catch (error) {
      toast.error("catch error");
      setEdit(false);
      setwork(false);
    }
  };
  const deletegoal = async (id) => {
    setwork(true);
    try {
      if (
        !window.confirm(
          `Are you sure you want to Delete the goal :${data.goal}?`
        )
      ) {
        return setwork(false); // Exit if the user cancels the confirmation
      }
  
      const response = await fetch(`${BASE_URL}/goal/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Removed Succesfully");
        reload();
        setwork(false);
        setEdit(false);
      }
    } catch (error) {
      toast.error("Error Removing");
      setwork(false);
      setEdit(false);
    }
  };
  return (
    <div className="max-w-sm mx-auto bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-lg rounded-lg overflow-hidden my-4 border border-white border-opacity-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-bold text-xl text-white">🚩 Goal:</div>
          <div className="flex items-center text-xs">
            <span>
              {edit ? (
                <select
                  name="status"
                  className="text-white font-bold bg-black bg-opacity-70 border-2 border-black border-opacity-60 rounded-md"
                  onChange={handleInput}
                  value={input.status}
                >
                  <option value="working">Working</option>
                  <option value="halfway">Halfway</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              ) : (
                <div className="font-bold text-sm font-mono ">
                  {data.status === "working" && (
                    <p className="text-green-700">Working 🖋️</p>
                  )}
                  {data.status === "failed" && (
                    <p className="text-red-500">Failed❌</p>
                  )}
                  {data.status === "completed" && (
                    <p className="text-blue-500">Completed🎊</p>
                  )}
                  {data.status === "halfway" && (
                    <p className="text-green-600">Halfway🌓</p>
                  )}
                </div>
              )}
            </span>
          </div>
        </div>
        <p className="text-gray-300 text-base mb-4">
          {edit ? (
            <input
              type="text"
              value={input.goal}
              className="bg-white bg-opacity-0 border border-black px-2 p-1 w-full rounded-lg"
              name="goal"
              onChange={handleInput}
            />
          ) : (
            data.goal
          )}
        </p>
        <div className="flex items-center mb-3">
          <p className="text-gray-400 text-sm">📅 Started At:</p>
          <span className="ml-2 text-gray-200 font-medium">
            {formatDate(data.createdAt)}
          </span>
        </div>
        {updated && (
          <div className="flex items-center mb-3">
            <p className="text-gray-400 text-sm">⏰ Updated At:</p>
            <span className="ml-2 text-gray-200 font-medium">
              {formatDate(data.updatedAt)}
            </span>
          </div>
        )}
        <div className="flex items-center">
          <p className="text-gray-400 text-sm">📅 Deadline:</p>
          <span className="ml-2 text-red-400 font-medium">
            {edit ? (
              <input
                type="date"
                value={getDateFormatted(input.deadline)}
                className="bg-white bg-opacity-0 border border-black border-opacity-50 p-1 rounded-lg"
                name="deadline"
                min={getCurrentDateFormatted()}
                onChange={handleInput}
              />
            ) : (
              formatDate(data.deadline)
            )}
          </span>
        </div>
        <div className="task flex items-center justify-end gap-2 mt-4">
          {edit ? (
            <div className="flex items-center justify-between w-full">
              <div></div>
              <button
                type="button"
                className="px-4 bg-gray-800 rounded-xl text-white border-2 border-white border-opacity-35 font-mono font-black ml-10"
                onClick={() => handleupdate(data._id)}
                disabled={work && true}
              >
                Done
              </button>
              <button type="button" className="text-red-600 " onClick={() => deletegoal(data._id)}
                disabled={work && true}>
                <DeleteIcon />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="px-4 bg-gray-800 rounded-xl text-white border-2 border-white border-opacity-35 font-mono font-black"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Goalslist;
