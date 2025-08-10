import React from 'react'
import HeadingSection from './_components/HeadingSection'
import Hero from './_components/Hero'
import Footer from './_components/Footer'

const page = () => {
    
  return (

   <>
    <div className='min-h-full flex flex-col'>
      <div className=' flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6  ' >
        <HeadingSection/>
        <Hero/>
        <Footer/>
      </div>
    </div>
    </>

  )
}

export default page