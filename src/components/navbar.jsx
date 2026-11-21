import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

import Logo from "./logo";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
      try {
        await axios.post( BASE_URL + "/logout", {}, {withCredentials: true});
        dispatch(removeUser());
        return navigate("/login");
      }
      catch (err) {
        console.error(err);
      }
    }
    console.log(user);
  return (
    <div><div className="navbar bg-[#0E1020] shadow-sm">
  <div className="flex-1">
    <Link to ="/" className="btn btn-ghost h-auto min-h-0 py-1 gap-3 hover:bg-transparent">
        <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
  <Logo size={42} />
  <span
    className="text-3xl leading-none tracking-tighter"
    style={{ fontFamily: "'JetBrains Mono', monospace" }}
  >
    <span className="font-medium text-white">Dev</span>
    <span className="font-extrabold" style={{ color: "#FF6FAE" }}>Tinder</span>
    <span
      className="font-extrabold"
      style={{ color: "#5EEAD4", animation: "blink 1.1s steps(1) infinite" }}
    >
      _
    </span>
  </span>
</Link>
  </div>
  <div className="flex gap-2">
   {user && (
      <div className="dropdown dropdown-end mx-5 flex tems-center gap -2">
       <p className="px-4 py-2">Welcome, {user.firstName}</p>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="User Photo"
              src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>)}
  </div>
</div></div>
  )
}

export default Navbar