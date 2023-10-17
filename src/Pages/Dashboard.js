import React from "react";
import Card from "../Ui/Card";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const {auth} = useAuth();
  return (
    <Card>
      <h2 className='ml-20 xl:text-4xl text-2xl font-bold'>Welcome DashBoard</h2>
      <div className="ml-20 p-2 flex flex-col max-w-xl gap-4 mt-20 bg-white rounded-xl shadow-md shadow-[#2a2185]">
        <div className="p-2 text-lg ">
          <h3>UserName</h3>
          <h3>{auth.username}</h3>
        </div>
        <div className="p-2 text-lg ">
          <h3>Email</h3>
          <h3>{auth.email}</h3>
        </div>
      </div>
    </Card>
  );
};

export default Dashboard;
