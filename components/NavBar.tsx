"use client";

import { useInit } from "@/hooks/useInit";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";

export function NavBar() {
  const { session } = useInit();

  return (
    <div className="flex justify-between p-3 items-center h-16 border-b border-slate-700 shadow-xl w-full text-white">
      <div className="font-extrabold text-3xl shadow-md">
        <a href="/">Travel Connect</a>
      </div>
      <div className="flex items-center gap-4">
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
            <Button variant="destructive" onClick={() => signOut()}>
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
