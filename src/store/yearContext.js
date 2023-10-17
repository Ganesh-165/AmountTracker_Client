import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const Context = createContext();

const YearContext = ({ children }) => {
  const {auth} = useAuth();
  const userid = auth.userid;
  const Url = `/year?id=${userid}`;
  const [uniqueYearsData, setUniqueYearsData] = useState([]);
  const [bool,setBool] = useState(false);
  useEffect(() => {
    getyear();
  }, [bool]);

  const getyear = async () => {
    try {
      const response = await axios.get(Url);
      const responseData = await response.data.data;
      const yearMap = new Map();
      responseData.forEach((item) => {
        const year = new Date(item.date).getFullYear();
        if (yearMap.has(year)) {
          const existingItem = yearMap.get(year);
          existingItem.amount += item.amount;
          existingItem.numberOfItems += 1;
        } else {
          yearMap.set(year, {
            amount: item.amount,
            numberOfItems: 1,
          });
        }
      });
      const uniqueYearsArray = Array.from(
        yearMap,
        ([year, { amount, numberOfItems }]) => ({ year, amount, numberOfItems })
      );
      setUniqueYearsData(uniqueYearsArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Context.Provider value={{ uniqueYearsData , setBool, bool }}>{children}</Context.Provider>
  );
};

export default YearContext;

export const useYear = () => {
  return useContext(Context);
};
