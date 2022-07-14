import React, { Fragment } from "react";
import "../style/Profile.css";

const Profile = (props) => {
  return (
    <Fragment>
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          <img src={props.profilePhoto} alt={props.profileName} />
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{props.profileName}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{props.emailId}</p>
          </div>
          {/* <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div> */}
          {/* <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
