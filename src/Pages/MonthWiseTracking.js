import React, { useState } from "react";
import Card from "../Ui/Card";
import MonthCard from "../Ui/MonthCard";
import { useYear } from "../store/yearContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const MonthWiseTracking = () => {
  const [year, setYear] = useState(null);
  const {auth} = useAuth();
  const userid = auth.userid;
  const Url = `/singleyear?id=${userid}&year=:${year}`;
  const { uniqueYearsData } = useYear();
  const [singleYearMonthsData, setSingleYearMonthsData] = useState([]);
  const months = [
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
  const axios = useAxiosPrivate();

  const onYearChangeHandler = (event) => {
    setYear(event.target.value);
  };
  const onGetSingleYear = (event) => {
    event.preventDefault();
    getMonthDetails();
  };

  const getMonthDetails = async () => {
    const monthData = new Map();
    try {
      const response = await axios.get(Url);
      const responseData = await response.data.data;
      responseData.forEach((item) => {
        const month = new Date(item.date).getMonth();
        if (monthData.has(months[month])) {
          const existingItem = monthData.get(months[month]);
          existingItem.amount += item.amount;
          existingItem.noofitems += 1;
        }
        else{
          monthData.set(months[month],{amount:item.amount,noofitems:1});
        }
      });
      const singleYearMonthsDataArray = Array.from(
        monthData,
        ([month, { amount, noofitems }]) => ({ month, amount, noofitems })
      );
      setSingleYearMonthsData(singleYearMonthsDataArray);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      <div className="flex xl:flex-row flex-col max-w-5xl justify-between xl:gap-0 gap-3">
        <h2 className="ml-20 xl:text-4xl text-2xl font-bold">
          MonthWiseTracking
        </h2>
        <select
          className="w-[200px] ml-20 rounded bg-[#2a2185] text-white"
          onChange={onYearChangeHandler}
        >
          <option default hidden>
            Choose Year
          </option>
          {uniqueYearsData.map((singleYear) => (
            <option value={singleYear.year}>{singleYear.year}</option>
          ))}
        </select>
        <button
          className="bg-[#2a2185] text-white text-lg lg:ml-0 ml-20 px-2 h-10 rounded w-[200px]"
          onClick={onGetSingleYear}
          disabled={ !year ? true:false}
        >
          Find Details
        </button>
      </div>
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 ml-20 min-h-fit">
        {singleYearMonthsData.map((data) => (
          <MonthCard
            key={data.month}
            month={data.month}
            noofitems={data.noofitems}
            year={year}
            amount={data.amount}
          />
        ))}
      </div>
    </Card>
  );
};

export default MonthWiseTracking;
