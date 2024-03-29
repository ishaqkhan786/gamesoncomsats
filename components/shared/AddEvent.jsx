"use client"
import React from 'react'
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ColorRing } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { createEvent } from '@/lib/database/actions/event.actions';

const AddEvent = () => {

    const [validation, setValidation] = useState("");
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState('');
    const router = useRouter();
    const formSchema = z.object({
        eventName: z.string().min(3,
            "Please enter Event Title",
        ),
        organizer: z.string().min(3,
            "Please add organizer",
        ),
        totalTeams: z.string().min(1, "Add total teams")
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // eventName: "Futsal League",
            totalTeams: "20",
            // date: "cricket",
            organizer: ''

        },
    });
    async function onSubmit(values) {
        console.log({ ...values, date });

        



        const res = await toast.promise(createEvent({ ...values, date }),
            {
                success: "Event Added",
                loading: 'Adding Event',
                error: "Error Adding Event"
            })
        console.log(res)
        if (res.status && res.status === 401) {
            setValidation("Event Already Added");
        }
        else {
            router.refresh()
        }

    }
    return (
        <div className='flex flex-col md:mx-4 w-full md:w-fit items-center justify-center rounded-lg  md:p-2'>

            <Form {...form}>
                <div
                    id="first"
                    className="flex  flex-col items-center justify-center bg-white shadow-md w-[17rem] md:w-[19rem] lg:w-[22rem]  rounded-xl px-4  pt-6 pb-8 mb-4 space-y-6"
                >
                    <h1 className='text-2xl font-bold'>
                        Create Event
                    </h1>
                    <Separator />
                    <form
                        id="container"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className=" w-full"
                    >
                        <FormField
                            control={form.control}
                            name="eventName"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel className="block text-gray-700 font-bold mb-2">
                                        Event Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                        
                                            {...field}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dae"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel className="block text-gray-700 font-bold mb-2">
                                        Date
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            onChange={(v) => (setDate(v.target.value))}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </FormControl>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name="totalTeams"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel className="block text-gray-700 font-bold mb-2">
                                        Total Teams
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            
                                            {...field}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <p className="text-sm text-red-400 font-semibold">
                                        {validation}
                                    </p>
                                </FormItem>
                            )}
                        /> */}
                        <FormField
                            control={form.control}
                            name="organizer"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel className="block text-gray-700 font-bold mb-2">
                                        Organizer
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            
                                            {...field}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <p className="text-sm text-red-400 font-semibold">
                                        {validation}
                                    </p>
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col w-full items-center justify-center">
                            <Button
                                type="submit"
                                className="bg-primary-500 hover:bg-primary mt-3 text-white font-semibold py-2 px-6 rounded-md  focus:outline-none focus:shadow-outline"
                            >
                                {loading ? (
                                    <ColorRing
                                        visible={true}
                                        height="35"
                                        width="35"
                                        ariaLabel="color-ring-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="color-ring-wrapper"
                                        colors={[
                                            "#ffffff",
                                            "#ffffff",
                                            "#ffffff",
                                            "#ffffff",
                                            "#ffffff",
                                        ]}
                                    />
                                ) : (
                                    <span>Add Event</span>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </Form>
        </div>
    )
}

export default AddEvent
