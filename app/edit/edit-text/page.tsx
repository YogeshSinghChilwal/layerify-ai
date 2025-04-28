import EditTextImage from '@/components/edit-text/edit-text-image';
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <div className="flex justify-center items-center pt-10 px-5 mt-10">
        <div className="flex  justify-between pb-5 relative">
          <div className="absolute top-[-40]">
            <Link href={"/upload-image"}>
              <div className="flex gap-2 items-center justify-center text-white ">
                <ArrowLeft />
                <p>Go Back</p>
              </div>
            </Link>
          </div>

          <div>
              <EditTextImage/>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
