import "./userprofile.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/authcontext";

export const UserProfile = () => {
  const { user, logoutHandler } = useContext(AuthContext);
  return (
    <>
      <div className="profile-container">
        <div className="profile-details">
          <h2>Profile details</h2>

          <div className="profile-details-mod">
            <p><b>Name:</b> {user.firstName + " " + user.lastName}</p>
            <p><b>Email:</b>{user.email}</p>
            
            <button onClick={() => logoutHandler()}>Logout</button>
          </div>
        </div>
        
      </div>
    </>
  );
};