import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, ...props }) => {
  return (
      <Route path={props.destination}>
        {
          () => props.loggedIn ? { children } : <Navigate to="./login" />
        }
      </Route>
)}

export default ProtectedRoute;