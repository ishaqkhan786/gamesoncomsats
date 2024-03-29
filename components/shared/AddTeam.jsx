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
import { addTeam } from '@/lib/database/actions/event.actions';

const AddGround = ({ eventId }) => {

    const [validation, setValidation] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const formSchema = z.object({
        teamName: z.string().min(3,
            "Please add a team name",
        ),
        captainName: z.string().min(3,
            "Please enter team captain name",
        ),
        department: z.string().min(1, "Please add department name")
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teamName: "CS Strikers",
            department: "Bscs",
            captainName: "Asfar"
        },
    });
    async function onSubmit(values) {
        console.log(values);
        setValidation('')
        const res = await toast.promise(addTeam(values, eventId),
            {
                success: "Team Added",
                loading: 'Adding Team',
                error: "Error Adding Team"
            })
        console.log(res)
        if (res.status && res.status === 401) {
            setValidation("Team Already Added");
        }
        else {
            router.push('/events')
            router.refresh();
        }
    }
    return (
        <div className='flex flex-col w-full items-center justify-center rounded-lg p-6'>

            <Form {...form}>
                <div
                    id="first"
                    className="flex flex-col items-center bg-white shadow-md w-[24rem] md:w-[70%]  rounded-xl px-8 pt-6 pb-8 mb-4 space-y-6"
                >
                    <h1 className='text-2xl font-bold'>
                        Register Team
                    </h1>
                    <Separator />
                    <form
                        id="container"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className=" w-full"
                    >
                        <FormField
                            control={form.control}
                            name="teamName"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel className="block text-gray-700 font-bold mb-2">
                                        Team Name:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="team"
                                            type='text'
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
                            name="captainName"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel className="block text-gray-700 font-bold mb-3">
                                        Captain Name:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="team captain "
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
                            name="department"
                            render={({ field }) => (
                                <FormItem className="mb-4">
                                    <FormLabel className="block  text-gray-700 font-bold mb-3">
                                        Department:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="dept"
                                            type="text"
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
                                    <span>Add Team</span>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </Form>
        </div>
    )
}

export default AddGround
