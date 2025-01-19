import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/features/auth/authSlice";

const RegisterPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }))
      setUserName("")
      setPassword("")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-white text-center">Регистрация</h1>
      <label className="text-xs text-gray-400">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        ></input>
      </label>

      <label className="text-xs text-gray-400">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        ></input>
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center items-center text-xs text-white rounded-sm pu-w py-2 px-4 bg-slate-400"
        >          
          Подтвердить
        </button>
        <Link
          to="/register"
          className="flex justify-center items-center text-cs text-white"
        >
          Уже зарегистрирован
        </Link>
      </div>
    </form>
  );
};

export default RegisterPage;
