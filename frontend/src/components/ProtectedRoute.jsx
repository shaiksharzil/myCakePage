import { useAuth } from "../context/AuthContext";
import UnauthPage from "../pages/UnauthPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <div>
        {" "}
      </div>
    );

  if (!isAuthenticated) return <UnauthPage />;

  return children;
};

export default ProtectedRoute;
