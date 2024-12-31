import { useEffect, useState } from "react";
import { LuExternalLink } from "react-icons/lu";

import BuilderProfile from "../BuilderProfile";

const ClientTableClietnDashborad = ({ searchTerm }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBuilder, setSelectedBuilder] = useState(null); // For storing the selected builder
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5006/Builderlist"); // Your backend API route
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
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        {filteredData.map((row) => (
          <tbody key={row.id}>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {row.firstName} {row.lastName}
              </td>
              <td className="px-6 py-4">{row.email}</td>
              <td className="px-6 py-4">{row.city}</td>
              <td className="px-6 py-4">{row.phoneno}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    setSelectedBuilder(row); 
                    setIsEditModalOpen(true);
                  }}
                  className="font-medium text-blue-600 hover:underline"
                >
                  <LuExternalLink className="inline-block mr-1" /> View
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      {selectedBuilder && (
        <BuilderProfile
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          builderData={selectedBuilder}
        />
      )}
    </div>
  );
};

export default ClientTableClietnDashborad;
