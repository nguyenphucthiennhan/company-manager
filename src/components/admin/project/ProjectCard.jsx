import React from "react";
import { FaDollarSign, FaUserAlt } from "react-icons/fa"; // Thêm các icon

const ProjectCard = ({
  title,
  client,
  budget,
  progress,
  status,
  started,
  deadline,
  tasks,
  team,
}) => {
  return (
    <div className="rounded-lg p-6 border w-full max-w-md" style={{background: "#fff"}}>
      {/* Project Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-xl truncate">{title}</h3>
        <span
          className={`text-xs font-medium px-3 py-1 rounded ${
            status === "COMPLETED"
              ? "bg-green-100 text-green-800"
              : status === "INACTIVE"
              ? "bg-orange-100 text-orange-800"
              : status === "CRITICAL"
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Project Details */}
      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-1 flex items-center">
          <FaUserAlt className="mr-2" />
          <span className="font-medium">Client:</span> {client}
        </p>
        <p className="text-sm text-gray-700 mb-1 flex items-center">
          <FaDollarSign className="mr-2" />
          <span className="font-medium">Budget:</span> ${budget.toLocaleString()}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex text-sm text-gray-700 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              progress === 100 ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <p className="mb-22">
          <span className="font-medium">Started:</span> {started}
        </p>
        <p className="text-sm text-gray-700 mb-4">
          <span className="font-medium">Deadline:</span> {deadline}
        </p>

      {/* Team Members */}
      <div className="flex items-center mb-2">
        <div className="flex -space-x-2">
          {team.slice(0, 3).map((member, index) => (
            <img
              key={index}
              src={member.avatar}
              alt={`Team member ${index + 1}`}
              className="w-10 h-10 rounded-full border border-white"
            />
          ))}
          {team.length > 3 && (
            <div className="w-10 h-10 bg-gray-300 text-gray-600 flex items-center justify-center rounded-full">
              +{team.length - 3}
            </div>
          )}
        </div>
        <span className="text-sm font-medium text-gray-600">{tasks} Task</span>
      </div>
    </div>
  );
};

export default ProjectCard;
