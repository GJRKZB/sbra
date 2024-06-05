"use client";

import { useAuth } from "../hooks/useAuth";
import { Spinner } from "@nextui-org/spinner";

const Page = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <Spinner color="default" size="md" />;
  }

  if (!isAuthenticated) {
    return <div>You are not authorized to view this content.</div>;
  }

  return (
    <div>
      <h1>Protected page</h1>
      <p>Welcome, {user?.email}</p>
    </div>
  );
};

export default Page;
