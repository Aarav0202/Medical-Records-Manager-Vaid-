"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { AuthDialog } from "./AuthDialog";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useAuth } from "@/app/context/AuthContext";

const HeadingSection = () => {
  
  const { isLoggedIn, login, register, logout } = useAuth(); // 👈 from context

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Dealership, Inventory & Customer Records. Unified. Welcome to{" "}
        <span className="underline">Auto Archive</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        AutoArchive is the connected platform where <br />
        automotive service management becomes smarter, faster, and more efficient
      </h3>

      <div className="flex gap-1 justify-center">
        {isLoggedIn ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
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
            onSubmit={login} // 👈 context handles login
          />
        )}

        <AuthDialog
          buttonLabel={
            <>
              Get AutoArchive
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          }
          dialogTitle="Register"
          dialogDescription="Create your account"
          FormComponent={RegisterForm}
          onSubmit={register} // 👈 context handles register
        />
      </div>
    </div>
  );
};

export default HeadingSection;
