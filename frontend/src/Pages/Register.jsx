import { useCallback, useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";
import Error from "../utils/Error";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submithandle = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${BASE_URL}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            name: user.name,
            age: parseInt(user.age, 10),
          }),
        });

        if (response.status === 200) {
          toast.success("Registration successful");
          setUser({
            name: "",
            email: "",
            password: "",
            age: "",
          });
          navigate("/login");
        } else if (response.status === 404) {
          setError("Email already exists");
        } else {
          const errorData = await response.json();
          setError(
            errorData.message || "Something went wrong. Please try again."
          );
        }
      } catch (error) {
        setError("Network error. Please try again.");
        setLoading(false);
      }
    },
    [navigate, user.age, user.email, user.name, user.password]
  );

  const handleinput = (e) => {
    setError('')
    setUser({ ...user, [e.target.name]: e.target.value.trim() });
  };

  return (
    <div className="flex w-auto justify-center items-center mx-auto  sm:mt-20 mt-5  ">
      {loading && !error && <Loading />}
      {!loading && (
        <div className="border-2 border-black border-opacity-30 p-4 rounded-2xl bg-slate-950 bg-opacity-40">
          <form onSubmit={submithandle}>
          <div className="  flex items-center justify-center w-full text-2xl pb-5 mb-2 border-b border-gray-800  p-2 ">
          <span className=" font-mono font-semibold text-teal-100 text-opacity-85 text-center">Register Now! And Save Your Records</span>
        </div>
            <div>{error && <Error message={error} />}</div>
            <div className="p-5 relative flex flex-col">
              <label
                className="absolute text-white bg-grayColor top-0 left-5 px-3 rounded"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                autoComplete="on"
                type="text"
                name="name"
                id="name"
                value={user.name}
                onChange={handleinput}
                className="px-7 py-2 rounded-lg border-2 border-gray-700 bg-black"
                placeholder="Your Name"
              />
            </div>
            <div className="p-5 relative flex flex-col">
              <label
                className="absolute text-white bg-grayColor top-0 left-5 px-3 rounded"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                autoComplete="on"
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleinput}
                className="text-white px-7 py-2 rounded-lg border-2 border-gray-700 bg-black"
                placeholder="Enter your Email"
              />
            </div>
            <div className="p-5 relative flex flex-col">
              <label
                className="absolute text-white bg-grayColor top-0 left-5 px-3 rounded"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                autoComplete="on"
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleinput}
                className="text-white px-7 py-2 rounded-lg border-2 border-gray-700 bg-black"
                placeholder="Set Password"
              />
            </div>
            <div className="p-5 relative flex flex-col">
              <label
                className="absolute text-white bg-grayColor top-0 left-5 px-3 rounded"
                htmlFor="age"
              >
                Age:
              </label>
              <input
                autoComplete="on"
                type="number"
                name="age"
                id="age"
                value={user.age}
                onChange={handleinput}
                className="text-white px-7 py-2 bg-black rounded-lg border-2 border-gray-700"
                placeholder="Your Age"
              />
            </div>
            <div className="w-full flex items-center justify-center">
            <button className=" w-3/4 bg-gray-700 p-2 justify-center items-center font-serif font-semibold rounded-lg border-2 border-black border-opacity-30 hover:scale-105 text-white hover:font-bold transform duration-300">
              Register
            </button>
              </div>
          </form>
          <div className="w-full flex justify-center items-center p-2">
            <h1>
              Already registered ?{" "}
              <button
                className=" text-blue-500 hover:text-sky-300 font-serif font-bold hover:underline transition duration-300"
                onClick={() => navigate("/login")}
              >
                Login now
              </button>
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
