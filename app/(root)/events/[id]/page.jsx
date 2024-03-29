import React from 'react';
import { IoArrowRedoSharp } from "react-icons/io5";
import AddTeam from '@/components/shared/AddTeam'

const Page = ({ params: { id } }) => {
    return (
        <div className="flex flex-col items-start justify-start w-full p-6 text-center">
            <h2 className="text-3xl font-bold mb-2 text-primary">
                Register Your Team
            </h2>
            <div className='text-start'>
                <p className="mb-4 font-semibold text-slate-500">
                    Welcome to our team registration page! Were excited to have you onboard. Please fill out the form below to register your team.
                </p>
                <p className="mb-4 font-bold text-slate-600">
                    By registering your team, you agree to abide by the following Terms and Conditions:
                </p>
                <ul className=" mb-4">
                    <li className="mb-2 text-sm">
                        <IoArrowRedoSharp className='text-lg text-primary mr-1  inline-flex' />
                        Teams must consist of a minimum of 3 members and a maximum of 5 members.</li>
                    <li className="mb-2 text-sm">  <IoArrowRedoSharp className='text-lg text-primary mr-1 inline-flex' />
                        All team members must be at least 18 years old.</li>
                    <li className="mb-2 text-sm">
                        <IoArrowRedoSharp className='text-lg text-primary mr-1 inline-flex' />
                        Teams must adhere to the rules and regulations set forth by the competition organizers.</li>
                    <li className="mb-2 text-sm">
                        <IoArrowRedoSharp className='text-lg text-primary mr-1 inline-flex' />
                        The decisions of the judges are final and binding.</li>
                </ul>
                <p className="mb-4">
                    If you have any questions or concerns, please dont hesitate to <p className="text-primary hover:underline">contact us</p>.
                </p>
            </div >
            <AddTeam eventId={id} />
        </div >
    );
}

export default Page;
