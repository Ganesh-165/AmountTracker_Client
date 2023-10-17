import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import YearContext from "../store/yearContext";

const Home = () => {
  return (
    <YearContext>
      <Outlet />
      <Navbar />
    </YearContext>
  );
};

export default Home;
