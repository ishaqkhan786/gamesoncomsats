"use client";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { IoMdAdd } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import { socket } from "@/lib/AuthSession";
import {
  finishMatch,
  updatePoints,
} from "@/lib/database/actions/match.actions";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorRing } from "react-loader-spinner";
import { updatePointable } from "@/lib/database/actions/pointable.action";

const BasketballScorecard = ({
  sportsType,
  teamA,
  teamB,
  matchId,
  teamAGoal,
  teamBGoals,
}) => {
  const [team1Goals, setTeam1Goals] = useState(teamAGoal);
  const [team2Goals, setTeam2Goals] = useState(teamBGoals);
  const [isFinished, setIsFinished] = useState(false);
  const [winningTeam, setWinningTeam] = useState("");
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const initialMinutes =
    parseInt(localStorage.getItem("basketBallMinutes")) || 120;
  const initialSeconds =
    parseInt(localStorage.getItem("basketBallSeconds")) || 0;

  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        handleMatchFinish();
      } else {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  useEffect(() => {
    localStorage.setItem("basketBallMinutes", minutes.toString());
    localStorage.setItem("basketBallSeconds", seconds.toString());
  }, [minutes, seconds]);

  useEffect(() => {
    console.log("Team 1 goals:", team1Goals);
  }, [team1Goals]);

  useEffect(() => {
    console.log("Team 2 goals:", team2Goals);
  }, [team2Goals]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Month is zero-indexed, so add 1
  const day = today.getDate();

  const handleMatchFinish = async () => {
    setisLoading(true);
    let newWinningTeam;
    if (team1Goals === team2Goals) {
      newWinningTeam = "tied";
    } else if (team1Goals > team2Goals) {
      newWinningTeam = teamA;
    } else {
      newWinningTeam = teamB;
    }
    setWinningTeam(newWinningTeam);
    toast.success(newWinningTeam);
    await finishMatch(matchId, newWinningTeam);
    socket.emit("matchFinish", winningTeam);
    await updatePointable(teamA, teamB, newWinningTeam);
    toast.success("Results saved", newWinningTeam);
    setisLoading(false);
    setIsFinished(true);
  };

  return (
    <div className="bg-white border-2 border-primary shadow w-full p-4 m-3 rounded-lg flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold capitalize  mb-1">
        {sportsType} Match
      </h2>
      <p className=" mb-4 font-light text-slate-500">
        {day}/{month}/{year}
      </p>
      <Separator className="w-[80%] text-slate-400" />
      <h2 className="text-4xl font-bold my-4 ">
        {team1Goals} - {team2Goals}
      </h2>
      <p className=" text-slate-600 font-bold text-base italic">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>
      <div className="flex flex-row items-center w-full justify-evenly mt-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg md:text-2xl font-semibold capitalize text-primary">
            {teamA}
          </h2>
          <div className="flex text-sm md:text-lg items-center justify-center gap-4 mt-4">
            <button
              className=" bg-slate-100/80 hover:bg-slate-200/70 p-1"
              onClick={async () => {
                setTeam1Goals((team1Goals) =>
                  team1Goals === 0 ? 0 : team1Goals - 1
                );

                let goals = {
                  team1goals: team1Goals - 1,
                  team2goals: team2Goals,
                };
                await updatePoints(matchId, goals);
                socket.emit("basketballScore", goals);
              }}
              disabled={team1Goals === 0}
            >
              <FaMinus />
            </button>
            <span>{team1Goals}</span>
            <button
              className=" bg-slate-100/80 hover:bg-slate-200/70 p-1"
              onClick={async () => {
                setTeam1Goals((team1Goals) => team1Goals + 1);
                let goals = {
                  team1goals: team1Goals + 1,
                  team2goals: team2Goals,
                };
                await updatePoints(matchId, goals);
                socket.emit("basketballScore", goals);
              }}
            >
              <FaPlus />
            </button>
          </div>
          <p className="text-xs font-thin text-slate-500 mt-3">
            {sportsType === "basketball"
              ? "points for teams"
              : " goals for team"}{" "}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg md:text-2xl font-semibold capitalize text-primary">
            {teamB}
          </h2>
          <div className="flex text-sm md:text-lg items-center justify-center gap-4 mt-4">
            <button
              className=" bg-slate-100/80 hover:bg-slate-200/70 p-1"
              onClick={async () => {
                setTeam2Goals(team2Goals - 1);

                let goals = {
                  team1goals: team1Goals,
                  team2goals: team2Goals - 1,
                };
                await updatePoints(matchId, goals);
                socket.emit("basketballScore", goals);
              }}
              disabled={team2Goals === 0}
            >
              <FaMinus />
            </button>
            <span>{team2Goals}</span>
            <button
              className=" bg-slate-100/80 hover:bg-slate-200/70 p-1"
              onClick={async () => {
                setTeam2Goals(team2Goals + 1);
                let goals = {
                  team1goals: team1Goals,
                  team2goals: team2Goals + 1,
                };
                await updatePoints(matchId, goals);
                socket.emit("basketballScore", goals);
              }}
            >
              <FaPlus />
            </button>
          </div>
          <p className="text-xs font-thin text-slate-500 mt-3">
            {sportsType === "basketball"
              ? "points for teams"
              : " goals for team"}
          </p>
        </div>
      </div>
      {/* {!isFinished && (
        <Select onValueChange={(v) => setWinningTeam(v)}>
          <SelectTrigger className=" w-64 mt-8 bg-white  rounded-md px-8 py-2 font-semibold text-sm focus:outline-slate-50 inline-flex items-center gap-2">
            <SelectValue placeholder="Select winning team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={teamA}>{teamA}</SelectItem>
            <SelectItem value={teamB}>{teamB}</SelectItem>
            <SelectItem value="tied">Match Tied</SelectItem>
          </SelectContent>
        </Select>
      )} */}

      {isFinished ? (
        <p className="text-slate-500 my-6 font-light italic text-sm">
          Match Finished
        </p>
      ) : (
        <Button
          className="mt-6 mb-4 px-4 rounded-full"
          onClick={handleMatchFinish}
        >
          {isLoading ? (
            <ColorRing
              visible={true}
              height="35"
              width="35"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
            />
          ) : (
            <span> Save Results</span>
          )}
        </Button>
      )}
    </div>
  );
};

export default BasketballScorecard;
