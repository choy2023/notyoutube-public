import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loginAction, logoutAction } from "../../data/loginReducer";
import { getAccessToken, revokeAccess } from "../../data/auth";
import { getUserProfileAPI } from "../../data/LoginYoutubeAPI";

import { setCurrentprofileId } from "../../data/profileIdReducer";

import "./end.css";

const End = () => {
  const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn);
  const storedAccessToken: any = localStorage.getItem("access_token");

  const [profileDetails, setProfileDetails] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        if (isLoggedIn === true) {
          const profileDetail: any = await getUserProfileAPI(storedAccessToken);
          dispatch(setCurrentprofileId(profileDetail.profileId))
          setProfileDetails(profileDetail.profileImageURL);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserDetails();
  }, [isLoggedIn]);


  const logout = () => {
    revokeAccess(storedAccessToken);
    localStorage.removeItem("access_token");
    dispatch(logoutAction());
  };

  const checkToken = () => {
    console.log(storedAccessToken);
    console.log(isLoggedIn);
  };

  const handleLogin = async () => {
    try {
      const accessToken: any = await getAccessToken();
      localStorage.setItem("access_token", accessToken);
      dispatch(loginAction(accessToken));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {isLoggedIn ? (
        <>
          {profileDetails && (
            <img
              onClick={logout}
              className="profile_picture"
              src={profileDetails}
              alt="Profile"
              loading="lazy"
            />
          )}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={logout}>Logout</button>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default End;
