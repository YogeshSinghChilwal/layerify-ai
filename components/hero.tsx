import Image from "next/image";
import React from "react";
import { Cover } from "./ui/cover";
import { kumbh_Sans } from "@/components/ui/fonts";
import { Compare } from "./ui/compare";
import Link from "next/link";
import LinkButton from "./link-button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-5 lg:pb-10 p-5">
      <div className="flex flex-col md:flex-row items-center md:justify-center sm:pt-12 md:pt-0 pb-5 gap-10 lg:gap-16">
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
      <LinkButton link="/upload-image" text="Get Statred"/>
    </div>
  );
};

export default Hero;
