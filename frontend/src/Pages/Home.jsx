import { useState } from "react";

export const Home = () => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [done, setDone] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault(); // Prevent form submission
    if (input.trim()) {
      // Prevent adding empty items
      setList([...list, input]);
      setInput("");
    }
  };

  const handleRemove = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleChecked = (index) => {
    const task = list[index];
    if (!done.includes(task)) {
      setDone([...done, task]);
    } else {
      setDone(done.filter((item) => item !== task));
    }
  };
  return (
    <div className="mt-24  ">
      <div className="text-center">
        <h1 className="text-2xl">Todo App</h1>
        <span className="text-gray-500">Create your own todo list</span>
        <form onSubmit={handleAdd} className="mt-4">
          <input
            type="text"
            className="bg-black border-2 border-white rounded-2xl p-2 sm:w-[500px]"
            value={input}
            autoFocus
            placeholder="Enter Your to-do"
            onChange={handleInputChange}
          />
          <button type="submit" className="p-2 border rounded-xl ml-2 bg-blue-950 text-white">
            Add
          </button>
        </form>
      </div>
      <div className="flex flex-col  justify-center items-center w-[350px] sm:w-[700px] mx-auto  p-2">
        {list &&
          list.map((item, index) => (
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
                    className="h-5 w-5 "
                  />
                </div>
                <span className="">{index + 1}</span>
                {done.includes(item) ? (
                  <span className=" line-through break-words overflow-x-auto">
                    {item}
                  </span>
                ) : (
                  <span className="break-words overflow-x-auto">{item}</span>
                )}
              </div>
              <div className=" col-span-1 text-right">
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
  );
};
