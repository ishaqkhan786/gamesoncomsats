import { useState } from 'react';
import { Separator } from '../ui/separator';
import { FaMinus, FaPlus } from "react-icons/fa";
import { Button } from '../ui/button';

const BasketballScorecard = ({ teamA, teamB }) => {
    const [team1Points, setTeam1Points] = useState(0);
    const [team2Points, setTeam2Points] = useState(0);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Month is zero-indexed, so add 1
    const day = today.getDate();

    return (
        <div className='bg-white w-full p-4 m-3 rounded-lg flex flex-col items-center justify-center'>
            <h2 className='text-3xl font-bold capitalize  mb-1'>
                Basketball Match
            </h2>
            <p className=' mb-4 font-light text-slate-500'>
                {day}/{month}/{year}
            </p>
            <Separator className='w-[80%] text-slate-400' />
            <h2 className='text-4xl font-bold my-4 '>
                {team1Points} - {team2Points}
            </h2>
            <div className='flex flex-row items-center w-full justify-evenly mt-4'>
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-lg md:text-2xl font-semibold capitalize text-primary'>
                        {teamA}
                    </h2>
                    <div className='flex text-sm md:text-lg items-center justify-center gap-4 mt-4'>
                        <button className=' bg-slate-100/80 hover:bg-slate-200/70 p-1' onClick={() => {

                            setTeam1Points(team2Points - 1)
                            socket.emit('footballScore', {
                                'team1Point': team1Points - 1,
                                'team2goals': team2Points,
                            })

                        }} disabled={team1Points === 0}><FaMinus /></button>
                        <span>{team1Points}</span>
                        <button className=' bg-slate-100/80 hover:bg-slate-200/70 p-1' onClick={() => setTeam1Points(team1Points + 1)} disabled={team1Points === 100}><FaPlus /></button>
                    </div>
                    <p className='text-xs font-thin text-slate-500 mt-3'>
                        points for Team A
                    </p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-lg md:text-2xl font-semibold capitalize text-primary'>
                        {teamB}
                    </h2>
                    <div className='flex text-sm md:text-lg items-center justify-center gap-4 mt-4'>
                        <button className=' bg-slate-100/80 hover:bg-slate-200/70 p-1' onClick={() => setTeam2Points(team2Points - 1)} disabled={team2Points === 0}><FaMinus /></button>
                        <span>{team2Points}</span>
                        <button className=' bg-slate-100/80 hover:bg-slate-200/70 p-1' onClick={() => setTeam2Points(team2Points + 1)} disabled={team2Points === 100}><FaPlus /></button>
                    </div>
                    <p className='text-xs font-thin text-slate-500 mt-3'>
                        points for Team B
                    </p>
                </div>
            </div>
            <Button className='mt-6 mb-4 px-4 rounded-full'>Save Results</Button>
        </div>
    );
};

export default BasketballScorecard;
