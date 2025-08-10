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

const Navbar = () => {


    const scrolled= useScrollTop();
    
  return (
    <div className={cn("z-50 bg-background  dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}>

        {/* <Logo/> */}
        <Image
            src="/Images/Logo.svg"  
            alt="logo"
            width={30} 
            height={30}     
        />
        <p className=" pl-2">Prescripto</p>
        
        <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 ">
          {/* {isLoading &&(
            <Spinner/>
          )} */}

          
          
              {/* <Button > */}
                <Button variant="ghost" size="sm">Log in</Button>

              {/* </Button> */}

              {/* <SignInButton mode="modal"> */}
                <Button size="sm">Get Prescripto</Button>
              {/* </SignInButton> */}
  

         
            
            {/* <UserButton > */}

            {/* </UserButton> */}


        </div>
    </div>
  )
}

export default Navbar