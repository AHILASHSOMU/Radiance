import React, { useEffect, useState } from "react";
import apiCalls from "../../EndPoints/AdminApiCalls";

function VendorsTable() {
  const [allVendors, setAllVendors] = useState([]);
  const [updatedVendors, setUpdatedVendor] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await apiCalls.vendorDetails();
      setAllVendors(response.vendors);
    }
    fetchData();
  }, [allVendors]);
  const handleClickVendorStatus = async (id) => {
    const vendorId = {
      id: id,
    };
    const result = await apiCalls.vendorStatusControl(vendorId);
    setUpdatedVendor(result.updatedVendor);
  };

  return (
    <div>
      <table class="table caption-top">
        <caption>Vendor Management</caption>
        <thead>
          <tr>
            <th scope="col">Vendors Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allVendors.map((data) => {
            return (
              <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phoneNumber}</td>
                <td>
                  {" "}
                  {data.is_blocked ? (
                    <span className="label label-default text-danger">
                      Blocked
                    </span>
                  ) : (
                    <span className="label label-default text-success">
                      Active
                    </span>
                  )}
                </td>
                <td>
                  <td>
                    <button
                      className={`btn ${
                        data.is_blocked ? "btn-success" : "btn-danger"
                      }`}
                      onClick={() => handleClickVendorStatus(data._id)}
                    >
                      {data.is_blocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default VendorsTable;
