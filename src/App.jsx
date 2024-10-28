import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./component/Startpage/Start";
import Login from "./component/Auth/Login";
import CompanyCreate from "./component/Auth/CompanyCreate";
import OrganizationDetails from "./component/Auth/CompanySide/OrganizationDetails";
import Location from "./component/Auth/CompanySide/Location";
import Department from "./component/Auth/CompanySide/Department";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/companycreate" element={<CompanyCreate />}>
          <Route index element={<OrganizationDetails />} />
          <Route path="locations" element={<Location />} />
          <Route path="departments" element={<Department />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
