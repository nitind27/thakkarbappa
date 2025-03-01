"use client"
import { useRouter } from "next/navigation";
import React from 'react'

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        sessionStorage.removeItem("username");


        router.push("/login"); // Redirect to login page
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        className="btn bg-light"
      >
        Logout
      </button>
    </div>
  )
}

export default Logout
