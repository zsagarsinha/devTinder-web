import React, { useEffect } from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
const Connections = () => {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch();


    const fetchConnections = async () => {
        try {
            const res = axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections((await res).data.data))            
        } catch (err){
            console.error(err);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if(!connections) return;

    if(connections.length === 0) return <h1>No Connections Found</h1>

  return (
  <div className="text-center my-10">
    <h1 className="font-bold text-2xl mb-6">Connections</h1>

    {connections.map((connection) => {
      const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

      return (
        <div
          key={_id}
          className="flex items-center gap-4 bg-base-300 rounded-lg p-4 mx-auto mb-4 w-full max-w-xl text-left"
        >
          <img
            src={photoUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
            alt="photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            <p>{about}</p>
          </div>
        </div>
      );
    })}
  </div>
);
}

export default Connections