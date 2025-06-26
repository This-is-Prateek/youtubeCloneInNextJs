"use client";

import { useEffect, useState } from "react";
import users from "@/apis/user";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  userName: string;
  coverImage: string;
  fullName: string;
  watchHistory: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await users.getCurrentUser(); 
        setUser(res); 
      } catch (err: unknown) {
        const apiError = err as ApiError;
        console.error("Error fetching user:", apiError);
        setError(apiError?.response?.data?.message || "Failed to fetch user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
