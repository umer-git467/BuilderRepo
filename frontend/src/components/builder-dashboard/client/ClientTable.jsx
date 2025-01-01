import React, { useState, useEffect } from "react";

function ClientTable({ searchTerm }) {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/Clientlist"); // Your backend API route
        const data = await response.json();
        setTableData(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching builder data:", error);
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = tableData.filter((row) =>
    row.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-gray-500">
        <thead className="text-white uppercase bg-gradient-to-r from-blue-500 to-purple-600">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">City</th>
            <th scope="col" className="px-6 py-3">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row) => (
              <tr key={row._id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {row.firstName} {row.lastName}
                </td>
                <td className="px-6 py-4">{row.email}</td>
                <td className="px-6 py-4">{row.city}</td>
                <td className="px-6 py-4">{row.phoneno}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ClientTable;
