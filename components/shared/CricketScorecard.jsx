import { useState, useEffect } from 'react';
import { FaMinus, FaPlus } from "react-icons/fa";
import { Button } from '../ui/button';
import io from 'socket.io-client';
import { socket } from '@/lib/AuthSession';
import { finishMatch } from '@/lib/database/actions/match.actions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { updateScores } from '@/lib/database/actions/match.actions';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const CricketScorecard = ({ teamA, teamB, matchId }) => {

    const [teamAScore, setTeamAScore] = useState(0);
    const [teamAWickets, setTeamAWickets] = useState(0);
    const [teamBScore, setTeamBScore] = useState(0);
    const [teamBWickets, setTeamBWickets] = useState(0);
    const [currentTeam, setCurrentTeam] = useState(teamA);
    const [currentTeamOver, setCurrentTeamOver] = useState(0);
    const [currentTeamBalls, setCurrentTeamBalls] = useState(0);
    const [extraScore, setExtraScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [winningTeam, setWinningTeam] = useState('')


    const [teamsData, setTeamsData] = useState({
        team1: {
            team: teamA,
            score: teamAScore,
            wickets: teamAWickets,
            overs: currentTeamOver + currentTeamBalls / 10, // Calculate overs
        },
        team2: {
            team: teamB,
            score: teamBScore,
            wickets: teamBWickets,
            overs: currentTeamOver + currentTeamBalls / 10, // Calculate overs
        },
    });


    useEffect(() => {
        setTeamsData({
            ...teamsData,
            team1: {
                ...teamsData.team1,
                score: teamAScore,
                wickets: teamAWickets,
                overs: currentTeamOver + currentTeamBalls / 10, // Update overs
            },
            team2: {
                ...teamsData.team2,
                score: teamBScore,
                wickets: teamBWickets,
                overs: currentTeamOver + currentTeamBalls / 10, // Update overs
            },
        });

    }, [teamAScore, teamAWickets, teamBScore, teamBWickets, currentTeamOver, currentTeamBalls]);

    const handleRuns = (runs) => {
        if (currentTeam === teamA) {
            setTeamAScore(teamAScore + runs + extraScore);
            setCurrentTeamBalls(currentTeamBalls + 1);
        } else {
            setTeamBScore(teamBScore + runs + extraScore);
            setCurrentTeamBalls(currentTeamBalls + 1);
        }
        if (currentTeamBalls === 5) {
            setCurrentTeamBalls(0);
            setCurrentTeamOver(currentTeamOver + 1);
        }
        setExtraScore(0);
    };

    const handleWicket = () => {
        if (currentTeam === teamA) {
            setTeamAWickets(teamAWickets + 1);
        } else {
            setTeamBWickets(teamBWickets + 1);
        }
        setCurrentTeamBalls(currentTeamBalls + 1);
        if (currentTeamBalls === 5) {
            setCurrentTeamBalls(0);
            setCurrentTeamOver(currentTeamOver + 1);
        }
    };

    const resetScores = (team) => {
        if (team === teamA) {
            setTeamAScore(0);
            setTeamAWickets(0);
        }
        else {
            setTeamBScore(0);
            setTeamBWickets(0);
        }
    }

    const handleSwitchTeam = () => {
        setCurrentTeam(currentTeam === teamA ? teamB : teamA);
        setCurrentTeamOver(0);
        setCurrentTeamBalls(0);
        toast.success('team turn switched')
    };

    const handleExtraScore = (extra) => {
        if (currentTeam === teamA) {
            setTeamAScore(teamAScore + extra);
        } else {
            setTeamBScore(teamBScore + extra);
        }
    };

    const updateScoresOfTeams = async (id, data) => {
        console.log('hehe', data);
        await updateScores(id, data);
    }

    updateScoresOfTeams(matchId, teamsData);

    socket.emit('cricketScore', teamsData);


    return (
        <div className='bg-white w-full p-4 m-3 rounded-lg flex flex-col items-center justify-center'>
            <h2 className='text-3xl my-4 font-bold capitalize'>
                Cricket Match
            </h2>
            <h3 className="text-xl font-semibold mb-2 bg-blue-50 px-8 rounded-full italic text-primary py-0.5">{currentTeam} Batting</h3>
            <div className="flex flex-wrap max-w-xl items-center justify-center mt-3 gap-4 mb-6">
                <Button onClick={() => handleRuns(1)}><FaPlus className='mr-2' /> 1 Run</Button>
                <Button onClick={() => handleRuns(2)}><FaPlus className='mr-2' /> 2 Runs</Button>
                <Button onClick={() => handleRuns(3)}><FaPlus className='mr-2' /> 3 Runs</Button>
                <Button onClick={() => handleRuns(4)}><FaPlus className='mr-2' /> 4 Runs</Button>
                <Button onClick={() => handleRuns(6)}><FaPlus className='mr-2' /> 6 Runs</Button>
                <Button className='bg-red-600' onClick={handleWicket}><FaMinus className='mr-2' /> Wicket</Button>
                <Button onClick={() => handleExtraScore(1)}>+1 Extra</Button>
                <Button onClick={() => handleExtraScore(2)}>+2 Extra</Button>
            </div>
            <div className='text-lg mt-6 flex flex-col md:flex-row items-center justify-evenly w-full font-semibold'>
                <div className='flex flex-col gap-3 items-center justify-center'>
                    <h2 className='text-2xl font-bold text-primary capitalize'>{teamA} Score</h2>
                    <p className='text-lg text-slate-700'>{teamAScore} / {teamAWickets}</p>
                    {/* <button className='text-xs bg-red-50 px-4 py-0.5 rounded-full font-semibold text-red-500'
                        onClick={() => resetScores(teamA)}>Reset score</button> */}
                </div>
                <p className='text-lg text-slate-700'>Overs: {teamsData.team1.overs.toFixed(1)}</p>
                <div className='flex flex-col gap-3 items-center justify-center'>
                    <h2 className='text-2xl font-bold text-primary capitalize'>{teamB} Score</h2>
                    <p className='text-lg text-slate-700'>{teamBScore} / {teamBWickets}</p>
                    {/* <button className='text-xs bg-red-50 px-4 py-0.5 rounded-full font-semibold text-red-500'
                        onClick={() => resetScores(teamB)}>Reset score</button> */}
                </div>
            </div>
            {
                !isFinished && (
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
                )
            }

            {
                isFinished ? (
                    <p className='text-slate-500 my-6 font-light italic text-sm'>
                        Match Finished
                    </p>
                ) : (
                    <div className='flex flex-col md:flex-row gap-4 items-center justify-center'>

                        <Button className='mt-6 mb-4 px-4 rounded-full' onClick={handleSwitchTeam}>Switch Teams</Button>
                        <Button className='mt-6 mb-4 px-4 rounded-full' disabled={winningTeam === ''} onClick={async () => {
                            await finishMatch(matchId, winningTeam)
                            socket.emit('matchFinish', winningTeam)
                            toast.success('Results saved')
                            setIsFinished(true);
                        }}>Save Results</Button>
                    </div>
                )
            }


        </div>
    );
};

export default CricketScorecard;
