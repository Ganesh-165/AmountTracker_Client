import React, { Fragment, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdUpdate } from "react-icons/md";
import { BiSolidAddToQueue } from "react-icons/bi";
import { BsCalendar2MonthFill } from "react-icons/bs";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { BsBarChartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Url = '/logout';

const Navbar = () => {
  const [bool,setBool] = useState(false);
  const {auth,setAuth} = useAuth();
  const username = auth.username;
  const userid = auth.userid;
  const axios= useAxiosPrivate();
  const  OpenBar = () => {
    setBool(!bool);
  }
  const navigate = useNavigate();
  const logOutHandler = async(event)=>{
    event.preventDefault();
    const response = await axios.post(Url,{userid:userid});
    if(response.status){
      setAuth({});
      navigate('/');
    }
  }
  return (
    <Fragment>
      <div className="absolute text-white text-4xl top-5 left-4 cursor-pointer" onClick={OpenBar} >
        <button>
          <GiHamburgerMenu className=" px-2 bg-[#2a2185] rounded-md"/>
        </button>
      </div>
      <nav className={( bool ? "fixed top-0 bottom-0 lg:left-0 p-2 w-80 overflow-y-auto text-center bg-[#2a2185] animate-navbar origin-left" : "fixed top-0 bottom-0 left-[-320px] lg:left-0 p-2 w-80 overflow-y-auto text-center bg-[#2a2185] animate-navbar origin-left")}>
        <button className="lg:hidden float-right cursor-pointer" onClick={OpenBar}>
          <IoCloseSharp className=" w-5 h-5 bg-slate-100 rounded-lg text-lg" />
        </button>
        <div className=" p-2.5 mt-1 flex flex-row items-center">
          <BiSolidUser className=" w-10 h-10 py-2 px-1 bg-slate-100 rounded-full text-lg" />
          <h2 className=" font-bold text-gray-200 text-xl w-48 p-3">
            <NavLink to="/username">{username}</NavLink>
          </h2>
        </div>
        <hr className=" my-2 text-slate-200" />
        <ul className="flex flex-col text-lg">
          <li className="mt-3 text-slate-200 cursor-pointer hover:bg-slate-400">
            <NavLink
              to="/username/updateuserdetails"
              className={({ isActive }) =>
                isActive
                  ? "p-2.5 flex flex-row w-full bg-slate-400"
                  : "p-2.5 flex flex-row w-full hover:scale-x-110 transition-all"
              }
            >
              <MdUpdate className=" mx-2 my-auto" />
              <span className="ml-5">Update User Details</span>
            </NavLink>
          </li>
          <li className="mt-3 text-slate-200 cursor-pointer hover:bg-slate-400">
            <NavLink
              to="/username/addnewexpense"
              className={({ isActive }) =>
                isActive
                  ? "p-2.5 flex flex-row w-full bg-slate-400"
                  : "p-2.5 flex flex-row w-full hover:scale-x-110 transition-all"
              }
            >
              <BiSolidAddToQueue className="mx-2 my-auto" />
              <span className="ml-5">Add New Expense</span>
            </NavLink>
          </li>
          <li className="mt-3 text-slate-200 cursor-pointer hover:bg-slate-400">
            <NavLink
              to="/username/yearwisetracking"
              className={({ isActive }) =>
                isActive
                  ? "p-2.5 flex flex-row w-full bg-slate-400"
                  : "p-2.5 flex flex-row w-full hover:scale-x-110 transition-all"
              }
            >
              <BsBarChartFill className="mx-2 my-auto" />
              <span className="ml-5">Year Wise Tracking</span>
            </NavLink>
          </li>
          <li className="mt-3 text-slate-200 cursor-pointer hover:bg-slate-400">
            <NavLink
              to="/username/monthwisetracking"
              className={({ isActive }) =>
                isActive
                  ? "p-2.5 flex flex-row w-full bg-slate-400"
                  : "p-2.5 flex flex-row w-full hover:scale-x-110 transition-all"
              }
            >
              <BsCalendar2MonthFill className="mx-2 my-auto" />
              <span className="ml-5">Month Wise Tracking</span>
            </NavLink>
          </li>
          <li className="mt-3 text-slate-200 cursor-pointer hover:bg-slate-400">
            <NavLink
              to="/username/daywisetracking"
              className={({ isActive }) =>
                isActive
                  ? "p-2.5 flex flex-row w-full bg-slate-400"
                  : "p-2.5 flex flex-row w-full hover:scale-x-110 transition-all"
              }
            >
              <BsCalendar2WeekFill className="mx-2 my-auto" />
              <span className="ml-5">Day Wise Tracking</span>
            </NavLink>
          </li>
          <li className="mt-3 text-slate-200 cursor-pointer hover:bg-slate-400">
            <button className="p-2.5 flex flex-row w-full hover:scale-x-110 transition-all"
            onClick={logOutHandler}>
              <RiLogoutBoxFill className="mx-2 my-auto" />
                <span className="ml-5">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
