import React from 'react'
import Image from "next/image"
import { Button } from '@/components/ui/button'

const Footer = () => {
    
  return (
    <div className='flex item-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F]'>
        <Image
                    src="/Images/Logo.svg"  
                    alt="logo"
                    width={30} 
                    height={30}     
                />
        <div className='md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground '>
            <Button variant="ghost" size="sm">Privacy Policy</Button>
            <Button variant = "ghost" size= "sm">Terms & Conditions</Button>
        </div>
    </div>
  )
}

export default Footer