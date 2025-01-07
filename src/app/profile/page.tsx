"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ProfileCard() {
  interface ProfileData {
    username: string;
    email: string;
    isVerified: boolean;
  }

  const router = useRouter();
  const [data, setData] = useState<ProfileData | null>(null); // Use null initially to check data later
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    axios
      .get("/api/users/profile") // Replace with your actual API endpoint
      .then((response) => {
        setData(response.data.data); // Assuming 'data' is the relevant key
      })
      .catch((error) => {
        console.error(error);
        // setError("Failed to fetch profile data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logout= async ()=>{
    try {
        await axios.get('/api/users/logout')
        console.log('logged out successfully');
        router.push("/login")
    } catch (error:any) {
        console.log(error.message);
    }
  }

  if (loading)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        Loading...
      </div>
    );
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-screen ">
        <h1 className="text-3xl font-bold underline decoration-[1.5px] deco">User Profile </h1>
    <div className="border p-7 rounded-lg">
        
      <h1 className="font-semibold">username: <span className="text-green-500">{data?.username || "no user Found"}</span> </h1>
      <p className="font-semibold">email: <span className="text-green-500">{data?.email || "no email found"}</span></p>
   
    </div>
    <div className="flex gap-2">
    <button onClick={logout} className="bg-red-500 rounded-lg px-2 py-3" >Logout</button>
    <Link className="bg-green-500 rounded-lg px-2 py-3" href="/" >Home</Link>

    </div>
    </div>
  );
}

export default ProfileCard;
