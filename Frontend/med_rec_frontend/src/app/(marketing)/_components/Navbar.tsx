"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import React from 'react'
import { useScrollTop } from '@/hooks/use-scroll-top'
// import Logo from "./Images/Logo";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ghost } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { AuthDialog } from "./AuthDialog"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"

const Navbar = () => {
  
// Submit handling for Register
  const handleRegisterSubmit = async (data:any) => {
    console.log("Register form data:", data); 
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});


      if (!response.ok) {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
        return;
      }

      alert("Registration successful!");
    } catch (error) {
      alert("An error occurred during registration.");
    }
  };

  const handleLoginSubmit = async (data: any) => {
    // call your login API here
    console.log("Login data:", data);
  };



    const scrolled= useScrollTop();
    
  return (
    <div
      className={cn(
        "z-50 bg-background  dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      {/* <Logo/> */}
      <Image src="/Images/Logo.svg" alt="logo" width={30} height={30} />
      <p className=" pl-2">Prescripto</p>

      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 ">
        {/* {isLoading &&(
            <Spinner/>
          )} */}

        {/* <Button > */}
        {/* <Button variant="ghost" size="sm">Log in</Button> */}
        <AuthDialog
        buttonLabel="Log in"
        dialogTitle="Log in"
        dialogDescription="Sign in to your account"
        FormComponent={LoginForm}
        onSubmit={handleLoginSubmit}
      />

        {/* </Button> */}

        {/* <SignInButton mode="modal"> */}
        {/* <Button size="sm">Register</Button> */}
        <AuthDialog
          buttonLabel="Register"
          dialogTitle="Register"
          dialogDescription="Create your account"
          FormComponent={RegisterForm}
          onSubmit={handleRegisterSubmit}
        />
        {/* </SignInButton> */}

        {/* <UserButton > */}

        {/* </UserButton> */}
      </div>
    </div>
  );
}

export default Navbar