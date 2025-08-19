"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { AuthDialog } from "./AuthDialog";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { toast } from "sonner";

const HeadingSection = () => {
  // Submit handling for Register
  const handleRegisterSubmit = async (data: any) => {
    console.log("Register form data:", data);
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Registration failed: ${errorData.message}`);
        return;
      }

      toast.success("Registration successful!");
    } catch (error) {
      toast.error("An error occurred during registration.");
    }
  };

  const handleLoginSubmit = async (data: any) => {
    // call your login API here
    console.log("Login data:", data);
  };

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Health, Prescriptions, & Records. Unified. Welcome to{" "}
        <span className="underline">Prescripto</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Prescripto is the connected platform where <br />
        healthcare becomes simpler, faster, and better
      </h3>

      <div className="flex gap-1 justify-center">
        <AuthDialog
          buttonLabel={
            <>
              Log in
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          }
          dialogTitle="Log in"
          dialogDescription="Sign in to your account"
          FormComponent={LoginForm}
          onSubmit={handleLoginSubmit}
        />

        <AuthDialog
          buttonLabel={
            <>
              Get Prescripto
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          }
          dialogTitle="Register"
          dialogDescription="Create your account"
          FormComponent={RegisterForm}
          onSubmit={handleRegisterSubmit}
        />
      </div>
    </div>
  );
};

export default HeadingSection;
