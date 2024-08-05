import { lazy, Suspense, useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import useFetchData from "../../Hooks/fetchdata";
import Loading from "../../utils/Loading.jsx";
import { toast } from "react-toastify";
const Error = lazy(() => import("../../utils/Error.jsx"));
const BackgroundLetterAvatars = lazy(() =>
  import("../../Components/Avatar.jsx")
);
const User = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  //@fetch userData
  const [data, loading, error] = useFetchData(`${BASE_URL}/user/data`);
  //@handleLogout
  const handlelogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 200) {
        dispatch({ type: "LOGOUT" });
        toast.success("Logout successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  //@rReturn Statement
  return (
    <Suspense>
      {loading && !error && <Loading />}
      {error && !loading && <Error message={error} />}
      {!loading && !error && data && data.name && (
        <div className="sm:w-[700px] w-11/12 flex flex-col items-center justify-center mx-auto">
          <div className="flex flex-row items-center justify-between  p-4 mt-2 w-full rounded-3xl bg-purple-600 bg-opacity-10">
            <div className="flex flex-row items-center gap-2">
              <div className="p-1 border-white border rounded-full sm:flex hidden border-opacity-60 bg-gray-900 ">
                <BackgroundLetterAvatars name={data.name} />
              </div>
              <div>
                <h1 className=" font-mono rounded text-xl">{data.name}</h1>
                <h1 className="text-center">Age:{data.age}</h1>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className=" text-[9px] font-mono font-bold opacity-70">
                Complete Goals and get star
              </h1>
              <div className="flex flex-wrap  w-20 border-2  justify-center rounded bg-black bg-opacity-25 border-white border-opacity-20">
                {data.goals.map((_, index) => (
                  <h1 key={index} className="">
                    ⭐
                  </h1>
                ))}
              </div>
            </div>
          </div>
          <div className="flex p-5 pl-10 items-center  w-full">
            <div className="flex gap-1 items-center flex-wrap">
              <h1 className="text-lg font-semibold">About:</h1><span>{data.about}</span>
            </div>
          </div>
          <div className="flex justify-start w-full ">
            <h1>Total Goals:{data.goals.length}</h1>
          </div>
          <div>
            <button
              type="button"
              className="p-3 rounded-lg text-lg bg-red-600  text-white font-bold font-mono border-2 border-black border-opacity-65 hover:bg-red-800 hover:border-opacity-20 text-opacity-80 hover:text-opacity-100"
              onClick={handlelogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default User;
