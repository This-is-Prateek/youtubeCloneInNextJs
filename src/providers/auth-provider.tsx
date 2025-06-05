"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { login, logout } from "@/store/auth-slice";
import { RootState } from "@/store/store";
import { useUser } from "@/hooks/auth/use-user";
import { toast } from "sonner";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading, error } = useUser(); // Get user data from the hook
  const userData = useSelector((state: RootState) => state.auth.userData);

  useEffect(() => {
    // When the user data is available, store it in redux or redirect based on authentication status
    if (!loading) {
      if (user) {
        // User is logged in
        dispatch(login({ userData: user }));
      } else {
        // User is not logged in
        dispatch(logout());
        router.push("/auth/login"); // Redirect to login page if user is not authenticated
      }
    }
  }, [dispatch, router, user, loading]);

  // If loading user data, show the loading spinner
  if (loading || !userData) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin />
      </div>
    );
  }

  if (error) {
    console.error("Error fetching user:", error);
    toast.error(error);
  }

  return <>{children}</>;
};

export default AuthLayout;
