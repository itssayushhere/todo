import { lazy, Suspense } from "react";
import { useEffect, useState } from "react";
const CreateTask = lazy(() => import("./CreateTask"));
const Task = lazy(()=>import('./Task'))
const Home = () => {
  //@State intialization
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState([]);
  // const [done,setDone] = useState([])

  //@Restoring Value from localstorage
  const handletask = () => {
    let storedArray = JSON.parse(localStorage.getItem("list"));
    setTask(storedArray);
  };
  useEffect(() => {
    handletask();
  }, []);
  //@Removing value from localstorage
  const removeFromArrayInLocalStorage = (index) => {
    let storedArray = JSON.parse(localStorage.getItem("list")) || [];
    const updatedArray = storedArray.filter((_, i) => i !== index);
    localStorage.setItem("list", JSON.stringify(updatedArray));
    setTask(updatedArray);
  };
  const handleRemove = (index) => {
    let answer = confirm("Are you sure?");
    if (answer) {
      // User clicked OK
      removeFromArrayInLocalStorage(index);
    } else {
      return null;
    }
  };

  console.log(task);

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
        {task &&
          task.map((items) => (
            < >
              <Task items={items}/>
            </>
          ))}
      </div>
      <div>
        {open && <CreateTask add={handletask} close={() => setOpen(false)} />}
      </div>
      <div className="flex items-center w-full justify-center">
      </div>
    </Suspense>
  );
};
export default Home;
