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
    <div className="flex w-auto justify-center items-center mx-auto min-h-screen">
      {loading && !error && <Loading />}
      {!loading && (
        <div>
          <form onSubmit={submithandle}>
            <div className="flex mx-auto justify-center items-center p-3 text-xl font-bold">
              <h1>Register Now! And Save Your Records</h1>
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
                className="text-black px-7 py-2 rounded-lg border-2 border-gray-700"
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
                className="text-black px-7 py-2 rounded-lg border-2 border-gray-700"
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
                className="text-black px-7 py-2 rounded-lg border-2 border-gray-700"
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
                className="text-black px-7 py-2 rounded-lg border-2 border-gray-700"
                placeholder="Your Age"
              />
            </div>
            <button
              type="submit"
              className="p-2 bg-black text-white flex justify-center items-center mx-auto rounded"
            >
              Submit
            </button>
          </form>
          <div className="w-full flex justify-center items-center p-2">
            <h1>
              Already registered ?{" "}
              <button
                className=" text-blue-500 hover:text-blue-600"
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
