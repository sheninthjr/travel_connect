"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface UserProps {
  name: string;
  email: string;
  image: string;
  bio?: string;
  gender?: string;
  location?: string;
}

export default function Settings() {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("User ID not found.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`/api/getmydetails?userId=${userId}`);
        setUser(response.data);
        setUpdatedUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.post("/api/updatemydetails", updatedUser);
      setUser(updatedUser);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating user data:", err);
      setError("Failed to update user data.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUpdatedUser({
      ...updatedUser!,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-start p-4 sm:p-6 bg-background text-white h-screen w-full">
      <div className="flex justify-between w-full items-center mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold">
          <a href="/settings">Settings</a>
        </h1>
        <div className="text-center">
          {editMode ? (
            <Button onClick={handleSaveClick} className="bg-white text-black">
              Save
            </Button>
          ) : (
            <Button onClick={handleEditClick} className="bg-white text-black">
              Update Profile
            </Button>
          )}
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col w-full max-w-2xl">
          <div className="flex items-start space-x-4 sm:space-x-6">
            <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 rounded-full" />
            <div className="flex-grow space-y-4">
              <Skeleton className="h-6 sm:h-8 w-full" />
              <Skeleton className="h-4 sm:h-6 w-full" />
              <Skeleton className="h-4 sm:h-6 w-full" />
              <Skeleton className="h-4 sm:h-6 w-full" />
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : user ? (
        <div className="flex flex-col w-full overflow-y-auto pb-10">
          <div className="flex flex-col sm:flex-row items-center pt-3 sm:items-start space-y-4 sm:space-x-6">
            <Avatar className="h-16 w-16 sm:h-24 sm:w-24 mx-auto sm:mx-0">
              <AvatarImage src={user.image} alt={user.name} />
            </Avatar>
            <div className="flex-grow">
              {editMode ? (
                <>
                  <Input
                    name="name"
                    value={updatedUser?.name}
                    onChange={handleInputChange}
                    className="bg-black rounded-xl font-mono text-white h-12"
                  />
                  <Input
                    name="email"
                    value={updatedUser?.email}
                    onChange={handleInputChange}
                    className="bg-black rounded-xl font-mono text-white mt-4 h-12"
                  />
                  <Textarea
                    name="bio"
                    value={updatedUser?.bio || ""}
                    onChange={handleInputChange}
                    className="bg-black rounded-xl font-mono text-white mt-4 h-24 w-full p-2"
                    placeholder="Enter your bio..."
                  />
                  <Input
                    name="gender"
                    value={updatedUser?.gender || ""}
                    onChange={handleInputChange}
                    className="bg-black text-white font-mono mt-4 h-12 rounded-xl"
                    placeholder="Enter your gender"
                  />
                  <Input
                    name="location"
                    value={updatedUser?.location || ""}
                    onChange={handleInputChange}
                    className="bg-black text-white font-mono mt-4 h-12 rounded-xl"
                    placeholder="Enter your location"
                  />
                </>
              ) : (
                <div className="flex flex-col w-full max-w-2xl space-y-3 rounded-lg shadow-lg">
                  <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-2 self-center lg:self-start md:self-start">
                    {user.name}
                  </h2>
                  <div className="bio-container">
                    <div className="bio-content text-lg sm:text-xl text-gray-300 space-y-3">
                      <div className="font-semibold text-xl sm:text-2xl">
                        Email:
                      </div>
                      <div className="p-4 font-bold text-lg sm:text-2xl">
                        {user.email || "Update your email"}
                      </div>
                    </div>
                    <div className="star star2"></div>
                    <div className="star star4"></div>
                  </div>
                  <div className="bio-container">
                    <div className="bio-content text-lg sm:text-xl text-gray-300 space-y-3">
                      <div className="font-semibold text-xl sm:text-2xl">
                        Bio:
                      </div>
                      <div className="p-4">
                        {user.bio || "No bio available"}
                      </div>
                    </div>
                    <div className="moon"></div>
                    <div className="star star1"></div>
                    <div className="star star2"></div>
                    <div className="star star3"></div>
                    <div className="star star4"></div>
                    <div className="star star5"></div>
                  </div>
                  <div className="bio-container">
                    <div className="bio-content text-lg sm:text-xl text-gray-300 space-y-3">
                      <div className="font-semibold text-xl sm:text-2xl">
                        Gender:
                      </div>
                      <div className="p-4 font-bold text-lg sm:text-2xl">
                        {user.gender || "Update your gender"}
                      </div>
                    </div>
                    <div className="star star2"></div>
                    <div className="star star4"></div>
                  </div>
                  <div className="bio-container">
                    <div className="bio-content text-lg sm:text-xl text-gray-300 space-y-3">
                      <div className="font-semibold text-xl sm:text-2xl">
                        Location:
                      </div>
                      <div className="p-4 font-bold text-lg sm:text-2xl">
                        {user.location || "Update your location"}
                      </div>
                    </div>
                    <div className="star star2"></div>
                    <div className="star star4"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-center">No user data found</div>
      )}
    </div>
  );
}
