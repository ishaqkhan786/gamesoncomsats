import { Separator } from '@/components/ui/separator';
import { getAllTeams } from '@/lib/database/actions/event.actions'
import React from 'react'

const page = async ({ params: { id } }) => {

    const teams = await getAllTeams(id);
    // console.log(teams)
    const eventDate = new Date(teams.date);
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className=' flex flex-col items-center justify-center gap-2 w-full bg-blue-50 p-4 rounded-lg '>
                <h2 className='text-2xl font-bold text-primary'>
                    {teams.eventName}
                </h2>
                <p>
                    {eventDate.toDateString()}
                </p>
                <div className='flex flex-col md:flex-row gap-1 md:gap-4'>
                    {/* <p className='text-sm'>
                        Total Teams: <span className='font-semibold text-lg text-primary'>{teams.totalTeams}</span>
                    </p> */}
                    <p className='text-sm'>
                        Bookings: <span className='font-semibold text-lg text-primary'>{teams.teams.length}</span>
                    </p>
                </div>
            </div>
            <div className=' w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 lg:grid-cols-3'>
                {
                    teams.teams.map((team) => {
                        return (
                            <div className='flex shadow-md bg-slate-50 flex-col justify-center items-center p-2' key={team._id}>
                                <h2 className='text-lg font-bold text-primary'>{team.teamName}</h2>
                                <Separator className='my-2' />
                                <p className='font-normal text-slate-600'>
                                    Department: {team.department}
                                </p>
                                <p className='font-normal text-slate-600'>
                                    Captain: {team.captainName}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default page
