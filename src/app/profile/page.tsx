"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error: any) {
      console.log("Error in logout::", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-800">
      <div className="bg-gray-950 shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-yellow-300 mb-4">
          Username: <span className="text-white">dushyant_2909</span>
        </h1>
        <p className="text-2xl text-yellow-300 font-semibold mb-6">
          Email: <span className="text-white">dushyantb2003@gmail.com</span>
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
