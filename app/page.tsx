"use client"
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Spotlight } from '@/components/ui/Spotlight'
import useCurrentUser from '@/hooks/use-current-user'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  const user = useCurrentUser()
  return (
    <div className='flex flex-col w-full h-full relative overflow-x-hidden'>
      <Header />
      <div className='flex-1 w-full h-full flex md:items-center md:justify-center relative '>
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="gray"
        />
        <div className='p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0'>
          <h1 className='text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-800 tp-gray-950 bg-opacity-50'>
            Connect <br /> Anywhere Anytime
          </h1>
          <p className='mt-5 font-normal text-base max-w-lg text-center mx-auto'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea non obcaecati error animi culpa hic at aliquid vel labore delectus.
          </p>
          <Link
            href={user ? "/dashboard" : "/sign-in"}
            className='flex items-center justify-center mt-8'
          >
            <Button
              size={"lg"}
              className='rounded-full'
            >
              {user ? "Go to Dashboard" : "Sign In"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page