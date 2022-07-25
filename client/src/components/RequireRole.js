import { useAuth } from '../contexts/AuthContext';
import UnauthorizedPage from '../pages/Unauthorized.page';

export default function RequireRole({ authorizedRoles, children }) {
  const { user: { role } } = useAuth();

  if (!authorizedRoles.includes(role)) {
    return <UnauthorizedPage />;
  }

  return children;
}
