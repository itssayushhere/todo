import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-800">
      <div className="flex flex-col items-center justify-center bg-gray-100 p-10 rounded-lg shadow-2xl shadow-gray-950">
        <div className="p-10 flex items-start">
          <h1 className="text-5xl font-serif font-bold text-teal-600 p-3 px-6">Wayto</h1>
        </div>
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Wayto</h1>
          <span className="text-lg text-gray-600">
            A Todo application that has various features like goal setting,
            daily tasks, and more..
          </span>
          <button
            type="button"
            className="mt-4 px-8 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
            onClick={()=>navigate('/home')}
          >
            Enter...
          </button>
        </div>
      </div>
    </div>
  );
};
