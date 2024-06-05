import { useState, useEffect } from "react";
import axios from "axios";
import { getToken, logout } from "@/app/auth/authService";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ _id: string; email: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setIsAuthenticated(true);
          setUser(response.data.user);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Authentication failed: ", error);
          setIsAuthenticated(false);
          setLoading(false);
          logout();
          router.push("/auth/login");
        });
    } else {
      setLoading(false);
    }
  }, [router]);

  return { isAuthenticated, user, loading };
};
