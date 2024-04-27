"use server"

import { Feedback } from "../models/feedbaclk.model"
import { connectToDatabase } from ".."

export const createFeedback = async (data) => {
    try {
        await connectToDatabase()
        const feedback = await Feedback.create(data)
        return JSON.parse(JSON.stringify(feedback))
    } catch (error) {
        throw error
        console.log(error)
    }
}

export const getFeedbacks = async () => {
    try {
        await connectToDatabase()
        const feedbacks = await Feedback.find().populate("user")
        return JSON.parse(JSON.stringify(feedbacks))
    } catch (error) {
        throw error
    }
}

export const getFeedback = async (id) => {
    try {
        await connectToDatabase()
        const feedback = await Feedback.findById(id)
        return JSON.parse(JSON.stringify(feedback))
    } catch (error) {
        throw error
    }
}
