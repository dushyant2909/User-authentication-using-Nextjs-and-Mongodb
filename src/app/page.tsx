"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [data, setdata] = useState({ username: "", email: "" });

  const getUserDetails = async () => {
    const resp = await axios.get("/api/users/currentUser");
    setdata(resp.data.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error: any) {
      console.log(
        "Error in logout::",
        error.response.data.message || error.message
      );
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-800">
      <div className="bg-gray-950 shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-yellow-300 mb-4">
          Username: <span className="text-white">{data.username}</span>
        </h1>
        <p className="text-2xl text-yellow-300 font-semibold mb-6">
          Email: <span className="text-white">{data.email}</span>
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="w-full max-w-sm mx-auto bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
