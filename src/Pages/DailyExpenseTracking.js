import React, { useState } from "react";
import Card from "../Ui/Card";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Url = "/daywisetracking";
const DailyExpenseTracking = () => {
  const { auth } = useAuth();
  const userid = auth.userid;
  const [date, setDate] = useState(null);
  const [dateData, setDateData] = useState([]);
  const [bool, setBool] = useState(false);
  const axios = useAxiosPrivate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await axios.post(Url, {
      userid: userid,
      date: new Date(date),
    });
    console.log(response);
    setDateData(response.data.data);
    setBool(true);
  };

  return (
    <Card>
      <div className="flex xl:flex-row flex-col max-w-5xl justify-between xl:gap-0 gap-3">
        <h2 className="ml-20 xl:text-4xl text-2xl font-bold">
          DateWiseTracking
        </h2>
        <input
          type="date"
          className=" text-lg lg:ml-0 ml-20 px-2 h-10 rounded w-[200px]"
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <button
          className="bg-[#2a2185] text-white text-lg lg:ml-0 ml-20 px-2 h-10 rounded w-[200px]"
          disabled={!date ? true : false}
          onClick={onSubmitHandler}
        >
          Find Details
        </button>
      </div>
      {dateData.length > 0 && (
        <div>
          <div className="flex max-w-6xl p-3 mt-10 bg-[#2a2185]">
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
              {dateData.map((data) => (
                <TableData
                  key={data._id}
                  id={data._id}
                  date={data.date}
                  title={data.title}
                  amount={data.amount}
                  amounttype={data.amounttype}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {bool && dateData.length == 0 && (
        <p className="p-10 font-bold text-2xl">No Expenses Found</p>
      )}
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
  const axios = useAxiosPrivate();

  const onUpdateHandler = (event) => {
    event.preventDefault();
    navigate("/username/daywisetracking/update", {
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
export default DailyExpenseTracking;
