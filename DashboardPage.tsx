// pages/DashboardPage.tsx (Full-Featured Context Version)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueries } from '../context/QueryContext';

const DashboardPage: React.FC = () => {
  const { queries, loading, error } = useQueries(); // Get data from the central context
  const navigate = useNavigate();

  if (loading) {
    return <div className="p-8 text-center">Loading queries...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white dark:bg-dark rounded-lg shadow">
      <div className="p-4 border-b dark:border-gray-700/50">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Inbox</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* ... table head ... */}
          <tbody>
            {queries.length > 0 ? (
              queries.map(query => (
                <tr 
                  key={query.id} 
                  onClick={() => navigate(`/query/${query.id}`)} // This will navigate to the detail page
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-white">{query.sender}</td>
                  <td className="px-6 py-4 max-w-md truncate text-gray-600 dark:text-gray-300">{query.msg}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{query.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-10 text-gray-500">
                  No queries found. Use the "Connect a Brand" feature to add data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;