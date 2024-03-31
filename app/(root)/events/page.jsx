import AddEvent from '@/components/shared/AddEvent'
import { Button } from '@/components/ui/button';
import { getAllEvents } from '@/lib/database/actions/event.actions';
import Link from 'next/link';
import React from 'react'
import { MdLocationPin, MdDateRange } from "react-icons/md";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import RemoveEvent from '@/components/shared/RemoveEvent';

const page = async () => {

    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/login')
    }

    const events = await getAllEvents();
    return (
        <>
            {
                session.user.role === 'admin' && (<div className='flex items-center  justify-center lg:justify-between w-full lg:w-fit my-6 lg:my-4  lg:p-4 bg-blue-50 lg:m-4 rounded-md'>
                    <div className='hidden lg:flex flex-col items-center justify-center w-fit'>
                        <h2 className='font-bold text-2xl text-primary-500'>Create Event for Comsats</h2>
                        <p className='text-slate-600 text-sm font-semibold px-3 text-center mt-3'>
                            The event is set to occur at Comsats University Islamabad, with a stipulated number of teams required to reserve their slots in advance to participate in the event proceedings.
                        </p>
                        <div className="mt-6 max-w-md w-full bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg text-center leading-6 font-medium text-gray-900">Event Rules</h3>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    <div className="bg-gray-50 text-xs px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-xs font-medium text-center text-gray-500">Registration Deadline</dt>
                                        <dd className="mt-1 text-xs text-gray-900 sm:col-span-2">All teams must register before a specified deadline to secure participation.</dd>
                                    </div>
                                    <div className="bg-white px-4 text-xs py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-xs font-medium text-center text-gray-500">Team Composition</dt>
                                        <dd className="mt-1 text-xs text-gray-900 sm:col-span-2">Each team must consist of a minimum and maximum number of members.</dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 text-xs py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-xs font-medium text-center text-gray-500">Entry Fee</dt>
                                        <dd className="mt-1 text-xs text-gray-900 sm:col-span-2">A non-refundable entry fee is required from each participating team.</dd>
                                    </div>
                                    <div className="bg-white px-4 text-xs py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-xs font-medium text-center text-gray-500 ">Equipment Requirements</dt>
                                        <dd className="mt-1 text-xs text-gray-900 sm:col-span-2">Teams must adhere to specific equipment regulations.</dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 text-xs py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-xs font-medium text-center text-gray-500">Code of Conduct</dt>
                                        <dd className="mt-1 text-xs text-gray-900 sm:col-span-2">Participants are expected to adhere to a code of conduct promoting fair play and respect.</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <AddEvent />
                </div>)
            }

            <div className='flex flex-col items-center justify-center m-3 p-4  pt-6 w-[97%]'>
                <h3 className='text-2xl bg-blue-50 w-full flex items-center justify-center p-3 font-bold'>Comsats Events</h3>
                <div className=' grid w-full grid-cols-1 mt-6 gap-6
                '>
                    {/* gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6  */}
                    {
                        events.map((event) => {
                            const eventDate = new Date(event.date)

                            return (
                                <div key={event._id} className='flex flex-col 
                                md:flex-row gap-4 items-center md:items-start justify-between p-4 px-8 shadow-md rounded-md w-full'>
                                    <div className='flex flex-col items-start 
                                     justify-center'>
                                        <h2 className='font-bold mb-2 text-2xl text-primary-500'>{event.eventName}</h2>
                                        <p className='text-slate-600 font-medium text-sm inline-flex -ml-1'>
                                            <MdDateRange className='mt-0.5 mr-1 ' />
                                            {eventDate.toDateString()}
                                        </p>
                                        <p className=' inline-flex items-center font-medium text-sm -ml-1 text-slate-600'>
                                            <MdLocationPin className='mb-0.5' />
                                            {event.organizer}
                                        </p>
                                    </div>
                                    <div className='flex flex-col items-start justify-center'>
                                        {
                                            session.user.role === 'admin' ? (
                                                <Link className="px-6 mb-2 bg-primary-500 text-white rounded-full py-2" href={`/events/${event._id}/teams`}>Check Teams</Link>
                                            ) : (
                                                event.totalTeams > event.teams.length && session.user.role==="dptCoordinator" ? (
                                                    <Link href={`/events/${event._id}`} className="px-8 mb-2 bg-primary-500 text-white rounded-full py-2">Register</Link>
                                                ) : (
                                                    <Button disabled className="px-8 mb-2 bg-primary-500 text-white rounded-full py-2">Register</Button>

                                                )
                                            )
                                        }
                                         {
                                            session.user.role === 'admin' && (
                                                <RemoveEvent id={event._id} />
                                            )
                                         }
                                        {/* <p className='text-salte-600 font-medium text-sm'>
                                            Total Teams: <span className='font-lg text-primary-500 font-semibold'>{event.totalTeams}</span>
                                        </p> */}
                                        <p className='text-salte-600 font-medium text-sm'>
                                            Registered Teams: <span className='font-lg text-primary-500 font-semibold'>{event.teams.length}</span>
                                        </p>

                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>

    )
}

export default page
