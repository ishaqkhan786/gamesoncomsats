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

  // if (isFinished) {
  //     toast.success('Results saved!')
  //     router.push('/')
  // }

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Month is zero-indexed, so add 1
  const day = today.getDate();

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
      <div className="flex flex-row items-center w-full justify-evenly mt-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg md:text-2xl font-semibold capitalize text-primary">
            {teamA}
          </h2>
          <div className="flex text-sm md:text-lg items-center justify-center gap-4 mt-4">
            <button
              className=" bg-slate-100/80 hover:bg-slate-200/70 p-1"
              onClick={async () => {
                setTeam1Goals(team1Goals - 1);
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
                setTeam1Goals(team1Goals + 1);
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
      {!isFinished && (
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
      )}

      {isFinished ? (
        <p className="text-slate-500 my-6 font-light italic text-sm">
          Match Finished
        </p>
      ) : (
        <Button
          className="mt-6 mb-4 px-4 rounded-full"
          disabled={winningTeam === ""}
          onClick={async () => {
            await finishMatch(matchId, winningTeam);
            socket.emit("matchFinish", winningTeam);
            toast.success("Results saved");
            setIsFinished(true);
          }}
        >
          Save Results
        </Button>
      )}
    </div>
  );
};

export default BasketballScorecard;
