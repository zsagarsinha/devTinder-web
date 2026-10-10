import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${BASE_URL}/login`, {
      email:emailId,
      password,
    },{withCredentials : true}
);
    dispatch(addUser(res.data));
    navigate("/")
  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="flex justify-center items-center my-20">
      <div className="card bg-base-300 w-96 shadow-xl">
        <form className="card-body" onSubmit={handleLogin}>
          <h2 className="card-title justify-center text-2xl mb-2">Login</h2>

          <label className="input input-bordered flex items-center gap-2">
            <span className="opacity-60">✉️</span>
            <input
              type="email"
              className="grow"
              placeholder="Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <span className="opacity-60">🔒</span>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className="card-actions justify-center mt-4">
            <button type="submit" className="btn btn-primary w-full" onClick={handleLogin}>
              Login
            </button>
          </div>

          <p className="text-center text-sm mt-2">
            New to DevTinder?{" "}
            <a className="link link-primary">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;