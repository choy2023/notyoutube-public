import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : isAuthenticated && user ? (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <div>Please login to see your profile</div>
      )}
    </>
  );
};

export default Profile;
