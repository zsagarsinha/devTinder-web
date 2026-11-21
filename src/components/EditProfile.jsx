import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center items-start mt-10 mb-24 gap-8 flex-wrap">
        <div className="card bg-base-300 w-96 shadow-xl">
          <form className="card-body" onSubmit={saveProfile}>
            <h2 className="card-title justify-center text-2xl mb-2">
              Edit Profile
            </h2>

            <label className="form-control w-full">
              <span className="label-text mb-1">First Name</span>
              <input
                type="text"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">Last Name</span>
              <input
                type="text"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">Photo URL</span>
              <input
                type="text"
                className="input input-bordered w-full"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">Age</span>
              <input
                type="number"
                className="input input-bordered w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">Gender</span>
              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">About</span>
              <textarea
                className="textarea textarea-bordered w-full"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>

            {error && <p className="text-red-500">{error}</p>}

            <div className="card-actions justify-center mt-4">
              <button type="submit" className="btn btn-primary w-full">
                Save Profile
              </button>
            </div>
          </form>
        </div>

        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>

      {saved && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;