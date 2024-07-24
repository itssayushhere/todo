import { lazy, Suspense } from "react";
import { useEffect, useState } from "react";
import CreateTask from './CreateTask.jsx'
const Task = lazy(() => import("./Task"));
const Home = () => {
  //@State intialization
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState([]);
  // const [done,setDone] = useState([])

  //@Restoring Value from localstorage
  const handletask = () => {
    let storedArray = JSON.parse(localStorage.getItem("list")) || [];
    const sortedData = storedArray.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setTask(sortedData);
  };
  useEffect(() => {
    handletask();
  }, []);

  //@return statement
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className=" relative top-0  w-full  flex items-center flex-col   justify-start mx-auto ">
        <div className=" fixed bottom-10 flex items-center justify-end w-full mr-10 z-50">
          <button
            type="button"
            className="border px-[19px] py-3 rounded-full bg-purple-900 border-black border-opacity-40 shadow shadow-gray-400 font-bold text-2xl font-serif hover:scale-105 hover:bg-purple-950 "
            onClick={() => setOpen(true)}
          >
            +
          </button>
        </div>
        {task.length == 0 ? (
          <div className="w-full flex items-center justify-center ">
            <div className="sm:w-[700px] w-11/12 p-2 sm:m-2 border-2 border-black bg-black bg-opacity-25 rounded-xl text-white text-opacity-80 font-mono gap-3 flex items-center justify-center mt-2 flex-col text-center">
              <p className=" border-b-2 px-3 border-white border-opacity-60">
                No Tasks
              </p>
              <p>Create a task by clicking on the bottom add button</p>
            </div>
          </div>
        ) : (
          task.map((items, index) => (
            <div key={index} className="w-full">
              <Task items={items} />
            </div>
          ))
        )}
      </div>
      <div>
        {open && <CreateTask add={handletask} close={() => setOpen(false)} />}
      </div>
      <div className="flex items-center w-full justify-center"></div>
    </Suspense>
  );
};
export default Home;
