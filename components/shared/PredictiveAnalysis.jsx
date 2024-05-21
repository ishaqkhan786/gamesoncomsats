"use client";

import React from "react";

const PredictiveAnalysis = () => {
  return (
    <button
      className=" text-white bg-primary px-4 py-1 text-nowrap rounded-lg"
      onClick={(e) => {
        console.log("hi");
      }}
    >
      Predict Analysis
    </button>
  );
};

export default PredictiveAnalysis;
