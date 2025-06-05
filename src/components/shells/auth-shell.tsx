import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/shared/components/ui/card";

interface AuthShellProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthShell({ title, children }: AuthShellProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black p-4"
      style={{
        backgroundImage: `url("https://www.transparenttextures.com/patterns/xv.png")`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      <Card
        className="w-full max-w-md rounded-2xl border-none 
        bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md
        shadow-2xl shadow-black/30 text-white"
      >
        <CardHeader>
          <CardTitle className="text-3xl text-center font-semibold tracking-tight">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
          {title === "Register" ? (
            <div className="text-center text-sm text-muted-foreground">
              Already have an account? <a href="" className="text-blue-400 hover:text-blue-500">Sign in</a>
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account, <a href="" className="text-blue-400 hover:text-blue-500">Register</a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
