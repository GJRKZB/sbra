"use client";

import React from "react";
import { Slider } from "@nextui-org/react";
import { useState, useEffect } from "react";

interface ReviewSliderProps {
  title: string;
  factors: { id: number; label: string; rating: number }[];
}

const Reviews: React.FC<ReviewSliderProps> = ({ title, factors }) => {
  const [values, setValues] = useState<number[]>(
    factors.map((factor) => factor.rating)
  );

  const average = (
    values.reduce((acc, val) => acc + val, 0) / values.length
  ).toFixed(1);

  const handleChange = (index: number) => (value: number) => {
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });

    console.log(
      `Restaurant: ${title}, Factor ${factors[index].label} rating: ${value}`
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <div className="w-full flex justify-center flex-col gap-2 items-center">
        <p className="font-bold text-base text-black">Your rating:</p>
        <div className="bg-black rounded-full w-20 h-20 items-center flex justify-center">
          <p className="font-bold text-base text-white">{average}</p>
        </div>
      </div>
      <div className="w-full flex justify-center flex-col text-mono items-center gap-2">
        {factors.map((factor, index) => (
          <div
            key={factor.id}
            className="w-full flex flex-col items-center gap-2"
          >
            <Slider
              size="lg"
              step={0.5}
              color="foreground"
              label={factor.label}
              showSteps={true}
              maxValue={5}
              minValue={0}
              defaultValue={factor.rating}
              className="max-w-md"
              onChange={(value) => handleChange(index)(value as number)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
