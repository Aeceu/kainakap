import { useEffect, useState } from "react";
import axios from "../../api/axios";

const UserTable = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const res = await axios.get("/registeredAdmins");
        setAdmins(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        alert("ERROR!");
      }
    };
    // getAllAdmins();
  }, []);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, idx) => (
            <tr key={admin.id}>
              <th>{idx}</th>
              <td>
                {admin.firstName} {admin.lastName}{" "}
              </td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;
