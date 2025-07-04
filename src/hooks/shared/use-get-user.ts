import { useState } from 'react';
import users from '@/apis/user';

interface User {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  avatar?: string;
  coverImage?: string;
  // Add other properties as needed
}

export function useGetUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchUser = async (userId:string) => {
        try {
            setLoading(true);
            const res = await users.getUserChannelProfile({userId});
            console.log("Fetched user:", res);
            setUser(res);
        } catch (err) {
            console.error("Error fetching user:", err);
            setError("Failed to fetch user.");
        } finally {
            setLoading(false);
        }
    }
    
    return { user, loading, error, fetchUser };
}