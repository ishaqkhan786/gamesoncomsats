"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RiFeedbackFill } from "react-icons/ri";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createFeedback } from "@/lib/database/actions/feedback.action";
import { FaStar } from "react-icons/fa";
import { useSession } from "next-auth/react";
const page = () => {
  const router = useRouter();
  const session = useSession();
  console.log("🚀 ~ page ~ session:", session);
  const [feedback, setFeedback] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const handleSubmit = async () => {
    if (!rating)
      return toast.error("Please rate us before submitting feedback");
    if (!feedback)
      return toast.error("Please write some feedback before submitting");

    if (isAnonymous) {
      const data = {
        user: null,
        message: feedback,
        rating: rating,
      };
      toast.promise(createFeedback(data), {
        loading: "Submitting Feedback",
        success: "Feedback Submitted",
        error: "Failed to submit feedback",
      });
      router.push("/");
    } else {
      const data = {
        user: session.data.user.id,
        message: feedback,
        rating: rating,
      };
      toast.promise(createFeedback(data), {
        loading: "Submitting Feedback",
        success: "Feedback Submitted",
        error: "Failed to submit feedback",
      });
      router.push("/");
    }
  };

  return (
    <div className=" p-4 md:p-12  ">
      <div className=" bg-blue-50 p-4 rounded-md shadow flex flex-col items-start justify-start gap-4 min-h-svh w-full">
        <h1 className="text-3xl font-bold text-primary">Feedback</h1>
        <p className="text-lg text-slate-700">
          We would love to hear your feedback on our website. Please fill the
          form below to help us improve.
        </p>
        <div className=" flex items-center justify-center">
          <p className=" font-semibold text-primary mr-2 mt-1">Rate us:</p>
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  className="hidden"
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  className="cursor-pointer text-2xl text-primary"
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>

        <textarea
          onChange={(v) => {
            setFeedback(v.target.value);
          }}
          className="h-64 p-4 bg-white w-full rounded-md  border-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          placeholder="Tell us how you feel."
        />
        <div className="w-full flex flex-col items-center gap-3 justify-center">
          <Button
            onClick={handleSubmit}
            className=" px-8 rounded-full inline-flex items-center gap-2"
          >
            Submit Feedback <RiFeedbackFill className="text-lg" />
          </Button>
          <p className="text-sm font-semibold">
            send anonymous feedback
            <input
              onChange={() => setIsAnonymous(!isAnonymous)}
              className=" mt-1 text-lg ml-1"
              type="checkbox"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
