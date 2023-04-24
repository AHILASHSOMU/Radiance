import React, { useEffect, useState } from "react";
import apiCalls from "../../EndPoints/AdminApiCalls";

function UsersTable() {
  const [allUsers, setAllUsers] = useState([]);
  const [updatedUsers, setUpdatedUser] = useState("");
  const [blockSuccess, setBlockSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await apiCalls.userDetails();
      setAllUsers(response.users);
    }
    fetchData();
  }, [blockSuccess]);


  const handleClickUserStatus = async (id) => {
    const userId = {
      id: id,
    };
    const result = await apiCalls.userStatusControl(userId);
    setBlockSuccess(!blockSuccess)
    setUpdatedUser(result.updatedUser);
  };

  return (
    <div>
      <table class="table caption-top">
        <caption>User Management</caption>
        <thead>
          <tr>
            <th scope="col">Users Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((data) => {
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
                      onClick={() => handleClickUserStatus(data._id)}
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

export default UsersTable;
