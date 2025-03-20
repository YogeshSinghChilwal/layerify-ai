"use client";

import { useState } from "react";
import Dropzone from "./dropzone";
import { kumbh_Sans } from "@/components/ui/fonts";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const UploadSection = () => {
  const [action, setAction] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const router = useRouter();

  const setSelectedImage = (file?: File) => {
    if(file){
      const imageUrl = URL.createObjectURL(file);
      setImgSrc(imageUrl)
      sessionStorage.setItem("uploadedImage", imageUrl);
    }
  };

  const handleEdit = () => {
    
    if(!imgSrc){
      toast.error("Select an image.")
      return 
    }
    if(!action){
      toast.error("Select an action.")
      return
    }
    router.push(`/edit/${action}`);
  };

  return (
    <div className="px-5">
      <div className="h-screen flex flex-col justify-center items-center pb-20 ">
        <div className={`${kumbh_Sans.className}`}>
          <h1 className="text-3xl lg:text-5xl text-white font-semibold leading-15 text-center">
            Upload an <span className="text-[#6BFEFD]">Image</span> <br />&
            Select Your <span className="text-[#DE8CFC]">Desired Action</span>
          </h1>
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <Dropzone setSelectedImage={setSelectedImage} />
          </div>
          <div>
            <Select onValueChange={(value) => setAction(value)}>
              <SelectTrigger className="w-[180px] ">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remove-bg">Remove Background</SelectItem>
                <SelectItem value="edit-text">Text Between Layers</SelectItem>
                <SelectItem value="change-bg">Change Background</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className={`${kumbh_Sans.className} mt-10`}>
          <button
            className="p-[3px] relative text-lg font-semibold"
            onClick={handleEdit}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent hover:text-black">
              Edit
            </div>
          </button>
        </div>
      </div>

    </div>
  );
};

export default UploadSection;
