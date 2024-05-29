"use client";

import React from "react";
import { Slider, SliderValue } from "@nextui-org/react";

interface ReviewSliderProps {
  title: string;
  factors: { id: number; label: string; rating: number }[];
  onChange: (value: SliderValue) => void;
}

const ReviewSlider: React.FC<ReviewSliderProps> = ({ factors, title }) => {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      {factors.map((factor) => (
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
            onChange={(value: SliderValue) => {
              console.log(`value: ${value}, title: ${title}`);
            }}
          />
        </div>
      ))}
    </div>
  );
};

interface ReviewSlidersProps {
  title: string;
  factors: { id: number; label: string; rating: number }[];
}

export const ReviewSliders: React.FC<ReviewSlidersProps> = ({
  factors,
  title,
}) => {
  return (
    <div className="w-full flex justify-center flex-col text-mono items-center gap-5">
      <ReviewSlider
        factors={factors}
        title={title}
        onChange={(value: SliderValue) =>
          console.log(`value: ${value}, title: ${title}`)
        }
      />
    </div>
  );
};
