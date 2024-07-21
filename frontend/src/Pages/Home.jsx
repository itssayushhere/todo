import { useEffect, useState } from "react";

const Home = () => {
  //@ State Initialization
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [done, setDone] = useState([]);

  //@ useEffect to Load Initial Data
  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem("list")) || [];
    setList(storedArray);
  }, []);

  //@ Handle Input Change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  //@ Add Item to LocalStorage
  const addToArrayInLocalStorage = (item) => {
    let storedArray = JSON.parse(localStorage.getItem("list")) || [];
    storedArray.push(item);
    localStorage.setItem("list", JSON.stringify(storedArray));
    setList(storedArray);
  };

  //@ Remove Item from LocalStorage
  const removeFromArrayInLocalStorage = (index) => {
    let storedArray = JSON.parse(localStorage.getItem("list")) || [];
    const updatedArray = storedArray.filter((_, i) => i !== index);
    localStorage.setItem("list", JSON.stringify(updatedArray));
    setList(updatedArray);
  };

  //@ Handle Add Button Click
  const handleAdd = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addToArrayInLocalStorage(input);
      setInput("");
    }
  };

  //@ Handle Remove Button Click
  const handleRemove = (index) => {
    removeFromArrayInLocalStorage(index);
  };

  //@ Handle Checkbox Change
  const handleChecked = (index) => {
    const task = list[index];
    if (!done.includes(task)) {
      setDone([...done, task]);
    } else {
      setDone(done.filter((item) => item !== task));
    }
  };

  //@ Render Component
  return (
    <div className="w-full min-h-screen flex items-start justify-center mt-24">
      <div>
      <div className="text-center">
        <h1 className="text-2xl">Todo App</h1>
        <span className="text-gray-500">Create your own todo list</span>
        <form onSubmit={handleAdd} className="mt-4">
          <input
            type="text"
            className="bg-black border-2 border-white rounded-2xl p-3 sm:w-[500px]"
            value={input}
            autoFocus
            placeholder="Enter Your to-do"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="p-2 border rounded-xl ml-2 bg-blue-950 text-white"
          >
            Add
          </button>
        </form>
      </div>
      <div className="flex flex-col justify-items-center items-center w-[350px] sm:w-[700px] mx-auto p-2">
        {list.map((item, index) => (
          //@ List Item
          <div
            key={index}
            className="grid grid-cols-3 gap-4 w-full items-center p-2"
          >
            <div className="flex items-center gap-3 grid-cols-subgrid col-span-2">
              <div>
                <input
                  type="checkbox"
                  checked={done.includes(item)}
                  onChange={() => handleChecked(index)}
                  className="h-5 w-5"
                />
              </div>
              <span>{index + 1}</span>
              <span
                className={
                  done.includes(item)
                    ? "line-through break-words overflow-x-auto"
                    : "break-words overflow-x-auto"
                }
              >
                {item}
              </span>
            </div>
            <div className="col-span-1 text-right">
              <button
                onClick={() => handleRemove(index)}
                className="mx-auto bg-red-500 text-white p-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};
export default Home;
