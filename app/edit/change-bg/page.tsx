"use client"
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
      {imgSrc && <img width={200} src={imgSrc } />}
    </div>
  )
}

export default Page
