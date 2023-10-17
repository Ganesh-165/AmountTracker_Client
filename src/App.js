import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import AddNewExpense from "./Pages/AddNewExpense";
import YearWiseTracking from "./Pages/YearWiseTracking";
import MonthWiseTracking from "./Pages/MonthWiseTracking";
import Home from "./Components/Home";
import YearExpensePage from "./Components/YearExpensePage";
import UpdateUserDetails from "./Pages/UpdateUserDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MonthExpensePage from "./Components/MonthExpensePage";
import ViewDetails from "./Pages/ViewDetails";
import DailyExpenseTracking from "./Pages/DailyExpenseTracking";
import Auth from "./Pages/Auth";
import Error from "./Pages/404";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<Auth/>}>
          <Route path="/username" element={<Home />}>
            <Route index element={<Dashboard />}></Route>
            <Route
              path="updateuserdetails"
              element={<UpdateUserDetails />}
            ></Route>
            <Route path="addnewexpense" element={<AddNewExpense />}></Route>
            <Route path="yearwisetracking">
              <Route index element={<YearWiseTracking />}></Route>
              <Route path=":year" element={<YearExpensePage />}></Route>
              <Route path="update" element={<ViewDetails />}></Route>
            </Route>
            <Route path="monthwisetracking">
              <Route index element={<MonthWiseTracking />}></Route>
              <Route path=":month" element={<MonthExpensePage />}></Route>
              <Route path="update" element={<ViewDetails />}></Route>
            </Route>
            <Route path="daywisetracking">
              <Route index element={<DailyExpenseTracking />}></Route>
              <Route path="update" element={<ViewDetails />}></Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Error/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
