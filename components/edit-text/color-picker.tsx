import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { IoMdAdd } from "react-icons/io";

const ColorPickerPanel = ({color, setColor}: {color: string, setColor: (value: string) => void}) => {

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <div className="relative w-full mb-2 z-20">
      {/* Color Picker Trigger (Circle Button) */}
      <button
        className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
        style={{ backgroundColor: color }}
        onClick={() => setIsPickerOpen(!isPickerOpen)}
      >
        <div className="w-5 h-5 bg-white border rounded-full flex justify-center items-center">
          <IoMdAdd />
        </div>
      </button>

      {/* Color Picker Dropdown */}
      {isPickerOpen && (
        <div className="absolute left-0 mt-2 bg-white p-3 shadow-lg rounded-lg">
          <HexColorPicker
            color={color}
            className="w-[300px]"
            onChange={setColor}
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="mt-2 w-full p-1 border rounded text-center"
          />
        </div>
      )}
    </div>
  );
};

export default ColorPickerPanel;
