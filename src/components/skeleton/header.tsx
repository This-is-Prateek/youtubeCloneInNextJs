"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/auth-slice";
import auth from "@/apis/auth";
import Button from "@/components/shared/button";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/store/store";
import { toast } from "sonner";

const Header= ({ setIsCollapsed }:{setIsCollapsed:(arg0:boolean)=>void}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.auth.status);
  const user = useSelector((state: RootState) => state.auth.userData);

  const logoutHandler = async () => {
    try {
      const response = await auth.logout();
      if (response) {
        dispatch(logout());
        router.push("/auth/login");
        toast.success("Logout successful");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black border-b shadow-md">
      <div className="flex items-center justify-between h-20 px-4 md:px-8">
        {/* Logo + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {setIsCollapsed((prev)=> !prev); }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Image
              src="/images/hamburger.svg"
              alt="menu"
              width={24}
              height={24}
            />
          </button>
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={48}
              height={48}
              className="hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* Search */}
        <label htmlFor="search" className="w-full max-w-md text-white">
          <div className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-full w-full transition-all focus-within:border-blue-900">
            <Image
              src="/images/search.svg"
              alt="search"
              width={16}
              height={16}
            />
            <input
              placeholder="Search..."
              className="border-none outline-none w-full bg-transparent"
              id="search"
            />
          </div>
        </label>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {status ? (
            <>
              <button
                onClick={() => router.push(`/user/${user._id}/admin`)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Image
                  src="/images/uploadVideo.svg"
                  alt="upload"
                  width={24}
                  height={24}
                />
              </button>
              <Button
                onClick={logoutHandler}
                className="hidden md:flex rounded-full px-5 py-2 text-sm transition-all"
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                className="hidden md:flex rounded-full px-5 py-2 text-sm transition-all w-28"
                onClick={() => router.push("/auth/login")}
              >
                Log in
              </Button>
              <Button
                className="hidden md:flex rounded-full px-5 py-2 text-sm transition-all w-28"
                onClick={() => router.push("/auth/register")}
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
