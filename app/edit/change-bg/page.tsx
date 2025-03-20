"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [imgSrc , setImgSrc] = useState<string | null>(null)

    useEffect(() => {
        const imgUrl = sessionStorage.getItem("uploadedImage")
        setImgSrc(imgUrl)
    }, []) 
  return (
    <div className='text-3xl text-white'>
      Change
      {imgSrc && <Image src={imgSrc } width={200} height={100}  alt='image' unoptimized={true}/> }
    </div>
  )
}

export default Page
