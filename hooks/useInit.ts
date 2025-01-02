import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useInit = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleUser = async () => {
      localStorage.removeItem("userId");
      const userId = localStorage.getItem("userId");
      if (!userId && session?.user) {
        try {
          localStorage.setItem("userId", session?.user?.id);
        } catch (error) {
          console.error("Error saving user:", error);
        }
      }
    };
    handleUser();
  }, [session, status, router]);

  return { session, status };
};
