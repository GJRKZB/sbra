"use client";

import React from "react";
import { Slider, SliderValue } from "@nextui-org/react";

interface ReviewSliderProps {
  label: string;
  onChange: (value: SliderValue) => void;
}

const ReviewSlider: React.FC<ReviewSliderProps> = ({ label, onChange }) => {
  return (
    <Slider
      size="lg"
      step={0.5}
      color="foreground"
      label={label}
      showSteps={true}
      maxValue={5}
      minValue={0}
      defaultValue={0}
      className="max-w-md"
      onChange={onChange}
    />
  );
};

export const ReviewSliders: React.FC = () => {
  return (
    <div className="w-full flex justify-center flex-col text-mono items-center gap-5">
      <ReviewSlider
        label="Hoe ziet het eruit?"
        onChange={(value: SliderValue) => console.log(value)}
      />
      <ReviewSlider
        label="Hoe makkelijk van het bot?"
        onChange={(value: SliderValue) => console.log(value)}
      />
      <ReviewSlider
        label="Smaak"
        onChange={(value: SliderValue) => console.log(value)}
      />
      <ReviewSlider
        label="Smaak Marinade"
        onChange={(value: SliderValue) => console.log(value)}
      />
      <ReviewSlider
        label="Happy hands"
        onChange={(value: SliderValue) => console.log(value)}
      />
      <ReviewSlider
        label="Sfeer omgeving"
        onChange={(value: SliderValue) => console.log(value)}
      />
      <ReviewSlider
        label="Hoe schoon toilet?"
        onChange={(value: SliderValue) => console.log(value)}
      />
      <ReviewSlider
        label="Snelheid personeel"
        onChange={(value: SliderValue) => console.log(value)}
      />
    </div>
  );
};
