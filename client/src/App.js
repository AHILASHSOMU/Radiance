import React from "react";
import VendorRoutes from "./routes/VendorRoutes";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { BrowserRouter } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>

      <UserRoutes />
      <VendorRoutes />
      <AdminRoutes />
      
    </BrowserRouter>
  );
}

export default App;
