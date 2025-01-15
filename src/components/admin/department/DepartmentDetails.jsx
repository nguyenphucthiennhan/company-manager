import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_PATH from '../../common/API_PATH';
import { useLocation } from 'react-router-dom';

function DepartmentsDetail() {
  const location = useLocation();
  const { departmentId } = location.state || {};
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      try {
        const response = await axios.post(
          `${API_PATH()}GetDepartmentById`,
          { DepartmentId: departmentId }
        );
        setDepartment(response.data);
      } catch (err) {
        if (err.response) {
          setError(`Server responded with status code ${err.response.status}`);
        } else if (err.request) {
          setError('No response received from server.');
        } else {
          setError(`Error setting up request: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentDetails();
  }, [departmentId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-8 bg-blue-50 h-screen">
      <div className="flex gap-8 flex-wrap">
        {/* Left Panel: Department Overview */}
        <div className="w-full px-5 p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
          <h2 className="text-4xl font-semibold text-blue-600 mb-6">
            Department: {department.departmentName}
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Description: <span className="text-blue-600">{department.description}</span>
          </p>
          
          {/* Manager Info */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Manager</h3>
            <div className="flex items-center mb-6">
              <img
                className="w-20 h-20 rounded-full border-4 border-blue-600 shadow-lg"
                src={'https://via.placeholder.com/150'}
                alt="Manager"
              />
              <div className="ml-6">
                <h4 className="text-xl font-semibold">{department.managerName || 'Not assigned'}</h4>
                <p className="text-sm text-gray-500">Department Manager</p>
              </div>
            </div>
          </div>

          {/* Employees List */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Employees</h3>
            <ul className="list-disc pl-6 space-y-2">
              {department.employees.$values.map((employee) => (
                <li key={employee.employeeId} className="text-sm text-gray-600">
                  {employee.firstName} {employee.lastName} - {employee.position}
                  <p className="text-xs text-gray-400">Joined: {employee.joiningDate}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Active Dates */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Active From</h3>
            <p className="text-sm text-gray-600">{department.activeFrom}</p>

            {department.activeTo && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Active To</h3>
                <p className="text-sm text-gray-600">{department.activeTo}</p>
              </div>
            )}
          </div>

          {/* Goals and Future Plans */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Goals and Future Plans</h3>
            <p className="text-sm text-gray-600">{department.goals || 'No specific goals available.'}</p>
          </div>

          {/* Financial Information */}
          {department.financialInfo && (
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Financial Information</h3>
              <p className="text-sm text-gray-600">Budget: {department.financialInfo.budget}</p>
              <p className="text-sm text-gray-600">Expenditure: {department.financialInfo.expenditure}</p>
              <p className="text-sm text-gray-600">Revenue: {department.financialInfo.revenue}</p>
            </div>
          )}

          {/* Documents and Resources */}
          {department.documents && department.documents.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Documents and Resources</h3>
              <ul className="list-disc pl-6 space-y-2">
                {department.documents.map((doc, index) => (
                  <li key={index} className="text-sm text-blue-600 hover:text-blue-800">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      {doc.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Department's History */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Department's History</h3>
            <ul className="list-disc pl-6 space-y-2">
              {department.history?.map((event, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {event.date} - {event.description}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Panel: Future Events and Activities */}
        <div className="w-full lg:w-1/3 p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
          <h3 className="font-semibold text-lg mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {department.upcomingEvents?.map((event) => (
              <div className="flex items-center space-x-2" key={event.id}>
                <div className="text-sm text-gray-500">{event.date}</div>
                <p className="text-sm text-gray-600 font-semibold">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentsDetail;
