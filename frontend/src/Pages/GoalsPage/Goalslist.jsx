/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {formatDate} from '../../utils/formatDate.js'
const Goalslist = ({data}) => {
    const [updated,setUpdated] = useState(false)
    useEffect(()=>{
        if(formatDate(data.createdAt) !== formatDate(data.updatedAt)){
            setUpdated(true)
        }
    },[data.createdAt,data.updatedAt])
  return (
    <div className="max-w-sm mx-auto bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-lg rounded-lg overflow-hidden my-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">🚩 Goal:</div>
        <p className="text-gray-300 text-base mb-4">{data.goal}</p>
        <div className="flex items-center mb-3">
          <p className="text-gray-400 text-sm">📅 Started At:</p>
          <span className="ml-2 text-gray-200 font-medium">{formatDate(data.createdAt)}</span>
        </div>
        {updated &&
        <div className="flex items-center mb-3">
          <p className="text-gray-400 text-sm">⏰ Updated At:</p>
          <span className="ml-2 text-gray-200 font-medium">{formatDate(data.updatedAt)}</span>
        </div>
        }
        <div className="flex items-center mb-3">
          <p className="text-gray-400 text-sm">🟢 Status:</p>
          <span className="ml-2 text-green-400 font-medium">{data.status}</span>
        </div>
        <div className="flex items-center">
          <p className="text-gray-400 text-sm">📅 Deadline:</p>
          <span className="ml-2 text-red-400 font-medium">{formatDate(data.deadline)}</span>
        </div>
      </div>
    </div>
  );
};

export default Goalslist;
