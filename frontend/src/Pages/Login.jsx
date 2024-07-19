import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import Error from "../utils/Error";

const Login = () => {
  const navigate = useNavigate();
  //{-----------------------------useState-------------------------}
  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //{-------------------------------handleinput----------------}
  const handleinput = useCallback(
    (e) => {
      e.preventDefault();
      setError("");
      setUser({ ...user, [e.target.name]: e.target.value });
    },
    [user]
  );
  //{-----------------------submit-------------------------------------}
  const handlesubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError('')
      try {
        const response = await fetch(`${BASE_URL}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
          credentials: 'include', // Ensure cookies are included in the request
        });
        if (response.status === 200) {
          const result = await response.json();
          console.log(result.message);
        } else if (response.status === 401) {
          setError("Invalid Password");
        } else if (response.status === 404) {
          setError("User Not Found");
        } else {
          setError("An unexpected error occurred");
        }
      } catch (error) {
        setError("Network Error, Please try again");
      }
    },
    [user.email, user.password, setError] // Add setError to the dependency array
  );  
  //{----------------------return---------------------------}
  return (
    <div className="flex w-full mx-auto min-h-screen justify-center items-center">
      <div className="  ">
        <div className="flex items-center justify-center w-full text-2xl p-3">
          <h1>Welcome back!🎉</h1>
        </div>
        <div>{error && <Error message={error} />}</div>
        <form onSubmit={handlesubmit}>
          <div className=" p-5 relative flex flex-col">
            <label
              className="absolute text-white bg-grayColor top-0.5 left-4 px-4 rounded font-semibold"
              htmlFor="email"
            >
              Email :
            </label>
            <input
              autoComplete="on"
              type="email"
              name="email"
              id="email"
              value={user.email}
              className="text-black sm:w-96 w-72 h-10 px-4 rounded-lg border-2 border-gray-700"
              placeholder="Enter your Email"
              onChange={handleinput}
            />
          </div>
          <div className="p-5 relative flex flex-col">
            <label
              className="absolute text-white bg-grayColor top-0.5 left-4 px-4 rounded font-semibold"
              htmlFor="password"
            >
              Password :
            </label>
            <input
              autoComplete="on"
              type="password"
              name="password"
              id="password"
              value={user.password}
              className="text-black sm:w-96 w-72 h-10 px-4 rounded-lg border-2 border-gray-700"
              placeholder="Set Password"
              onChange={handleinput}
            />
          </div>
          <div className="flex justify-center items-center mb-3">
            <button className=" w-3/4 bg-gray-950 p-2 justify-center items-center font-semibold rounded-lg">
              Login
            </button>
          </div>
        </form>
        <div className="flex w-full items-center justify-end pr-5">
          <h1>
            New to here ?
            <button
              className="ml-2 hover:text-blue-700 text-blue-500"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
