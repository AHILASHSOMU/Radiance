import React from "react";
import VendorRoutes from "./routes/VendorRoutes";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";


function App() {
  return (
    <>
    
      <UserRoutes />
      <VendorRoutes />
      <AdminRoutes />

  
     
    </>
  );
}

export default App;
