import React from "react";

const UserCard = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-base-300 w-80 shadow-xl overflow-hidden">
      <figure>
        <img
          src={
            photoUrl ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt="Photo"
          className="w-full h-64 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center gap-4 mt-4">
          <button className="btn btn-secondary">Interested</button>
          <button className="btn btn-primary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;