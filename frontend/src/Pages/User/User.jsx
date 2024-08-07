import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import useFetchData from "../../Hooks/fetchdata";
import Loading from "../../utils/Loading.jsx";
import { toast } from "react-toastify";

const Error = lazy(() => import("../../utils/Error.jsx"));
const BackgroundLetterAvatars = lazy(() => import("../../Components/Avatar.jsx"));

const User = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [data, loading, error] = useFetchData(`${BASE_URL}/user/data`);

  useEffect(() => {
    if (Array.isArray(data?.goals)) { // Check if data is an array
      const count = data.goals.reduce((acc, item) => {
        return item.status === 'completed' ? acc + 1 : acc;
      }, 0);
      setCompleted(count);
    } else {
      setCompleted(0); // Ensure count is reset if data is not an array
    }
  }, [data]);

  const handleLogout = async () => {
    setLogout(true);
    try {
      const response = await fetch(`${BASE_URL}/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        dispatch({ type: "LOGOUT" });
        toast.success("Logout successful");
        navigate("/login");
      } else {
        const errorData = await response.json();
        toast.error(`Logout failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLogout(false);
    }
  };

  const stars = Array.from({ length: completed }, (_, index) => (
    <h1 key={index} className="">
      ⭐
    </h1>
  ));

  return (
    <Suspense fallback={<Loading />}>
      {loading && !error && <Loading />}
      {logout && !error && <Loading />}
      {error && !loading && <Error message={error} />}
      {!loading && !logout && !error && data && data.name && (
        <div className="sm:w-[700px] w-11/12 flex flex-col items-center justify-center mx-auto">
          <div className="flex flex-row items-center justify-between p-4 mt-2 w-full rounded-3xl bg-purple-600 bg-opacity-10">
            <div className="flex flex-row items-center gap-2">
              <div className="p-1 border-white border rounded-full sm:flex hidden border-opacity-60 bg-gray-900">
                <BackgroundLetterAvatars name={data.name} />
              </div>
              <div>
                <h1 className="font-mono rounded text-xl">{data.name}</h1>
                <h1 className="text-center">Age: {data.age}</h1>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-[9px] font-mono font-bold opacity-70">
                Complete Goals and get stars
              </h1>
              <div className="flex flex-wrap w-20 border-2 justify-center rounded bg-black bg-opacity-25 border-white border-opacity-20">
                {stars}
              </div>
            </div>
          </div>
          <div className="flex p-5 pl-10 items-center w-full">
            <div className="flex gap-1 items-center flex-wrap">
              <h1 className="text-lg font-semibold">About:</h1><span>{data.about}</span>
            </div>
          </div>
          <div className="w-full">
            <p>Goals:
              </p>
              <p></p>
          </div>
          <div>
            <button
              type="button"
              className="p-3 rounded-lg text-lg bg-red-600 text-white font-bold font-mono border-2 border-black border-opacity-65 hover:bg-red-800 hover:border-opacity-20 text-opacity-80 hover:text-opacity-100"
              onClick={handleLogout}
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
