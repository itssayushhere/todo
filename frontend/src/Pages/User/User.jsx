import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import useFetchData from "../../Hooks/fetchdata";
import Loading from "../../utils/Loading.jsx";
import { toast } from "react-toastify";
import Journal from "./Journal.jsx";

const Error = lazy(() => import("../../utils/Error.jsx"));
const BackgroundLetterAvatars = lazy(() =>
  import("../../Components/Avatar.jsx")
);

const User = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [data, loading, error,refresh,setError,setLoading] = useFetchData(`${BASE_URL}/user/data`);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({
    name: "",
    age: "",
    about: "",
  });

  const handleUpdate = async () => {
    if(input.name === data.name && input.age === data.age && input.about === data.about){
      return setEdit(false)
    }
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input.name,
          age: input.age,
          about: input.about,
        }),
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Updated Successfully");
        refresh()
      } else {
        toast.error("Failed to update. Please try again.");
        setLoading(false)
        setError("Try error")
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      setLoading(false)
      setError(error.message)
    }
  };

  useEffect(() => {
    if (Array.isArray(data?.goals)) {
      const count = data.goals.reduce((acc, item) => {
        return item.status === "completed" ? acc + 1 : acc;
      }, 0);
      setInput({
        name: data.name || "",
        age: data.age || "",
        about: data.about || "",
      });
      setCompleted(count);
    } else {
      setCompleted(0);
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
        localStorage.removeItem("content")
        navigate("/login");
      } else {
        const errorData = await response.json();
        toast.error(`Logout failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLogout(false);
    }
  };

  const stars = Array.from({ length: completed }, (_, index) => (
    <h1 key={index} className="text-yellow-400">
      ⭐
    </h1>
  ));

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
// console.log(data)
  return (
    <Suspense fallback={<Loading />}>
      {loading && !error && <Loading />}
      {logout && !error && <Loading />}
      {error && !loading && <Error message={error} />}
      {!loading && !logout && !error && data && data.name && (
        <div className="sm:w-[700px] w-11/12 flex flex-col items-center justify-center mx-auto bg-gray-800 text-gray-100 rounded-lg p-6">
          <div className="flex flex-row items-center justify-between p-4 w-full rounded-lg border-t-2 border-white border-op shadow-lg">
            <div className="flex flex-row items-center gap-4">
              <div className="p-2 border-white border rounded-full border-opacity-60 bg-gray-600 hidden sm:flex">
                <BackgroundLetterAvatars name={data.name} />
              </div>
              <div>
                <h1 className="font-mono text-2xl">
                  {edit ? (
                    <textarea
                      type="text"
                      value={input.name}
                      className="bg-black bg-opacity-0 border-white border px-2 rounded-lg border-opacity-30 w-full "
                      name="name"
                      onChange={handleInput}
                    />
                  ) : (
                    data.name
                  )}
                </h1>
                <h2 className="text-gray-400">
                  Age:{" "}
                  {edit ? (
                    <input
                      type="text"
                      value={input.age}
                      className="bg-black bg-opacity-0 border-white border-b px-2 rounded-lg border-opacity-30"
                      name="age"
                      onChange={handleInput}
                    />
                  ) : (
                    data.age
                  )}
                </h2>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xs font-mono text-center font-bold text-gray-400">
                Complete Goals and get stars
              </h1>
              <div className="flex flex-wrap w-20 border-2 justify-center rounded bg-gray-600 border-gray-500 p-2">
                {stars}
              </div>
            </div>
          </div>
          <div className="w-full p-4 rounded-lg mt-4">
            <div className="flex gap-2 items-center">
              <h1 className="text-lg font-semibold">About:</h1>
              {edit ? (
                <textarea
                  type="text"
                  value={input.about}
                  className="bg-black bg-opacity-0 border-white border px-2 rounded-lg border-opacity-30 w-full"
                  name="about"
                  onChange={handleInput}
                />
              ) : (
                <span className="text-gray-300 border-white border-b px-2 border-opacity-0">
                  {data.about}
                </span>
              )}
            </div>
          </div>
          <div className="w-full mt-4 rounded-lg">
            <div className="flex items-center justify-between p-4 rounded-t-lg border-2 border-white border-opacity-20 text-white font-bold font-mono">
              <p>
                Goals: ({completed}/{data.goals.length})
              </p>
              <button
                className="px-3 py-2 border rounded-lg bg-cyan-500 text-black font-bold font-mono hover:bg-cyan-600 border-gray-500"
                onClick={() => navigate("/goals")}
              >
                Add more
              </button>
            </div>
            <ul className="border rounded-b-lg p-4 border-gray-500">
              {data.goals.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-600"
                >
                  <div className="flex items-center gap-2">
                    <p>{index + 1}.</p>
                    <p>{item.goal}</p>
                  </div>
                  <div className="font-bold text-sm font-mono flex items-center">
                    {item.status === "working" && (
                      <p className="text-green-400">Working 🖋️</p>
                    )}
                    {item.status === "failed" && (
                      <p className="text-red-400">Failed ❌</p>
                    )}
                    {item.status === "completed" && (
                      <p className="text-blue-400">Completed 🎊</p>
                    )}
                    {item.status === "halfway" && (
                      <p className="text-yellow-400">Halfway 🌓</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <Journal entries={data.journal}/>
          </div>
          <div className="flex gap-4 items-center mt-6">
            <div>
              {edit ? (
                <button
                  className="px-4 py-2 rounded-lg text-md bg-green-600 text-white font-bold font-mono border-2 border-gray-500 hover:bg-green-500 transition-all duration-500"
                  onClick={() => {
                    setEdit(false);
                    handleUpdate();
                  }}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className="px-4 py-2 rounded-lg text-md bg-blue-600 text-white font-bold font-mono border-2 border-gray-500 hover:bg-blue-500 transition-all duration-500"
                  onClick={() => {setEdit(true)
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth', // Optional: adds smooth scrolling
                    });
                  }}
                >
                  Edit Profile
                </button>
              )}
            </div>

            <button
              type="button"
              className="px-4 py-2 rounded-lg text-lg bg-red-600 text-white font-bold font-mono border-2 border-gray-500 hover:bg-red-500"
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
