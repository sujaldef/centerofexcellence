// src/components/AuthInitializer.jsx

import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserById, setUserFromToken, logout } from "../redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";

const AuthInitializer = ({ children }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // prevents running twice (important for React strict mode)
  const initialized = useRef(false);

  useEffect(() => {

    if (initialized.current) return;
    initialized.current = true;

    const initAuth = async () => {

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      // nothing stored → skip
      if (!token || !userId) return;

      try {

        // decode JWT
        const decoded = jwtDecode(token);

        // check expiry
        const now = Date.now() / 1000;
        if (!decoded?.exp || decoded.exp < now) {
          throw new Error("Token expired");
        }

        // restore redux state
        dispatch(setUserFromToken({ token, userId }));

        // fetch user profile
        await dispatch(fetchUserById(userId)).unwrap();

      } catch (err) {

        console.error("Auth restore failed:", err);

        // cleanup broken login
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        dispatch(logout());

        // redirect only if not already on login page
        if (window.location.pathname !== "/login") {
          navigate("/login");
        }
      }
    };

    initAuth();

  }, [dispatch, navigate]);

  return <>{children}</>;
};

export default AuthInitializer;
