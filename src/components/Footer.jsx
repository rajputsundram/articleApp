'use client'
import React from 'react'
import Image from 'next/image'

import { FaFacebookF } from "react-icons/fa";

import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";



const Footer = () => {
  return (
    <div className='flex justify-center flex-col gap-2 sm:flex-row bg-black py-5 items-center'>
       <div className='flex justify-end  w-[50%]'>
       <p className='text-sm text-white'>All right reserved. Copyright @newsnest</p>
       </div>
        
        <div className='flex gap-4 w-[50%] justify-center'>
          <div className='rounded-full flex items-center justify-center hover:bg-black hover:text-white bg-white h-[27px] w-[27px]'><FaFacebookF/></div>
          <div className='rounded-full flex items-center justify-center hover:bg-black hover:text-white bg-white h-[27px] w-[27px]'><FaInstagram/></div>
          <div className='rounded-full flex items-center justify-center hover:bg-black hover:text-white bg-white h-[27px] w-[27px]'><FaXTwitter/></div>
       
        </div>
      
    </div>
  )
}

export default Footer
