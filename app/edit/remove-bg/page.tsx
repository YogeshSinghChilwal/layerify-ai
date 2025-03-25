"use client";

import RemovedBgImage from "@/components/remove-background/remove-bg-image";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div className="flex  justify-betweenv pb-5 relative">
          <div className="absolute top-[-80] md:top-[-50] lg:top-[-20] sm:left-[-100] md:left-[-200] lg:left-[-250]">
            <Link href={"/upload-image"}>
              <Button className="bg-white text-black hover:bg-gray-300">
                <MoveLeft />
                Go Back
              </Button>
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
