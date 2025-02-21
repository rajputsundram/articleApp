'use client'
import React from 'react'
import Image from "next/image"
import Link  from 'next/link'

const BlogItem = ({category,title,description,image,link}) => {
  return (
    <div className='max-w-[330px]  sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]'>
      <Link className=""   href={``}>
      <Image 
  src={image} 
  alt="Article Image" 
  width={400} 
  height={400} 
  objectFit="cover" 
  quality={100} 
  className="bord"
/>
        </Link>
        <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm '>{category}</p>
        <div className="p-5">
            <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>
            <p>{}</p>
            <div className='inline-flex items-center py-2 font-semibold text-center'>
            <Link className=""   href={link}>
                Read more <Image src={''} alt=''  width={12} className='ml-2'/>
                </Link>
            </div>
        </div>
      
    </div>
  )
}

export default BlogItem
