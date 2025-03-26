"use client";

import RemovedBgImage from "@/components/remove-background/remove-bg-image";
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div className="flex  justify-betweenv pb-5 relative">
          <div className="absolute top-[-40]">
            <Link href={"/upload-image"}>
              <div className="flex gap-2 items-center justify-center text-white ">
                <ArrowLeft />
                <p>Go Back</p>
              </div>
            </Link>
          </div>

          <div>
            <RemovedBgImage />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
