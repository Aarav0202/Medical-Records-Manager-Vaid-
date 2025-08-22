"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { useAuth } from "@/app/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {HoverCard,HoverCardContent,HoverCardTrigger,} from "@/components/ui/hover-card"

const Navbar = () => {

    const { user } = useAuth();
    
  const scrolled = useScrollTop();
  const { isLoggedIn, login, register, logout } = useAuth(); // 👈 from context

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div>
      <Image src="/Images/Logo.svg" alt="logo" width={30} height={30} />
      <p className="pl-2">AA</p>
      </div>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 ">


        <HoverCard>
            <HoverCardTrigger>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

            </HoverCardTrigger>
            <HoverCardContent>
                <div className="">
                <span className="text-s">Username:</span> {user?.name}
                </div>
            </HoverCardContent>
        </HoverCard>
        

        <Button>Hello</Button>
      </div>
    </div>
  );
};

export default Navbar;
