import React, { useEffect, useState } from "react";
import Card from "../Ui/Card";
import { NavLink, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const MonthExpensePage = () => {
  const location = useLocation();
  const year = location.state.year;
  const month = location.state.month;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = monthNames.indexOf(month);
  const { auth } = useAuth();
  const userid = auth.userid;
  const Url = `/singlemonth?id=${userid}&year=${year}&month=${monthIndex + 1}`;
  const [singleMonthData, setSingleMonthData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const axios = useAxiosPrivate();

  useEffect(() => {
    const getMonthData = async () => {
      try {
        const response = await axios.get(Url);
        setSingleMonthData(response.data.data);
        console.log(singleMonthData);
        setTotalAmount(0);
      } catch (err) {
        console.log("err");
      }
    };
    getMonthData();
  }, []);

  useEffect(() => {
    singleMonthData.forEach((year) => {
      setTotalAmount((prev) => prev + year.amount);
    });
  }, [singleMonthData]);

  return (
    <Card>
      {singleMonthData.length > 0 ? (
        <div>
          <div className="flex w-full p-3 bg-[#2a2185]">
            <div className="flex text-center text-white uppercase flex-shrink flex-grow basis-1/5 p-3">
              Expense
            </div>
            <div className="flex text-center text-white uppercase flex-shrink flex-grow basis-1/5 p-3">
              Amount
            </div>
            <div className="flex text-center text-white uppercase flex-shrink flex-grow basis-1/5 p-3">
              Type
            </div>
            <div className="flex text-center text-white uppercase flex-shrink flex-grow basis-1/5 p-3">
              Date
            </div>
            <div className="flex text-center text-white uppercase flex-shrink flex-grow basis-1/5 p-3">
              View Details
            </div>
          </div>
          <table className="w-full">
            <tbody>
              {singleMonthData.map((item) => (
                <TableData
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  amount={item.amount}
                  amounttype={item.amounttype}
                  date={item.date}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-2xl font-bold mt-3">No Expenses Found</p>
      )}
      <div className="flex justify-between w-3/4">
        <NavLink to="..">
          <button className="bg-[#2a2185] text-white w-auto px-2 h-8 rounded mt-3">
            Go Back
          </button>
        </NavLink>
        <h2 className="text-2xl font-bold mt-3">
          Total Amount : {totalAmount}
        </h2>
      </div>
    </Card>
  );
};

const TableData = (props) => {
  const date = new Date(props.date);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const newDate = `${day}/${month}/${year}`;
  const navigate = useNavigate();

  const onUpdateHandler = (event) => {
    event.preventDefault();
    navigate("/username/monthwisetracking/update", {
      state: {
        newDate: date,
        title: props.title,
        amount: props.amount,
        amountType: props.amounttype,
        id: props.id,
      },
    });
  };

  return (
    <tr className="flex p-3 w-full">
      <td className="flex text-center capitalize flex-shrink flex-grow basis-1/5 p-3">
        {props.title}
      </td>
      <td className="flex text-center capitalize flex-shrink flex-grow basis-1/5 p-3">
        {props.amount}
      </td>
      <td className="flex text-center capitalize flex-shrink flex-grow basis-1/5 p-3">
        {props.amounttype}
      </td>
      <td className="flex text-center capitalize flex-shrink flex-grow basis-1/5 p-3">
        {newDate}
      </td>
      <td className="flex text-center capitalize flex-shrink flex-grow basis-1/5 p-3 ">
        <button
          className="bg-[#2a2185] text-white w-auto px-2 h-8 rounded"
          onClick={onUpdateHandler}
        >
          Update Details
        </button>
      </td>
    </tr>
  );
};

export default MonthExpensePage;
