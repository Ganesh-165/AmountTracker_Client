import React, { useState } from "react";
import Card from "../Ui/Card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useYear } from "../store/yearContext";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Url = "/additem";

const AddNewExpense = () => {
  const {auth} = useAuth();
  const userid = auth.userid;
  const {setBool} = useYear();
  const {bool} = useYear();
  const axios = useAxiosPrivate();

  const [name, setName] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(null);
  const [type, setType] = useState(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await axios.post(Url, {
      userid: userid,
      title: name,
      date: date,
      amount: amount,
      amounttype: type,
    });
    if(response.data.status){
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
      setBool(!bool);
    }
  };
  return (
    <Card>
      <h2 className="ml-16 xl:text-4xl text-2xl font-bold">Add New Expense</h2>
      <ToastContainer/>
      <form className="max-w-xl flex flex-col mt-20 ml-20 min-h-fit">
        <span className="text-lg">Enter the ExpenseName</span>
        <input
          type="text"
          placeholder="Enter Here"
          className="p-4 mt-3 text-slate-950 rounded-lg border-none"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <span className="text-lg mt-4">Enter the ExpenseAmount</span>
        <input
          type="number"
          placeholder="Enter Here"
          className="p-4 mt-3 text-slate-950 rounded-lg border-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <span className="text-lg mt-4">Enter the ExpenseDate</span>
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
          className="p-4 mt-3 text-slate-950 rounded-lg border-none"
          onChange={(e) => setType(e.target.value)}
        ></textarea>
        <button
          className="inline-block w-32 p-3 mt-20 bg-[#2a2185] text-white rounded-xl"
          disabled={!name || !date || !type || !amount}
          onClick={onSubmitHandler}
        >
          Add Expense
        </button>
      </form>
    </Card>
  );
};

export default AddNewExpense;
