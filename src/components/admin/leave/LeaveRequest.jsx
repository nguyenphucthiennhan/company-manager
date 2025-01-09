import React, { useState } from 'react';

const LeaveRequestItem = ({ request, onApprove, onReject }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <tr key={request.id} className="transition-all duration-300 ease-in-out hover:bg-gray-100">
      <td className="border px-4 py-2">{request.name}</td>
      <td className="border px-4 py-2">{request.date}</td>
      <td className="border px-4 py-2">{request.reason}</td>
      <td className="border px-4 py-2">{request.status}</td>
      <td className="border px-4 py-2">
        <button
          onClick={() => onApprove(request.id)}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2 transition-all duration-300 hover:bg-green-700"
        >
          Duyệt
        </button>
        <button
          onClick={() => onReject(request.id)}
          className="bg-red-500 text-white px-4 py-2 rounded transition-all duration-300 hover:bg-red-700"
        >
          Từ chối
        </button>
        <button
          onClick={toggleDetails}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 transition-all duration-300 hover:bg-blue-700"
        >
          Xem chi tiết
        </button>
        {showDetails && (
          <div className="mt-4 p-4 bg-gray-200 rounded-md shadow-md">
            <p><strong>Lý do:</strong> {request.reason}</p>
            <p><strong>Ngày nghỉ:</strong> {request.date}</p>
            <p><strong>Trạng thái:</strong> {request.status}</p>
          </div>
        )}
      </td>
    </tr>
  );
};

export default LeaveRequestItem;
