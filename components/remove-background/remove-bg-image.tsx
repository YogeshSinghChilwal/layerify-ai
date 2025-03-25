"use client"

import { removeBackground } from "@imgly/background-removal";
import React, { useEffect, useRef, useState } from "react";
import { kumbh_Sans } from "../ui/fonts";
import { Skeleton } from "../ui/skeleton";

const RemovedBgImage = () => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [processedImgSrc, setProcessedImgSrc] = useState<string | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const downloadCanvasRef = useRef<HTMLCanvasElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealProgress = useRef(0);

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
      startRevealAnimation();
    }
  }, [canvasReady]);

  const startRevealAnimation = () => {
    if (!canvasRef.current || !processedImgSrc || !imgSrc) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const originalImg = new Image();
    const removedBgImg = new Image();

    originalImg.onload = () => {
      removedBgImg.onload = () => {
        canvas.width = originalImg.width;
        canvas.height = originalImg.height;

        revealProgress.current = 0; // Reset animation progress
        animateReveal(ctx, originalImg, removedBgImg, canvas.width, canvas.height);
      };
      removedBgImg.src = processedImgSrc;

    };

    originalImg.src = imgSrc;
  };

  const animateReveal = (
    ctx: CanvasRenderingContext2D,
    originalImg: HTMLImageElement,
    removedBgImg: HTMLImageElement,
    width: number,
    height: number
  ) => {
    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
  
      ctx.drawImage(originalImg, 0, 0, width, height);
  
      const revealWidth = width * revealProgress.current;
      drawChessboard(ctx, width, height, revealWidth);
  
      ctx.drawImage(removedBgImg, 0, 0, width, height);
  
      if (revealProgress.current < 1) {
        revealProgress.current += 0.003; // Adjust speed
        requestAnimationFrame(drawFrame);
      }
    };
  
    requestAnimationFrame(drawFrame);
  };
  
  const drawChessboard = (ctx: CanvasRenderingContext2D, width: number, height: number, revealWidth: number) => {
    const squareSize = 80;
  
    for (let x = width - revealWidth; x < width; x += squareSize) {
      for (let y = 0; y < height; y += squareSize) {
        ctx.fillStyle = (Math.floor(x / squareSize) + Math.floor(y / squareSize)) % 2 === 0 ? "#fff" : "#ccc";
        ctx.fillRect(x, y, squareSize, squareSize);
      }
    }
  };
  

  const handleDownload = () => {
    if (!downloadCanvasRef.current || !processedImgSrc) return;

    const canvas = downloadCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const removedBgImg = new Image();
    removedBgImg.crossOrigin = "anonymous";
    removedBgImg.onload = () => {
      canvas.width = removedBgImg.width;
      canvas.height = removedBgImg.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(removedBgImg, 0, 0, canvas.width, canvas.height);

      
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "removed-bg-layerify.png";
      link.click();
    };
    removedBgImg.src = processedImgSrc;
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div>
        {processedImgSrc ? (
          <div className="w-[300] h-[300] lg:w-[400] lg:h-[400]">
            <canvas ref={canvasRef} className="w-full h-full object-contain"></canvas>
          </div>
        ) : (
          <Skeleton className="w-[300] h-[300] lg:w-[400] lg:h-[400]" />
        )}
      </div>
       {/* Hidden Canvas for Downloading Image */}
       <canvas ref={downloadCanvasRef} style={{ display: "none" }}></canvas>

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

export default RemovedBgImage;
