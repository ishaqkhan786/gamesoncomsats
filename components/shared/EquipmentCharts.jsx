'use client'

import Link from 'next/link';
import React from 'react'
import { PieChart, } from 'react-minimal-pie-chart'

const EquipmentCharts = ({ data }) => {
    console.log(data);
    return (
        <div className=' w-full mt-6 flex items-center justify-center gap-6 flex-wrap '>
            {
                data.map((eqp) => (
                    <div key={eqp._id} className='flex mt-6 items-center justify-center flex-col p-3 rounded-lg px-6 shadow '>
                        <h2 className='text-xl font-bold text-primary'>
                            {eqp.name}
                        </h2>
                        <PieChart
                            className=' w-32'
                            animation
                            animationDuration={500}
                            animationEasing="ease-out"
                            center={[50, 50]}
                            data={[
                                {
                                    color: "#93acf2",
                                    title: "One",
                                    value: eqp.availableQuantity,
                                },
                                {
                                    color: "#1d3885",
                                    title: "Two",
                                    value: eqp.bookedQuantity,
                                },

                            ]}
                            labelPosition={50}
                            lengthAngle={360}
                            lineWidth={15}
                            paddingAngle={0}
                            radius={40}
                            rounded
                            startAngle={10}
                            viewBoxSize={[100, 100]}
                        />
                        <div className='flex flex-col items-center justify-center '>
                            <p className='text-slate-700'>Total Qty: <span className='text-primary font-bold text-lg'>{eqp.totalQuantity}</span> </p>
                            <p className='text-slate-700'>Avaiable: <span className='text-primary font-bold text-lg'>{eqp.availableQuantity}</span> </p>
                            <p className='text-slate-700'>Booked: <span className='text-primary font-bold text-lg'>{eqp.bookedQuantity}</span> </p>
                        </div>

                        <Link href={`/inventory/${eqp._id}`} className="mt-4 bg-primary px-4 py-2 text-sm rounded-md text-white" varient="sm">Check Bookings</Link>

                    </div>
                ))
            }

        </div>

    )
}

export default EquipmentCharts
