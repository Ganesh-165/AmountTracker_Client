import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import image from "../Images/Secure login-rafiki.svg";
import { FaGoogle } from "react-icons/fa";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,10}$/;
const Url = "/register";

function Register() {
  const userRef = useRef();

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

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidConfPassword(password === confPassword);
  }, [password, confPassword]);

  const onRegisterHandler = async(event) => {
    event.preventDefault();
    const response = await axios.post(Url,{email:email,password:password,username:username});
    if(response.data.success){
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
      setTimeout(()=>{
        navigate('/')
      },1500);
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
  };
  return (
    <div className="flex flex-row w-full">
      <ToastContainer/>
      <div className="w-1/2 max-w-3xl origin-top animate-image hidden lg:block">
        <img
          src={image}
          alt="Image"
          className="max-w-3xl my-auto relative rounded-3xl"
        />
      </div>
      <div className="min-h-screen flex w-full flex-col max-w-3xl origin-center animate-container">
        <div className="p-7 mx-0 my-auto relative w-full">
          <h1 className="text-3xl font-bold">
            Register to <br /> Create a Account
          </h1>
          <div className="mt-10 xl:mt-20">
            <form onSubmit={onRegisterHandler} className="flex flex-col gap-4">
              <label class="xl:text-xl text-xl text-black">
                Enter the Username
              </label>
              <input
                type="text"
                className="text-sm p-4 rounded-md"
                placeholder="Enter Here"
                ref={userRef}
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
                    ? "text-sm rounded-md p-1 relative bg-[#2a2185] text-slate-50"
                    : "left-[-9999px] absolute"
                }
              >
                4 to 24 characters. Must begin with a letter. Letters, numbers,
                underscores, hyphens allowed.
              </p>
              <label class="xl:text-xl text-xl text-black">
                Enter the Email
              </label>
              <input
                type="email"
                className="text-sm p-4 rounded-md"
                id="email"
                placeholder="Enter Here"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <label class="xl:text-xl text-xl text-black">
                Enter the Password
              </label>
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
                    ? " text-sm rounded-md p-1 relative bg-[#2a2185] text-slate-50"
                    : "left-[-9999px] absolute"
                }
              >
                6 to 10 characters. Must include uppercase and lowercase
                letters, a number and a special character. Allowed special
                characters: <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
              <label class="xl:text-xl text-xl text-black">
                Enter the ConformPassword
              </label>
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
                    ? "text-sm rounded-md p-1 relative bg-[#2a2185] text-slate-50"
                    : "left-[-9999px] absolute"
                }
              >
                Must match the first password input field.
              </p>
              <div className="flex flex-row justify-between mt-12 text-3xl my-auto">
                <button
                  type="submit"
                  className="h-14 w-56 bg-[#2a2185] inline-block rounded-xl text-white text-2xl"
                  disabled={
                    !validName || !validPassword || !validConfPassWord ? true : false
                  }
                >
                  Submit
                </button>
                <div className="my-auto w-14 flex flex-row  justify-center items-center h-14 rounded-full bg-slate-300 hover:cursor-pointer">
                  <FaGoogle />
                </div>
              </div>
              <p className="text-xl ">
                <NavLink to="..">Login Here!</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
