"use client";

import { removeBackground } from "@imgly/background-removal";
import React, { useEffect, useRef, useState } from "react";
import { kumbh_Sans } from "../ui/fonts";
import { Skeleton } from "../ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { Slider } from "../ui/slider";
import ColorPickerPanel from "./color-picker";

const presets = {
  style: {
    fontSize: 100,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 1)",
    opacity: 1,
  },
};

const EditTextImage = () => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [processedImgSrc, setProcessedImgSrc] = useState<string | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  //* font style
  const [text, setText] = useState("VLOG");
  const [font, setFont] = useState("arial");
  const [textSize, setTextSize] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState(10);
  const [color, setColor] = useState("#ffffff"); // Default black
  const [textAlign, setTextAlign] = useState<CanvasTextAlign>("center");
  const [textBaseline, setTextBaseline] =
    useState<CanvasTextBaseline>("middle");

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
  }, [canvasReady, sliderValue, color, font, text, textAlign, textBaseline]);

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

      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      const preset = presets.style;

      ctx.save();

      ctx.textAlign = textAlign;
      ctx.textBaseline = textBaseline;

      let fontSize = 100;
      const selectFont = font;

      ctx.font = `${preset.fontWeight} ${fontSize}px ${selectFont}`;
      const textWidth = ctx.measureText(text).width;
      const targetWidth = canvas.width * 0.4;

      fontSize *= targetWidth / textWidth;

      if (textSize == 0) {
        setTextSize(fontSize);
      }

      ctx.font = `${preset.fontWeight} ${textSize}px ${selectFont}`;

      ctx.fillStyle = preset.color;
      ctx.globalAlpha = preset.opacity;

      const x = canvas.width / 2;
      const y = canvas.height / 2;

      ctx.translate(x, y);
      ctx.fillStyle = color;
      ctx.fillText(text, 0, 0);
      ctx.restore();

      const fgImg = new Image();
      fgImg.onload = () => {
        ctx.drawImage(fgImg, 0, 0, canvas.width, canvas.height);
      };

      fgImg.src = processedImgSrc;
    };

    bgImg.src = imgSrc;
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
        link.download = `added-text-${text}-layerify.webp`;
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

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Edit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="text">Text</Label>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  id="text"
                  placeholder="Text in thumbnail"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <ColorPickerPanel color={color} setColor={setColor} />
                <div className="flex gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="font">Font</Label>
                    <Select
                      value={font}
                      onValueChange={(value) => setFont(value)}
                    >
                      <SelectTrigger id="font" className="text-black">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="arial">Arial</SelectItem>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="domine">Domine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="text-align">Text Align</Label>
                    <Select
                      value={textAlign}
                      onValueChange={(value) =>
                        setTextAlign(value as CanvasTextAlign)
                      }
                    >
                      <SelectTrigger id="text-align" className="text-black">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="end">End</SelectItem>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                        <SelectItem value="start">Start</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="text-base-line">Text Baseline</Label>
                    <Select
                      value={textBaseline}
                      onValueChange={(value) =>
                        setTextBaseline(value as CanvasTextBaseline)
                      }
                    >
                      <SelectTrigger id="text-base-line" className="text-black">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="alphabetic">Alphabetic</SelectItem>
                        <SelectItem value="bottom">Bottom</SelectItem>
                        <SelectItem value="hanging">Hanging</SelectItem>
                        <SelectItem value="ideographic">Ideoraphic</SelectItem>
                        <SelectItem value="middle">Middle</SelectItem>
                        <SelectItem value="top">Top</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="slidebar">Font Size</Label>
                <Slider
                  defaultValue={[10]}
                  id="slidebar"
                  max={1000}
                  step={1}
                  onValueChange={(value) => {
                    const newSliderValue = value[0];
                    const diff = newSliderValue - sliderValue; // Compare with previous value
                    setTextSize((prevSize) => prevSize + diff); // Adjust textSize accordingly
                    setSliderValue(newSliderValue); // Update slider value
                  }}
                  className={"w-[90%]"}
                />
              </div>
            </div>
          </CardContent>
        </Card>
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

export default EditTextImage;
