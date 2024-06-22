import { useState, useEffect } from "react";
import axios from "axios";
import { getToken, logout } from "@/app/service/authService";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{
    _id: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/protected`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setIsAuthenticated(true);
          setUser(response.data.user);
        } catch (error) {
          console.error("Authentication failed: ", error);
          logout();
          router.push("/auth/login");
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, [router]);

  return { isAuthenticated, user, loading };
};
