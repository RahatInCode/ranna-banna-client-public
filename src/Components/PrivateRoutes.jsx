// components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase.config";

const PrivateRoute = () => {
  const [user, setUser] = useState(undefined); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <div className="text-center py-10">Loading...</div>; 
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
