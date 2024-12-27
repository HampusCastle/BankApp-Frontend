import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/jwtUtil';

interface PrivateRouteProps {
  element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;
