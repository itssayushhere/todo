import { useCallback, useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import Error from "../../utils/Error";
// eslint-disable-next-line react/prop-types
export const Creategoal = ({ close, recall }) => {
  const modalRef = useRef();
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const dd = String(today.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };
  const [goal, setgoal] = useState({
    name: "",
    date: "",
  });
  const [error,setError] = useState(null)
  const CreateGoal = useCallback(async () => {
    if (goal.date.trim() === '' || goal.name.trim() === '') {
      return setError("Enter Input's first");
    }
  
    console.log(JSON.stringify({
      goal: goal.name.trim(),
      till: goal.date.trim(),
    }));
  
    try {
      const response = await fetch(`${BASE_URL}/goal/create`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goal: goal.name.trim(),
          till: goal.date.trim(),
        }),
        credentials: "include",
      });
  
      if (response.ok) {
        toast.success("Goal is Created");
        recall();
        close();
      } else {
        const result = await response.json();
        const errorMessage = result.message || "Other Problem exists";
        toast.error(errorMessage);
        setError("Please try again");
      }
    } catch (error) {
      setError(error.toString());
      console.error(error);
      toast.error("Not able to create");
    }
  }, [goal.date, goal.name, close, recall]);
  //@ Close Modal on Outside Click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);
  //@ Create a goal

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black blur bg-opacity-70"></div>
      <div
        ref={modalRef}
        className="relative  z-50 flex flex-col border-2 p-4 bg-gray-900  bg-opacity-90 rounded-2xl border-white border-opacity-45"
      >
        {error && <Error message={error}/>}
        <div className="border-b-2 border-white p-1 text-xl border-opacity-60">
          <h1>Enter the journey:</h1>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex gap-2 items-center justify-between w-full">
            <span className="text-lg border-b">PathName:</span>
            <textarea
              type="text"
              className="bg-black bg-opacity-55 px-3 py-1 rounded-lg border border-opacity-30 border-white w-11/12 hide-scrollbar sm:w-96"
              value={goal.name}
              name="name"
              onChange={(e) =>
                setgoal({ ...goal, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <span className="text-md">Should be Reached by :</span>
            <input
              type="Date"
              className="bg-black bg-opacity-55 px-3 py-1 rounded-lg border border-opacity-30 border-white "
              min={getTodayDate()}
              name="date"
              onChange={(e) =>
                setgoal({ ...goal, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="p-3 bg-blue-800 rounded-lg border border-white border-opacity-40 text-white font-semibold font-mono"
              onClick={CreateGoal}
            >
              Start Now
            </button>
            <button
              type="button"
              className="p-3 bg-red-600 rounded-lg border border-white border-opacity-60 font-mono font-semibold"
              onClick={() =>close()}
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
