import { lazy, Suspense, useState } from "react";
import { BASE_URL } from "../../config.js";
import useFetchData from "../../Hooks/fetchdata.jsx";
import Loading from "../../utils/Loading.jsx";
const Error = lazy(() => import("../../utils/Error.jsx"));
import { Creategoal } from "./Creategoal.jsx";
import Goalslist from "./Goalslist.jsx";
export const Goals = () => {
  const [data, loading, error, refresh] = useFetchData(
    `${BASE_URL}/user/goals`
  );
  const [open, setOpen] = useState(false);
  return (
    <Suspense fallback={<Loading />}>
      {loading && !error && <Loading />}
      {error && !loading && <Error message={error} />}
      {!loading && !error && data && (
        <div className=" w-full  sm:w-[700px] mx-auto ">
          {data.length !== 0 ? (
            <div>
              {data.map((items) => (
                <div key={items._id}>
                  <Goalslist data={items} reload ={refresh} />
                </div>
              ))}
              <div className="flex items-center justify-center">
                <button
                  className="p-2 px-5 bg-purple-600 rounded-xl text-black border-2 border-white border-opacity-35 font-mono font-black hover:border-opacity-10 hover:bg-purple-900 transition duration-300 mb-3 "
                  type="button"
                  onClick={() => setOpen(true)}
                >
                  Add Goal
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col bg-black bg-opacity-40 p-2 my-6 rounded-2xl">
              <div className="w-11/12 p-3 text-center  rounded-xl my-2  opacity-85">
                <h1>
                  &quot;Are you human? Because we humans need goals to function
                  and live happily.
                  <br /> If yes, join the world by click on this button.&quot;
                </h1>
              </div>
              <div>
                <button
                  className="p-2 px-5 bg-purple-600 rounded-xl text-black border-2 border-white border-opacity-35 font-mono font-black hover:border-opacity-10 hover:bg-purple-900 transition duration-300 "
                  type="button"
                  onClick={() => setOpen(true)}
                >
                  Create Goal
                </button>
              </div>
            </div>
          )}
          {open && <Creategoal close={() => setOpen(false)} recall={refresh} />}
        </div>
      )}
    </Suspense>
  );
};
