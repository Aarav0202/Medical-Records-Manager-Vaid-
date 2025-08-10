"use client"
import { Spinner } from '@/components/ui/spinner'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import React from 'react'

const HeadingSection = () => {

  return (
    <div className='max-w-3xl space-y-4'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>Your Health, Prescriptions, & Records. Unified. Welcome to  <span className='underline'>Prescripto</span>
         </h1>
        <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
         Prescripto is the connected platform where <br />healthcare becomes simpler, faster, and better
        </h3>

          {/* <div className='w-full flex items-center justify-center'>
          <Spinner size="lg"/>
          </div> */}


          <Button asChild className='mr-[1px]'>
            <Link href="/documents">
            Enter Prescripto
            <ArrowRight className="h-2 w-4 ml-2"/>
            </Link>
          </Button>


          {/* <SignInButton mode="modal"> */}
            <Button className='ml-[1px]'>
              Get Prescripto 
              <ArrowRight className="h-4 w-4 ml-2"/>
            </Button>

          {/* </SignInButton> */}

        </div>
  )
}

export default HeadingSection