import { isTokenValid } from "@/lib/token";
import { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RouteGuard = () => {
  // prevent unnecessary re-renders
  if (useMemo(() => isTokenValid(), [])) {
    return <Outlet />;
  } else {
    const after = encodeURIComponent(window.location.pathname);
    return <Navigate to={`/login?after=${after}`} />;
  }
};
