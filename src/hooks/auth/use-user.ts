"use client";

import { useEffect, useState } from "react";
import users from "@/apis/user";
import { UseSelector } from "react-redux";

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
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError(err?.response?.data?.message || "Failed to fetch user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
