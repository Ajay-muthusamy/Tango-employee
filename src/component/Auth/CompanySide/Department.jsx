import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"; 
import { addDepartment, removeDepartment } from "../../redux/store";


const Department = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.organization.departments);
  const organization = useSelector((state) => state.organization.organization);
  const location = useSelector((state) => state.organization.location);
  const [departmentName, setDepartmentName] = useState("");

  const handleAddDepartment = () => {
    if (departmentName) {
      dispatch(addDepartment(departmentName));
      setDepartmentName(""); 
    }
  };

  const handleDeleteDepartment = (index) => {
    dispatch(removeDepartment(index));
  };

  const handleSubmit = async () => {
    const dataToSend = {
      organization,
      location,
      departments,
    };
    console.log(dataToSend);

    try {
      const response = await axios.post(" http://localhost:2323/tango/api/companydetails", dataToSend);
      console.log("Data submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="font-poppins p-5">
      <h1 className="text-2xl font-bold mb-5">Departments</h1>
      <div className="mb-5">
        <input
          type="text"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          placeholder="Enter department name"
          className="border-2 border-gray-300 rounded-md p-2 mr-2"
        />
        <button
          onClick={handleAddDepartment}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Department
        </button>
      </div>

      <table className="min-w-full border border-gray-300 mb-5">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Department Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{department}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDeleteDepartment(index)}
                  className="bg-red-600 text-white font-semibold py-1 px-3 rounded-md hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        className="bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
      >
        Submit
      </button>
    </div>
  );
};

export default Department;
