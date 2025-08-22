"use client";

import { useAuth } from "@/app/context/AuthContext";
import Navbar from "../_components/Navbar";



export default function CustomerHome() {
  
  
  const { user } = useAuth();
  

  return (
    <div>
      <Navbar/>
      <h1>👤 Customer Dashboard</h1>
      <p>Welcome, {user?.name || "dear cc"}!</p>
    </div>
  );
}
