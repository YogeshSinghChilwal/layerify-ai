"use client";

import { removeBackground } from "@imgly/background-removal";
import React, { useEffect, useRef, useState } from "react";
import { kumbh_Sans } from "../ui/fonts";
import { Skeleton } from "../ui/skeleton";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UploadImageSection from "./upload-image-section";
import { Slider } from "../ui/slider";
import {
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

const ChangeBg = () => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [processedImgSrc, setProcessedImgSrc] = useState<string | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [bgImageUrl, setBgImageUrl] = useState("/bg-image/bg1.jpg");

  //* fg Image
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState(10);
  const [xAxis, setXAxis] = useState<number>(0);
  const [yAxis, setYAxis] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const imgUrl = sessionStorage.getItem("uploadedImage");
    setImgSrc(imgUrl);

    if (imgUrl) {
      const remove = async () => {
        const blob = await removeBackground(imgUrl);
        const processedUrl = URL.createObjectURL(blob);
        setProcessedImgSrc(processedUrl);
        setCanvasReady(true);
      };
      remove();
    }
  }, []);

  useEffect(() => {
    if (canvasReady) {
      drawCompositeImage();
    }
  }, [canvasReady, imageHeight, imageWidth, xAxis, yAxis, bgImageUrl]);

  const drawCompositeImage = () => {
    if (!canvasRef.current || !canvasReady || !imgSrc || !processedImgSrc)
      return;

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgImg = new Image();

    bgImg.onload = () => {
      canvas.width = bgImg.width;
      canvas.height = bgImg.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      ctx.save();

      const fgImg = new Image();

      fgImg.onload = () => {
        const fgX = (canvas.width - fgImg.width) / 2;
        const fgY = (canvas.height - fgImg.height) / 2;

        ctx.drawImage(
          fgImg,
          fgX + xAxis,
          fgY + yAxis,
          fgImg.width + imageWidth,
          fgImg.height + imageHeight
        );
      };

      fgImg.src = processedImgSrc;
    };

    bgImg.src = bgImageUrl;
  };

  const handleDownload = () => {
    if (!canvasRef.current || !processedImgSrc) return;

    canvasRef.current.toBlob(
      (blob) => {
        if (!blob) {
          return;
        }
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `layerify.webp`;
        link.click();

        URL.revokeObjectURL(link.href);
      },
      "image/webp",
      0.5
    );
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col gap-10">
        {processedImgSrc ? (
          <div>
            <canvas
              ref={canvasRef}
              className="max-h-lg h-auto w-full max-w-lg rounded-lg"
            ></canvas>
          </div>
        ) : (
          <Skeleton className="w-[300] h-[300] lg:w-[400] lg:h-[400]" />
        )}
      </div>

      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle>Edit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Label htmlFor="slidebar">Image Size</Label>
            <Slider
              defaultValue={[10]}
              id="slidebar"
              min={-1000}
              max={3500}
              step={50}
              onValueChange={(value) => {
                const newSliderValue = value[0];
                const diff = newSliderValue - sliderValue;
                setImageWidth((prevSize) => prevSize + diff);
                setImageHeight((prevSize) => prevSize + diff);
                setSliderValue(newSliderValue);
              }}
              className={"w-[90%]"}
            />
          </div>
          <div className="mt-5">
            <Label htmlFor="position">Set Position</Label>
            <div className="flex justify-center mt-4">
              <div className="flex flex-col items-center gap-2">
                <div
                  className="bg-gray-300 hover:bg-gray-200 rounded-sm px-1"
                  onClick={() => setYAxis((p) => p - 50)}
                >
                  <ChevronUp />
                </div>

                <div className="flex gap-8">
                  <div
                    className="bg-gray-300 hover:bg-gray-200 rounded-sm px-1"
                    onClick={() => setXAxis((p) => p - 50)}
                  >
                    <ChevronLeft />
                  </div>
                  <div
                    className="bg-gray-300 hover:bg-gray-200 rounded-sm px-1"
                    onClick={() => setXAxis((p) => p + 50)}
                  >
                    <ChevronRight />
                  </div>
                </div>

                <div
                  className="bg-gray-300 hover:bg-gray-200 rounded-sm px-1"
                  onClick={() => setYAxis((p) => p + 50)}
                >
                  <ChevronDown />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="w-full">
        <UploadImageSection setBgImageUrl={setBgImageUrl} />
      </div>

      <div className={kumbh_Sans.className}>
        <button
          onClick={handleDownload}
          className="p-[3px] relative text-lg font-semibold"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent hover:text-black">
            Download Image
          </div>
        </button>
      </div>
    </div>
  );
};

export default ChangeBg;
