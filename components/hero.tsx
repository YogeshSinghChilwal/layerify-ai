import Image from "next/image";
import React from "react";
import { Cover } from "./ui/cover";
import { kumbh_Sans } from "@/components/ui/fonts";
import { Compare } from "./ui/compare";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-5 lg:pb-10">

    <div className="flex flex-col md:flex-row items-center md:justify-center sm:pt-12 md:pt-0   p-5 gap-10 lg:gap-16">
      <div className="flex flex-col gap-5">
        <div className="">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={300}
            height={100}
            className="w-[150px] sm:w-[200px] md:w-[200px] h-auto"
          />
        </div>
        <h1
          className={`text-white text-3xl lg:text-5xl font-semibold leading-12 lg:leading-18 ${kumbh_Sans.className}`}
        >
          Remove <span className="text-[#6BFEFD]">Backgrounds</span>
          <br /> & Edit <span className="text-[#DE8CFC]">Images</span> <br />
          <div className="mt-3">
            at <span className="mr-3"></span>
            <Cover>Lightning Speed</Cover>
          </div>
        </h1>
        
      </div>

      <div className="p-2 border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800">
        <Compare
          firstImage="/img.png"
          secondImage="/imgR.png"
          firstImageClassName="object-cover object-left-top"
          secondImageClassname="object-cover object-left-top"
          className="h-[250px] w-[250px] md:h-[350px] md:w-[350px] lg:w-[400px]"
          slideMode="hover"
        />
      </div>
    </div>
    <div className={`${kumbh_Sans.className}`} >
      <button className="p-[3px] relative text-lg font-semibold">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent hover:text-black">
          Get Statred
        </div>
      </button>
    </div>
    </div>

  );
};

export default Hero;
