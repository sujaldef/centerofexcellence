// src/components/AuthInitializer.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserById, setUserFromToken } from '../redux/slices/userSlice';
import { decodeToken, isTokenExpired } from '../utils/decodeToken';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, token } = useSelector((state) => state.user || { userId: null, token: null });
  const storedToken = localStorage.getItem('token');
  const storedUserId = localStorage.getItem('userId');

  useEffect(() => {
    const initializeAuth = async () => {
      if (storedToken && storedUserId && !token) {
        console.log('Restoring auth:', { storedToken, storedUserId });
        try {
          const decoded = decodeToken(storedToken);
          console.log('Decoded token:', decoded);
          if (decoded && !isTokenExpired(decoded.exp)) {
            dispatch(setUserFromToken({ token: storedToken, userId: storedUserId }));
            console.log('Fetching user with ID:', storedUserId);
            await dispatch(fetchUserById(storedUserId)).unwrap();
          } else {
            console.log('Invalid or expired token:', decoded);
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            dispatch({ type: 'user/logout' });
            navigate('/login');
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          dispatch({ type: 'user/logout' });
          navigate('/login');
        }
      }
    };
    initializeAuth();
  }, [dispatch, navigate, storedToken, storedUserId, token]);

  return <>{children}</>;
};

export default AuthInitializer;