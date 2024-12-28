"use client";

import { useInit } from "@/hooks/useInit";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

export function NavBar() {
  const { toast } = useToast();
  const { session } = useInit();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      localStorage.clear();
      toast({
        variant: "success",
        title: "Logout Successful",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.error("Error during sign out:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div className="flex justify-between p-3 items-center h-16 border-b border-slate-700 shadow-xl w-full text-white">
      <div className="font-extrabold font-mono ml-10 text-xl md:text-3xl lg:text-3xl shadow-md">
        <a href="/">Travel Connect</a>
      </div>
      <div className="flex items-center gap-2 md:gap-4 lg:gap-4">
        {session?.user && (
          <>
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="User Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <span className="font-semibold">{session.user.name}</span>
            )}
            <button
              className="bg-red-600 px-2 py-1 rounded-lg font-bold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
