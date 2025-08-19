"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import React, { useEffect, useState } from 'react'
import { useScrollTop } from '@/hooks/use-scroll-top'
// import Logo from "./Images/Logo";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ghost } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { AuthDialog } from "./AuthDialog"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import { toast } from "sonner"
import { usePathname, useRouter } from "next/navigation";


const Navbar = () => {
  
  const router = useRouter();
  const pathname= usePathname();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  
  useEffect(() => {
  const checkAuth = async () => {
    const res = await fetch("http://localhost:8080/api/auth/checkToken", {
      credentials: "include",
    });
    setisLoggedIn(res.ok);
  };
  checkAuth();
}, [pathname]);

// Submit handling for Register
  const handleRegisterSubmit = async (data:any) => {
    
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

  // Submit handling for Login
const handleLoginSubmit = async (data: any) => {
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(`Login failed: ${result.message}`);
      return;
    }

    toast.success("Login successful!");
    setisLoggedIn(true);
    setTimeout(() => {
      router.push("/home")
    }, (1200));
  } catch (error) {
    toast.error(`Login error:", ${error}`);
    toast.error("An error occurred during login.");
  }
};

// Submit handling for LogOut
const handleLogout=async ()=>{
  await fetch("http://localhost:8080/api/auth/logout",{
    method:"POST",
    credentials:"include",
  })
  setisLoggedIn(false);
  setTimeout(() => {
    router.push("/")
  }, 1000);
  toast.success("Logged out successfully")
}


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
        {isLoggedIn ? (
          <Button onClick={handleLogout}>Logout</Button>
        ):(
        
        <AuthDialog
        buttonLabel="Log in"
        dialogTitle="Log in"
        dialogDescription="Sign in to your account"
        FormComponent={LoginForm}
        onSubmit={handleLoginSubmit}
      />
      )}

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