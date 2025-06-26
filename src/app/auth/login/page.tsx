"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import AuthShell from "@/components/shells/auth-shell";
import InputField from "@/components/shared/input";
import Button  from "@/components/shared/button";
import auth from "@/apis/auth";
import user from "@/apis/user";
import { login } from "@/store/auth-slice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  [key: string]: {
    message?: string;
  };
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const Page = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await auth.login({
        email: data.email,
        password: data.password
      });

      if (result) {
        const currentUser = await user.getCurrentUser();
        if (currentUser) {
          console.log("currentUser", currentUser);
          
          dispatch(login(currentUser));
          toast.success("Login successful");
        }
        router.push("/");
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const message = apiError?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  // Called when validation fails
  const onError = (formErrors: FormErrors) => {
    Object.values(formErrors).forEach((field) => {
      if (field?.message) {
        toast.error(field.message);
      }
    });
  };

  return (
    <AuthShell title="Sign In">
      <form className="w-full" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="w-full flex flex-col gap-4">

          <InputField
            type="email"
            placeholder="Email"
            id="email"
            className="border-none bg-black opacity-50 focus-visible:opacity-100"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />

          <InputField
            type="password"
            placeholder="Password"
            id="password"
            className="border-none bg-black opacity-50 focus-visible:opacity-100"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Min 8 characters" },
              maxLength: { value: 20, message: "Max 20 characters" },
            })}
          />

          <Button type="submit">
            Sign In
          </Button>
        </div>
      </form>
    </AuthShell>
  );
};

export default Page;
