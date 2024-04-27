import { getFeedbacks } from "@/lib/database/actions/feedback.action";
import React from "react";
import { FaStar } from "react-icons/fa6";
const page = async () => {
  const feedbacks = await getFeedbacks();
  console.log(feedbacks);
  return (
    <div className=" p-4 md:p-8  ">
      <div className=" w-full flex flex-col items-start justify-start p-4 px-8 bg-blue-50 rounded-md shadow-sm ">
        <h1 className="text-3xl font-bold text-primary mb-4">User Feedbacks</h1>
        {feedbacks.map((feedback) => (
          <div className=" flex flex-col w-full items-start justify-start pb-4 border-b pt-4 border-slate-200">
            <div
              key={feedback._id}
              className=" flex items-center justify-center  mb-2"
            >
              <h3 className="text-lg font-semibold text-primary mr-3 capitalize">
                {feedback.user ? feedback.user.username : "Anonymous"}
              </h3>
              {[...Array(feedback.rating)].map((_, index) => (
                <FaStar key={index} className="text-yellow-400" />
              ))}
            </div>
            <p className=" px-4 py-3 bg-white text-start w-full rounded-xl shadow-sm">
              {" "}
              {feedback.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
