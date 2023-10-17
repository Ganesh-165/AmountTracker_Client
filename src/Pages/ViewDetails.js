import React, { useState } from "react";
import Card from "../Ui/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { useYear } from "../store/yearContext";

const Url = "/itemupdate";
const DeleteUrl = "/deleteitem";

const ViewDetails = () => {
  const { state } = useLocation();
  const [name, setName] = useState(state.title);
  const [amount, setAmount] = useState(state.amount);
  const [newdate, setDate] = useState(new Date(state.newDate));
  const [type, setType] = useState(state.amountType);
  const {bool,setBool} = useYear();
  const id = state.id;
  const date = new Date(state.newDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const newDate = `${day}/${month}/${year}`; 
  const navigate = useNavigate();
  const axios = useAxiosPrivate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await axios.patch(Url, {
      id: id,
      title: name,
      date: newdate,
      amount: amount,
      amounttype: type,
    });
    if (response.data.status) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setTimeout(()=>{
      navigate(-1);
      setBool(!bool);
    },1500)
  };
  const onCancelHandler = (event) => {
    event.preventDefault();
    navigate(-1);
  };
  const onDeleteHandler = async (event) => {
    event.preventDefault();
    await axios.post(DeleteUrl, {
      id: id,
    });
    navigate(-1);
    setBool(!bool);
  };
  return (
    <Card>
      <h2 className="ml-16 xl:text-4xl text-2xl font-bold">
        Update The Expense
      </h2>
      <ToastContainer />
      <form className="max-w-xl flex flex-col mt-20 ml-20 min-h-fit">
        <span className="text-lg">Enter the ExpenseName</span>
        <input
          type="text"
          placeholder="Enter Here"
          value={name}
          className="p-4 mt-3 text-slate-950 rounded-lg border-none"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <span className="text-lg mt-4">Enter the ExpenseAmount</span>
        <input
          type="number"
          placeholder="Enter Here"
          value={amount}
          className="p-4 mt-3 text-slate-950 rounded-lg border-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <span className="text-lg mt-4">Enter the ExpenseDate : Old Date {newDate}</span>
        <input
          type="date"
          placeholder="Enter Here"
          className="p-4 mt-3 text-slate-950 rounded-lg border-none"
          onChange={(e) => setDate(new Date(e.target.value))}
        ></input>
        <span className="text-lg mt-4">Enter the Description</span>
        <textarea
          type="text"
          placeholder="Enter Here"
          value={type}
          className="p-4 mt-3 text-slate-950 rounded-lg border-none"
          onChange={(e) => setType(e.target.value)}
        ></textarea>
        <div className="flex justify-between mt-10">
          <button
            className="inline-block w-32 p-3 bg-[#2a2185] text-white rounded-xl"
            disabled={!name || !date || !type || !amount}
            onClick={onSubmitHandler}
          >
            Update
          </button>
          <button
            className="inline-block w-32 p-3 bg-[#2a2185] text-white rounded-xl"
            onClick={onCancelHandler}
          >
            Cancel
          </button>
          <button
            className="inline-block w-32 p-3 mt bg-[#2a2185] text-white rounded-xl"
            onClick={onDeleteHandler}
          >
            Delete
          </button>
        </div>
      </form>
    </Card>
  );
};

export default ViewDetails;
