
'use server'
import Pointable from '../models/pointable.model';
import { connectToDatabase } from '..';
import Team from '../models/team.model';

export const createPointable = async (data) => {
    try {
        await connectToDatabase();
        const pointable =  await Pointable.create(data);
        return JSON.parse(JSON.stringify(pointable));

    } catch (error) {
        console.log("🚀 ~ createPointable ~ error:", error)
        throw error;
    }
}


export const getPointableOfEvent = async (eventId) => {
    try {
        await connectToDatabase();

        const pointable = await Pointable.find({ eventId: eventId }).populate('teamId').sort({ points: -1 });
        return JSON.parse(JSON.stringify(pointable));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updatePointable = async (teamA, teamB, winning_team) => {
    try {
        await connectToDatabase();
        const teamADetails = await Team.findOne({teamName: teamA});
        const teamBDetails = await Team.findOne({ teamName: teamB });
        console.log(teamA, teamB, winning_team);
        if (winning_team === 'tied') {
            await updatePoints(teamADetails._id, 'draw');
            await updatePoints(teamBDetails._id, 'draw');
            return true;
        }
        
        await updatePoints(teamADetails._id, winning_team === teamA ? 'win' : 'loss');
        await updatePoints(teamBDetails._id, winning_team === teamB ? 'win' : 'loss');

        return true;
       

    }
    catch (error) {
        console.log(error);
        throw error;
    }



}
async function updatePoints(teamId, result) {
    const points = await Pointable.findOne({ teamId });
    
    if (!points) {
        throw new Error('Points entry not found');
    }
    console.log('team found',points);

    points.matchesPlayed++;

    if (result === 'win') {
        points.matchesWon++;
        points.points += 2;
    } else if (result === 'draw') {
        points.points += 1;
        points.matchesDrawn++;
    } else if (result === 'loss') {
        points.matchesLost++;
    }

    await points.save();
}