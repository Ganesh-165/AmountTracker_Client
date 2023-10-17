import React, { useEffect, useState } from "react";
import Card from "../Ui/Card";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


const YearExpensePage = () => {
  const params = useParams();
  const {auth} = useAuth();
  const userid = auth.userid;
  const Url = `/singleyear?id=${userid}&year=${params.year}`;
  const [singleYearData, setSingleYearData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const axios = useAxiosPrivate();

  useEffect(() => {
    const getYearData = async () => {
      try {
        const response = await axios.get(Url);
        setSingleYearData(response.data.data);
        setTotalAmount(0);
      } catch (err) {
        console.log("err");
      }
    };
    getYearData();
  }, []);

  useEffect(() => {
    singleYearData.forEach((year) => {
      setTotalAmount((prev) => prev + year.amount);
    });
  }, [singleYearData]);
  return (
    <Card>
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
          Update Details
        </div>
      </div>
      <table className="w-full">
        <tbody>
          {singleYearData.map((item) => (
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
      <div className="flex justify-between w-3/4">
        <NavLink to="..">
          <button className="bg-[#2a2185] text-white w-auto px-2 h-8 rounded mt-3">
            Go Back
          </button>
        </NavLink>
        <h2 className="text-2xl font-bold mt-3">Total Amount : {totalAmount}</h2>
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

  const onUpdateHandler = (event)=>{
    event.preventDefault();
    navigate('/username/yearwisetracking/update',{state:{newDate:date,title:props.title,amount:props.amount,amountType:props.amounttype,id:props.id}});
  }

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
        <button className="bg-[#2a2185] text-white w-auto px-2 h-8 rounded"
        onClick={onUpdateHandler}>
          Update Details
        </button>
      </td>
    </tr>
  );
};

export default YearExpensePage;
