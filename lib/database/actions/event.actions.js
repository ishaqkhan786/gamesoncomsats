"use server"

import Event from "../models/event.model"
import { connectToDatabase } from "../index"
import Team from "../models/team.model";
import { createPointable } from "./pointable.action";

export const createEvent = async (eventData) => {
    try {
        await connectToDatabase();

        const existingEvent = await Event.findOne({
            eventName: eventData.eventName
        });
        if (existingEvent) {
            // let error={
            //     error: "Event already exists."
            // }

            // return JSON.parse(JSON.stringify(error));
            throw new Error('Event already Added');
        }
        const newEvent = await Event.create(eventData);

        return JSON.parse(JSON.stringify(newEvent));

    } catch (error) {
        console.log(error)
        return {message:error.message, status:401};   
    }
}

export const getAllEvents = async () => {
    try {
        await connectToDatabase();
        const events = await Event.find().populate("teams");
        return JSON.parse(JSON.stringify(events))

    } catch (error) {
        console.log(error);
    }
}

export const addTeam = async (teamData, eventId) => {
    try {
        await connectToDatabase();

        const teamExists = await Team.findOne({ teamName: teamData.teamName })
        if (teamExists) {
            throw new Error("Team already Added");
        }

        const newTeam = await Team.create(teamData)
        if (newTeam) {
            newTeam.players.push({
                playerName: teamData.captainName,
                contact: '03232456233'
            })
            await newTeam.save();

            const event = await Event.findById(eventId);
            event.teams.push(newTeam._id)
            await event.save();
        }
        if (newTeam) 
        {   
            const data =
            {
                eventId: eventId,
                teamId: newTeam._id
                }
            await createPointable(data);
       }

        return JSON.parse(JSON.stringify(newTeam))

    } catch (error) {
        console.log(error)
        return { message: error.message, status: 401 };
    }
}

export const getAllTeams = async (eventId) => {
    try {
        await connectToDatabase();
        const teams = await Event.findById(eventId).populate({
            path: 'teams',
            model: 'Team'
        })
        return JSON.parse(JSON.stringify(teams));
    } catch (error) {
        console.log(error);
    }
}

export const removeEvent = async(entId) =>
{
    try {
        await connectToDatabase();
        const event = await Event.findByIdAndDelete(entId);
        if(!event)
        {
            throw new Error('event not found');
        }
        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        console.log(error);
    }
}