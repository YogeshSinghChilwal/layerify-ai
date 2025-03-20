import React from "react";
import { kumbh_Sans } from "@/components/ui/fonts";
import Link from "next/link";

const LinkButton = ({ link, text }: { link: string; text: string }) => {
  return (
    <div className={`${kumbh_Sans.className}`}>
      <Link href={link}>
        <button className="p-[3px] relative text-lg font-semibold">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent hover:text-black">
            {text}
          </div>
        </button>
      </Link>
    </div>
  );
};

export default LinkButton;
