
import React from 'react';
import './Project.css';

function ProjectDetail() {
  return (
    <div className="container mx-auto p-8 bg-blue-50">
      <div className="flex justify-between items-start gap-8">
        
        {/* Left Panel: Project Overview */}
        <div className="w-3/2 p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
          <h2 className="text-4xl font-semibold text-blue-600 mb-6">Project: Software Migration and Refactoring</h2>
          <p className="text-lg text-gray-700">Status: <span className="text-blue-600">IN PROGRESS</span></p>

          {/* Project Manager Info */}
          <div className="flex items-center mt-6">
            <img
              className="w-16 h-16 rounded-full border-4 border-blue-600 shadow-lg hover:scale-110 transition-all duration-300"
              src="https://via.placeholder.com/150"
              alt="Project Manager"
            />
            <div className="ml-6">
              <h3 className="text-2xl font-semibold text-gray-800">Shantian Mekalan</h3>
              <p className="text-sm text-gray-500">Project Manager</p>
            </div>
          </div>

          {/* Project Info */}
          <div className="flex items-center justify-between mt-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-700">Tasks Overview</h3>
              <p className="text-sm text-gray-500">Total tasks completed and pending</p>
            </div>
            <div>
              <select className="border p-3 rounded-md text-gray-700 focus:ring-blue-500 focus:outline-none">
                <option value="March 2022">March 1 - 31, 2022</option>
                <option value="April 2022">April 1 - 30, 2022</option>
              </select>
            </div>
          </div>

          {/* Project Timeline */}
          <div className="mt-8 bg-blue-100 p-12 h-56 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105">
            <p className="text-center text-gray-500 font-semibold">Project Timeline (Graph goes here)</p>
          </div>

          {/* Workload and Progress */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Workload (Last 7 Days)</h3>
            <div className="flex justify-between items-center">
              <div className="w-3/4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      Shantian Mekalan
                    </span>
                  </div>
                  <div className="flex mb-2 items-center justify-between">
                    <div className="w-8/12">
                      <div className="relative pt-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-semibold inline-block py-1 px-2 text-blue-600 bg-blue-100">Progress: 80%</span>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between">
                            <div className="w-8/12 bg-blue-100 rounded-full h-2">
                              <div className="bg-blue-600 rounded-full h-2" style={{ width: '80%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h5 className="text-sm font-medium text-gray-600">Team Members</h5>
                <div className="flex items-center gap-3">
                  <img className="w-12 h-12 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300" src="https://via.placeholder.com/150" alt="Team Member" />
                  <img className="w-12 h-12 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300" src="https://via.placeholder.com/150" alt="Team Member" />
                  <img className="w-12 h-12 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300" src="https://via.placeholder.com/150" alt="Team Member" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Recent Tasks</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Updating backend API to support new features</li>
              <li className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Refactoring frontend code for scalability</li>
              <li className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Setting up unit tests for the refactored modules</li>
              <li className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Testing database migrations on staging</li>
            </ul>
          </div>

          {/* Project Overview */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Project Overview</h3>
            <p className="text-sm text-gray-600">
              The software migration project is currently ongoing, involving the refactoring of the backend and frontend systems. The team is focused on optimizing code, improving the user interface, and ensuring robust testing and deployment processes.
            </p>
          </div>
        </div>

        {/* Right Panel: Recent Activity */}
        <div className="w-1/3 p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
          <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500">25 Dec, 2023</div>
              <p className="text-sm text-gray-600 font-semibold">Implemented new feature: Data Migration Tool</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500">28 Dec, 2023</div>
              <p className="text-sm text-gray-600 font-semibold">Reviewed and merged code for frontend refactor</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500">02 Jan, 2024</div>
              <p className="text-sm text-gray-600 font-semibold">Database Migration Successful on Staging</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500">04 Jan, 2024</div>
              <p className="text-sm text-gray-600 font-semibold">Setup Continuous Integration for Testing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Files Section */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">Files</h3>
        <div className="flex items-center space-x-4">
          <img className="w-16 h-16 rounded-lg shadow-lg" src="https://via.placeholder.com/150" alt="File" />
          <div>
            <p className="text-sm text-gray-600">migration_plan_v1.pdf</p>
            <p className="text-xs text-gray-500">2.3 MB | Shantian Mekalan | 05th Jan, 2024</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <img className="w-16 h-16 rounded-lg shadow-lg" src="https://via.placeholder.com/150" alt="File" />
          <div>
            <p className="text-sm text-gray-600">backend_refactor_documentation.docx</p>
            <p className="text-xs text-gray-500">1.1 MB | Shantian Mekalan | 05th Jan, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
