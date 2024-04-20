"use client";

import React from "react";
import ConfettiExplosion from "react-confetti-explosion";

const page = () => {
  const [isExploding, setIsExploding] = React.useState(true);

  return (
    <div className=" flex flex-col items-center justify-start pt-6 min-h-screen w-full bg-slate-50">
      <div className=" bg-white flex flex-col items-center justify-center p-8 rounded-lg shadow-md ">
        <img
          src="https://fcs3pub.s3.amazonaws.com/photo-book/images/payment/success.gif"
          alt=""
        />
        <p className=" text-primary font-bold text-lg">
          Your Order has been placed successfully
        </p>
      </div>
    </div>
  );
};

export default page;
