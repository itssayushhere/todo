/* eslint-disable react/prop-types */
const Error = ({ message }) => {
  return (
    <div className="w-full flex items-center justify-center bg-red-600 bg-opacity-20 p-2 rounded font-bold text-red-600 text-opacity-90">
      <p> ⚠️ {message} </p>
    </div>
  );
};

export default Error;
