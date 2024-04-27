"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import FootballScorecard from "@/components/shared/FootballScorecard";
import CricketScorecard from "@/components/shared/CricketScorecard";
import { socket } from "@/lib/AuthSession";
import { toast } from "react-hot-toast";
import { startMatch } from "@/lib/database/actions/match.actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LiveScore from "./LiveScore";
import BasketballScorecard from "./BasketballScorecard";
const page = ({ events, matches }) => {
  console.log("🚀 ~ page ~ matches:", matches);
  const session = useSession();
  const router = useRouter();
  const [sportsType, setSportsType] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [firstTeam, setFirstTeam] = useState("");
  const [secondTeam, setSecondTeam] = useState("");
  const [matchStarted, setMatchStarted] = useState(false);
  const [matchId, setMatchId] = useState("");
  const [teamTurn, setteamTurn] = useState("");
  socket.on("matchStart", () => {
    console.log("match started");
  });

  socket.on("matchFinish", () => {
    console.log("match finished");
  });

  console.log(teamTurn);

  return (
    <>
      {session.data && session.data.user.role === "admin" && (
        <div className="flex flex-col items-center justify-center m-2 p-4">
          <div
            className="flex flex-col justify-center items-center w-full bg-blue-100 
            py-8"
          >
            <div className="flex flex-col lg:flex-row w-full items-center justify-evenly">
              <div className="flex items-start justify-center flex-col rounded-xl p-4">
                <h2 className="text-3xl font-bold caption-top">Scoreboard</h2>
                <p>Select the sports type for relevent scorecard</p>
              </div>
              <div>
                <Select onValueChange={(v) => setSelectedEvent(v)}>
                  <SelectTrigger className=" w-72 bg-white  rounded-full px-6 py-6 shadow-lg font-semibold text-lg focus:outline-slate-100 inline-flex items-center gap-2">
                    <SelectValue placeholder="                      Select Sports" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.eventName} value={event}>
                        {event.eventName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Separator className="text-blue-800 my-3" />
            {selectedEvent !== null && (
              <div className="lg:w-fit flex flex-col items-center justify-center bg-white py-6 rounded-lg shadow px-4 w-[90%] lg:px-12">
                <h2 className="text-2xl font-bold mb-6 capitalize ">
                  {selectedEvent.eventName}
                </h2>
                <div className=" w-full flex items-center gap-4 mb-4">
                  <h2 className="text-xl font-bold  capitalize ">
                    Sports Type:
                  </h2>

                  <Select onValueChange={(v) => setSportsType(v)}>
                    <SelectTrigger className=" bg-slate-50 text-sm w-52  rounded-lg">
                      <SelectValue placeholder="sportsType" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cricket">Cricket</SelectItem>
                      <SelectItem value="football">Football</SelectItem>
                      <SelectItem value="basketball">Basketball</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className=" flex flex-col lg:flex-row w-full gap-8 items-center justify-evenly">
                  <div className="flex flex-col justify-start items-start">
                    <label
                      htmlFor="first"
                      className=" font-semibold text-sm  ml-1 mb-1"
                    >
                      First Team Name:
                    </label>
                    <Select onValueChange={(v) => setFirstTeam(v)}>
                      <SelectTrigger className=" bg-slate-50 text-sm w-52  rounded-lg">
                        <SelectValue placeholder="First Team" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedEvent.teams.map((team) => (
                          <SelectItem key={team.teamName} value={team.teamName}>
                            {team.teamName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <label
                      htmlFor="second"
                      className=" font-semibold text-sm  ml-1 mb-1"
                    >
                      Second Team Name:
                    </label>
                    <Select onValueChange={(v) => setSecondTeam(v)}>
                      <SelectTrigger className=" bg-slate-50 text-sm w-52  rounded-lg">
                        <SelectValue placeholder="Second Team" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedEvent.teams.map((team) => (
                          <SelectItem key={team.teamName} value={team.teamName}>
                            {team.teamName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {sportsType === "cricket" &&
                    firstTeam !== "" &&
                    secondTeam !== "" && (
                      <div className="flex flex-col justify-start items-start">
                        <label
                          htmlFor="second"
                          className=" font-semibold text-sm  ml-1 mb-1"
                        >
                          Team Turn:
                        </label>
                        <Select onValueChange={(v) => setteamTurn(v)}>
                          <SelectTrigger className=" bg-slate-50 text-sm w-52  rounded-lg">
                            <SelectValue placeholder="batting team" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={firstTeam}>
                              {firstTeam}
                            </SelectItem>
                            <SelectItem value={secondTeam}>
                              {secondTeam}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                </div>
                {firstTeam === "" || secondTeam === "" || sportsType === "" ? (
                  <Button
                    disabled
                    onClick={() => setMatchStarted(true)}
                    className="mt-6 rounded-lg"
                  >
                    Start Scorecard
                  </Button>
                ) : (
                  <Button
                    onClick={async () => {
                      const matchData = await startMatch({
                        isFinished: false,
                        teamA: firstTeam,
                        teamB: secondTeam,
                        sportsType,
                        teamAGoal: 0,
                        teamBGoals: 0,
                        teamAScoreData: {
                          score: 0,
                          wickets: 0,
                          overs: 0.0,
                        },
                        teamBScoreData: {
                          score: 0,
                          wickets: 0,
                          overs: 0,
                        },
                        teamTurn: teamTurn,
                      });
                      setMatchId(matchData._id);
                      socket.emit("matchStart", {
                        sportsType,
                        team1: firstTeam,
                        team2: secondTeam,
                      });
                      toast.success("match started");

                      setMatchStarted(true);
                      setSelectedEvent(null);
                      router.refresh();
                    }}
                    className="mt-6 rounded-lg"
                  >
                    Start Scorecard
                  </Button>
                )}
              </div>
            )}
          </div>

          {matches.map((match) => {
            if (match.sportsType === "football") {
              return (
                <FootballScorecard
                  key={match._id}
                  sportsType={match.sportsType}
                  teamA={match.teamA}
                  teamB={match.teamB}
                  matchId={match._id}
                  teamAGoal={match.teamAGoal}
                  teamBGoals={match.teamBGoals}
                />
              );
            }
            if (match.sportsType === "basketball") {
              return (
                <BasketballScorecard
                  key={match._id}
                  sportsType={match.sportsType}
                  teamA={match.teamA}
                  teamB={match.teamB}
                  matchId={match._id}
                  teamAGoal={match.teamAGoal}
                  teamBGoals={match.teamBGoals}
                />
              );
            }
            if (match.sportsType === "cricket") {
              return (
                <CricketScorecard
                  key={match._id}
                  teamA={match.teamA}
                  teamB={match.teamB}
                  matchId={match._id}
                  teamAScoreData={match.teamAScoreData}
                  teamBScoreData={match.teamBScoreData}
                  turn={match.teamTurn}
                />
              );
            }
          })}
        </div>
      )}

      {matches.length !== 0 ? (
        matches.map((match) => <LiveScore key={match._id} matchData={match} />)
      ) : (
        <div className="w-full flex items-center justify-center p-4 mt-6 ">
          <p className=" font-semibold italic text-primary">
            No Matched going on right now
          </p>
        </div>
      )}
    </>
  );
};
export default page;
