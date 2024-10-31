"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (user.password.length > 0 && user.email.length > 0)
      setButtonDisabled(false);
  }, [user]);

  const onLogin = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/users/login", user);
      router.push(`/profile/${response.data.userId}`);
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-800">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full border border-black">
        <h1 className="text-2xl text-indigo-950 font-bold text-center mb-4">
          {loading ? "Processing" : "Login"}
        </h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-800"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            className="mt-1 p-2 w-full text-black border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-800"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            className="mt-1 p-2 w-full text-black border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={onLogin}
          type="submit"
          disabled={buttonDisabled}
          className={`w-full p-2 rounded-lg font-medium transition-all duration-300 ${
            buttonDisabled
              ? "opacity-50 bg-gray-400 cursor-not-allowed"
              : "opacity-100 bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-700">
          Didn't have an account?{" "}
          <Link href="/signup" className="text-blue-700 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
