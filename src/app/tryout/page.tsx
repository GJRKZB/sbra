"use client";
/**
 * 1. Implement 5 slider UI components from NextUI
 * 2. useState to manage the slider value
 * 3. Real-time update state on slider change
 * 4. Get average rating from all sliders
 * 5. Display the average rating
 */

import { useState } from "react";
import { Slider } from "@nextui-org/react";

export default function Page() {
  const [values, setValues] = useState<number[]>([0, 0, 0, 0, 0]);
  const sum = values.reduce((acc, val) => acc + val, 0) / values.length;
  const average = sum.toFixed(1);

  const handleChange = (index: number) => (value: number) => {
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  return (
    <main className="h-full w-screen px-5 pt-10 gap-10 flex flex-col">
      <div className="w-full flex justify-center flex-col text-mono items-center gap-5">
        {values.map((value, index) => (
          <Slider
            key={index}
            size="sm"
            step={0.5}
            color="foreground"
            label="Rating"
            showSteps={true}
            maxValue={5}
            minValue={0}
            value={value}
            onChange={(value) => handleChange(index)(value as number)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="font-bold text-base text-black">Your rating:</p>
        <div className="bg-black p-5 rounded-full">
          <p className="font-bold text-base text-white">{average}</p>
        </div>
      </div>
    </main>
  );
}
