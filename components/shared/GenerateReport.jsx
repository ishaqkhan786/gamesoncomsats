"use client";

import React from "react";

const GenerateReport = () => {
  return (
    <button
      className=" text-white bg-primary px-4 py-1 text-nowrap rounded-lg"
      onClick={(e) => {
        console.log("hi");
      }}
    >
      Generate Report
    </button>
  );
};

export default GenerateReport;
