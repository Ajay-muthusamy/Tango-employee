import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOrganizationDetails } from "../../redux/store";

// Simulated file upload function - replace with your actual file upload logic
const uploadFile = async (file) => {
  // Simulate file upload delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(URL.createObjectURL(file)); // Replace with actual URL from your server
    }, 1000);
  });
};

const OrganizationDetails = () => {
  const [formData, setFormData] = useState({
    logo: null,  // URL for the uploaded logo
    companyName: "",
    website: "",
    organizationType: "",
    contactNumber: "",
    contactEmail: "",
    primaryAddress: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.logo) newErrors.logo = "Logo is required";
    if (!formData.companyName) newErrors.companyName = "Company Name is required";
    if (!formData.website) newErrors.website = "Website is required";
    if (!formData.organizationType) newErrors.organizationType = "Type of Organization is required";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact Number is required";
    if (!formData.contactEmail) newErrors.contactEmail = "Contact Email is required";
    if (!formData.primaryAddress) newErrors.primaryAddress = "Primary Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = await uploadFile(file);
      setFormData({ ...formData, logo: fileUrl }); // Store the URL instead of the file
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      
      dispatch(setOrganizationDetails(formData)); // Dispatch formData with logo URL
      navigate("/companycreate/locations");
      setFormData({
        logo: null,
        companyName: "",
        website: "",
        organizationType: "",
        contactNumber: "",
        contactEmail: "",
        primaryAddress: "",
      });
    }
  };

  return (
    <div className="font-poppins p-5">
      <h1 className="text-2xl font-bold mb-5">Basic Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="logo">
            Logo
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
          />
          {errors.logo && <p className="text-red-500 text-xs">{errors.logo}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="companyName">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
          />
          {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="website">
            Website
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
          />
          {errors.website && <p className="text-red-500 text-xs">{errors.website}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="organizationType">
            Type of Organization
          </label>
          <input
            type="text"
            id="organizationType"
            name="organizationType"
            value={formData.organizationType}
            onChange={handleChange}
            className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
          />
          {errors.organizationType && <p className="text-red-500 text-xs">{errors.organizationType}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="contactNumber">
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
          />
          {errors.contactNumber && <p className="text-red-500 text-xs">{errors.contactNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="contactEmail">
            Contact Email
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
          />
          {errors.contactEmail && <p className="text-red-500 text-xs">{errors.contactEmail}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="primaryAddress">
            Primary Address
          </label>
          <input
            type="text"
            id="primaryAddress"
            name="primaryAddress"
            value={formData.primaryAddress}
            onChange={handleChange}
            className="mt-1 block w-96 border-2 border-gray-300 rounded-md p-2"
          />
          {errors.primaryAddress && <p className="text-red-500 text-xs">{errors.primaryAddress}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-96 bg-black text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationDetails;
