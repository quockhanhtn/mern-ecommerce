import PropTypes from 'prop-types';
// hooks
import { Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
// pages
import Login from '../pages/authentication/Login';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  if (pathname?.startsWith('/dashboard') && !['admin', 'staff'].includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
