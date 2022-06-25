import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
      <Route path={props.destination}>
        {
          () => props.loggedIn ? <Component {...props} /> : <Navigate to="./login" />
        }
      </Route>
)}

export default ProtectedRoute;