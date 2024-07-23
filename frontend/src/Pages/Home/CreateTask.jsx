import { useEffect, useState, useRef } from "react";

// eslint-disable-next-line react/prop-types
export const CreateTask = ({ add, close }) => {
  //@state and ref initialization
  const [input, setInput] = useState("");
  const [date,setDate] = useState("")
  const modalRef = useRef();
  //@handleinput
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  //@ Add Item to LocalStorage
  const addToArrayInLocalStorage = (object) => {
    let storedArray = JSON.parse(localStorage.getItem("list")) || [];
    const index = storedArray.findIndex(item => item.date === object.date);  
    if (index !== -1) {
      storedArray[index].input.push(input)
    } else {
      storedArray.push(object);
    }  
    localStorage.setItem("list", JSON.stringify(storedArray));
  };
  
  //@ Handle Add Button Click
  const handleAdd = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addToArrayInLocalStorage({date,input:[input]});
      setInput("");
      setDate("")
      add();
      close();
    }
  };
  

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
  //@return statement
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 blur bg-opacity-60"></div>
      <div
        ref={modalRef}
        className="relative z-10 flex flex-col border p-4 bg-gray-950 bg-opacity-60 rounded-2xl border-white border-opacity-55"
      >
        <div className="flex gap-3 items-center text-lg ">
          <label htmlFor="textarea" className=" text-2xl text-white text-opacity-90 ">
            Task:
          </label>
          <textarea
          id="textarea"
            value={input}
            onChange={handleInputChange}
            className="bg-black px-3 py-1 sm:w-96 sm:h-20 h-20 w-64 hide-scrollbar overflow-y-scroll rounded-xl border-2 border-opacity-15 border-white"
            placeholder="Enter here..."
            autoFocus
            autoComplete="on"
          ></textarea>
        </div>
        <div className=" mt-2 flex gap-3 items-center justify-end">
          <label htmlFor="date">Select Date:</label>
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className=" border-2 bg-gray-600 border-black  border-opacity-25 rounded-lg px-2 w-36 text-white text-opacity-80" />          
        </div>
        <div className="flex w-full items-center justify-center gap-6 mt-2">
          <button
            className="p-2 px-4 bg-purple-900 hover:bg-purple-950 focus:ring-zinc-100 focus:ring-2 mt-2 border-2 border-opacity-35 border-black    rounded-xl"
            onClick={close}
          >
            Close
          </button>
          <button
            className="p-2 px-5 bg-green-900 hover:bg-green-950 focus:ring-zinc-100 focus:ring-2 mt-2 border-2 border-opacity-35 border-black    rounded-xl"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
