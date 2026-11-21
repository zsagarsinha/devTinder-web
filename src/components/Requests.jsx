import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const requests = useSelector((store) => store.requests)
    const dispatch = useDispatch();

    const reviewRequest = async(status, _id) => {
      try {

          const res = axios.post(
            BASE_URL + "/request/review/" + status + "/" + _id,{},
            {withCredentials:true});
            dispatch(removeRequest(_id));

      } catch(err) {}
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true}); 
            dispatch(addRequests(res.data.connectionRequests))
        }
        catch(err) {
            console.error(err);

        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

     if(!requests) return;

    if(requests.length === 0) return <h1>No Requests Found</h1>

  return (
  <div className="text-center my-10">
    <h1 className="font-bold text-2xl mb-6">Requests</h1>

    {
    requests.map((request) => {
      const { _id}  = request;
      const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

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
          <div>
            <button className="btn btn-primary mx-2"
            onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
            <button className="btn btn-secondary mx-2"
             onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
            

          </div>
        </div>
      );
    })}
  </div>
);
}

export default Requests