import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPointableOfEvent } from "@/lib/database/actions/pointable.action";
import PredictiveAnalysis from "@/components/shared/PredictiveAnalysis";

const page = async ({ params: { id } }) => {
  const pointable = await getPointableOfEvent(id);
  console.log("🚀 ~ page ~ pointable:", pointable);

  return (
    <div className=" flex flex-col items-start justify-start p-4 md:p-8  md:px-12">
      <div className=" w-full flex items-center justify-between mb-3">
        <h1 className=" text-2xl font-bold border-b pb-4 w-full">
          {" "}
          {pointable && pointable[0].eventId.eventName}{" "}
          <span className=" ml-2"> Points Table</span>
        </h1>
        <PredictiveAnalysis />
      </div>

      <Table>
        <TableCaption>
          {!pointable
            ? " No team has registred in this event "
            : " Point table is being managed by admins"}
        </TableCaption>
        <TableHeader className="bg-primary-500 text-white font-bold text-lg rounded-lg">
          <TableRow>
            <TableHead className=" text-white text-center">Team</TableHead>
            <TableHead className=" text-white text-center">
              Matches Played
            </TableHead>
            <TableHead className=" text-white text-center">Won</TableHead>
            <TableHead className=" text-white text-center">Lost</TableHead>
            <TableHead className=" text-white text-center">Draw</TableHead>
            <TableHead className=" text-white text-center">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pointable.map((team) => (
            <TableRow key={team._id} className="">
              <TableCell className="text-center border-b">
                {team.teamId.teamName}
              </TableCell>
              <TableCell className="text-center border-b">
                {team.matchesPlayed}
              </TableCell>
              <TableCell className="text-center border-b">
                {team.matchesWon}
              </TableCell>
              <TableCell className="text-center border-b">
                {team.matchesLost}
              </TableCell>
              <TableCell className="text-center border-b">
                {team.matchesDrawn}
              </TableCell>
              <TableCell className="text-center border-b">
                {team.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
