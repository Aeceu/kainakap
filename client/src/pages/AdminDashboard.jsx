import VerifiedAndNoneVerified from "../components/charts/VerifiedAndNoneVerified";
import AdminUserChart from "../components/charts/AdminUserChart";
import AdminTable from "../components/tables/AdminTable";
import UserTable from "../components/tables/UserTable";
import UserModal from "../components/modals/userModal";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const AdminDashboard = () => {
  const { admin } = useContext(UserContext);
  return (
    <div className="w-full h-[calc(100vh-100px)] flex flex-col overflow-hidden">
      <div className="z-0 filter blur-[120px] opacity-50  bg-blue-500  rounded-full w-[500px] h-[500px] absolute left-[30%]" />
      <div className="z-0 filter blur-[120px] opacity-50  bg-violet-500  rounded-full w-[500px] h-[500px] absolute left-[5%] top-[20%]" />
      <div className="z-0 filter blur-[120px] opacity-50  bg-indigo-500  rounded-full w-[500px] h-[500px] absolute left-[0%] top-[30%]" />
      <div className="z-0 filter blur-[120px] opacity-50  bg-fuchsia-500  rounded-full w-[500px] h-[500px] absolute left-[-10%] top-[30%]" />
      <div className="z-0 filter blur-[120px] opacity-50  bg-pink-500  rounded-full w-[500px] h-[500px] absolute right-[5%] top-[20%]" />
      <div className="z-0 filter blur-[120px] opacity-50  bg-orange-500  rounded-full w-[500px] h-[500px] absolute right-[0%] top-[30%]" />
      <div className="z-10 w-full  h-full flex flex-col  items-center justify-center">
        <div className="w-3/4 h-3/4 rounded-md bg-white shadow-lg grid grid-cols-4 gap-2">
          <div className="w-full h-full flex flex-col gap-2 items-center p-8">
            <h1 className="w-full text-3xl text-center  text-orange-500">Admin's Profile</h1>
            <img
              src="/profile_img.png"
              alt="profile"
              className="rounded-full w-[140px] h-[140px] object-cover"
            />
            <span className="flex flex-col items-center leading-none">
              <h1 className="font-medium text-lg">{admin?.username}</h1>
            </span>
            <span className="w-full flex flex-col gap-2">
              <h1>
                <b>Name:</b> {admin?.firstName} {admin?.lastName}
              </h1>
              <h1>
                <b>Email:</b> {admin?.email}
              </h1>
              <h1>
                <b>Role:</b> {admin?.role}
              </h1>
              <h1>
                <b>Phone No.:</b> {admin?.phone}
              </h1>
            </span>
            <UserModal />
          </div>
          <div className="w-full col-span-3 flex flex-col items-center">
            <div className="w-full h-1/2 grid grid-cols-3 gap-2 p-4">
              <div className="h-full w-full rounded-md shadow-md border flex flex-col items-center">
                <h1 className="w-full py-2 text-center">Verified and Non-Verified Users</h1>
                <VerifiedAndNoneVerified />
              </div>
              <div className="w-full shadow-md border rounded-md col-span-2">
                <span className="flex items-center p-2">
                  <h1 className="w-full p-2 text-center">Verified and Non-Verified User</h1>
                </span>
                <UserTable />
              </div>
            </div>
            <div className="w-full h-1/2 grid grid-cols-3 gap-4 p-4">
              <div className="w-full col-span-2 shadow-md border">
                <AdminTable />
              </div>

              <div className="w-full h-full shadow-md border rounded-md p-2">
                <AdminUserChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
