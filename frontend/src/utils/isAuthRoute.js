import { useLocation } from 'react-router-dom';

const useIsAuthRoute = () => {
  const location = useLocation();
  return location.pathname === '/login' || location.pathname === '/register';
};

export default useIsAuthRoute;
