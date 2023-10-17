import React from "react";
import Card from "../Ui/Card";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,10}$/;
const Url = "/update";

const UpdateUserDetails = () => {
  const {auth} = useAuth();
  const email = auth.email;
  const axios = useAxiosPrivate();

  const [username, setusername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setpassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confPassword, setConfPassword] = useState("");
  const [validConfPassWord, setValidConfPassword] = useState(false);
  const [confPasswordFocus, setConfPasswordFocus] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidConfPassword(password === confPassword);
  }, [password, confPassword]);

  const onsubmitHandler = async(event)=>{
    event.preventDefault();
    const response = await axios.patch(Url,{username:username,password:password,email:email});
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
      setusername('');
      setConfPassword('');
      setpassword('');
    }
    else{
      toast.error(response.data.message, {
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
  }

  return (
    <Card>
      <h2 className="ml-20 xl:text-4xl text-2xl font-bold">
        Update User Details
      </h2>
      <ToastContainer/>
      <form className="max-w-xl flex gap-4 flex-col mt-20 ml-20 min-h-fit">
        <span className="text-lg mt-4">Enter the New UserName</span>
        <input
          type="text"
          className="text-sm p-4 rounded-md"
          placeholder="Enter Here"
          autoComplete="off"
          aria-invalid={validName ? false : true}
          onChange={(e) => setusername(e.target.value)}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          required
        ></input>
        <p
          className={
            userFocus && username && !validName
              ? "text-sm rounded-md mt-2 p-1 relative bg-[#2a2185] text-slate-50"
              : "left-[-9999px] absolute"
          }
        >
          4 to 24 characters. Must begin with a letter. Letters, numbers,
          underscores, hyphens allowed.
        </p>
        <span className="text-lg mt-4">Enter the New PassWord</span>
        <input
          type="password"
          className=" text-sm p-4 rounded-md"
          aria-invalid={validPassword ? false : true}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter Here"
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          value={password}
          required
        ></input>
        <p
          className={
            passwordFocus && !validPassword
              ? " text-sm rounded-md p-1 mt-2 relative bg-[#2a2185] text-slate-50"
              : "left-[-9999px] absolute"
          }
        >
          6 to 10 characters. Must include uppercase and lowercase letters, a
          number and a special character. Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>
        <span className="text-lg mt-4">Enter the New ConformPassWord</span>
        <input
          type="password"
          className=" text-sm p-4 rounded-md"
          value={confPassword}
          aria-invalid={validConfPassWord ? false : true}
          onChange={(e) => setConfPassword(e.target.value)}
          placeholder="Enter Here"
          onFocus={() => setConfPasswordFocus(true)}
          onBlur={() => setConfPasswordFocus(false)}
          required
        ></input>
        <p
          className={
            confPasswordFocus && !validConfPassWord
              ? "text-sm rounded-md p-1 mt-2 relative bg-[#2a2185] text-slate-50"
              : "left-[-9999px] absolute"
          }
        >
          Must match the first password input field.
        </p>
        <button className="inline-block w-32 p-3 mt-10 bg-[#2a2185] text-white rounded-xl"
         disabled={
          !validName || !validPassword || !validConfPassWord ? true : false
        }
        onClick={onsubmitHandler}>
          Update
        </button>
      </form>
    </Card>
  );
};

export default UpdateUserDetails;
