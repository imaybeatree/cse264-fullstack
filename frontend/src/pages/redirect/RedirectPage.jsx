import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";

export default function RedirectPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const after = searchParams.get("after") || "/home";
    navigate(after, { replace: true });
  }, [searchParams, navigate]);

  return null;
}
