import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { getToken } from "../../lib/token";

export default function RedirectPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      // check if user is verified
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (!payload.verified) {
          navigate("/verify", { replace: true });
          return;
        }
        if (!payload.onboarded){
          navigate("/onboarding", { replace: true });
          return;
        }
      } catch {
        // invalid token, let RouteGuard handle it
      }
    }

    const after = searchParams.get("after") || "/home";
    navigate(after, { replace: true });
  }, [searchParams, navigate]);

  return null;
}
