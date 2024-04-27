'use server'

import Match from "../models/match.model"
import { connectToDatabase } from ".."

export const startMatch = async (matchData) => {
    try {
        await connectToDatabase();
        const newMatch = await Match.create(matchData);
        console.log(newMatch);
        return JSON.parse(JSON.stringify(newMatch));

    } catch (error) {
        console.log(error);
    }
}

export const updateGoals = async (matchId, data) => {
    try {
        await connectToDatabase();
        const match = await Match.findById(matchId);
        match.teamAGoal = data.team1goals;
        match.teamBGoals = data.team2goals;

        await match.save();
        return JSON.parse(JSON.stringify(match));

    } catch (error) {
        console.log(error);
    }

}
export const updatePoints = async (matchId, data) => {
    try {
        await connectToDatabase();
        const match = await Match.findById(matchId);
        match.teamAPoints = data.team1goals;
        match.teamBPoints = data.team2goals;

        await match.save();
        return JSON.parse(JSON.stringify(match));

    } catch (error) {
        console.log(error);
    }

}

export const updateScores = async (matchId, data) => {
    try {
        await connectToDatabase();
        const match = await Match.findById(matchId);
        match.teamAScoreData = {
            score: data.team1.score,
            wickets: data.team1.wickets,
            overs: data.team1.overs
        };
        match.teamBScoreData = {
            score: data.team2.score,
            wickets: data.team2.wickets,
            overs: data.team2.overs
        };
        await match.save();
        return JSON.parse(JSON.stringify(match));

    } catch (error) {
        console.log(error);
    }

}


export const finishMatch = async (matchId, winningTeam) => {
    try {
        await connectToDatabase();
        console.log(matchId, winningTeam);
        const match = await Match.findById(matchId);
        match.isFinished = true;
        match.winningTeam = winningTeam;
        match.save();
        return JSON.parse(JSON.stringify(match));


    } catch (error) {
        console.log(error);
    }
}


export const getOngoingMatchDetails = async () => {
    try {
        await connectToDatabase();
        const match = await Match.find({ isFinished: false });
        return JSON.parse(JSON.stringify(match));


    } catch (error) {
        console.log(error);
    }
}

export const changeTurn = async (matchId, turn) => {
    try {
        await connectToDatabase();
        const match = await Match.findById(matchId);
        match.teamTurn = turn;
        await match.save();
        return JSON.parse(JSON.stringify(match));
    }
    catch (error) {
        console.log(error);
    }
}