
const express = require("express");

const app = express();
const server = app.listen('5000', (req, res) => {
    console.log("server is running on port 5000");
})

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
    },
    pingTimeout: 60 * 1000,
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on('matchStart', (teams) => {
        console.log('match Started');
        io.emit('matchStart', teams)
    })

    socket.on('teams', (teamData) => {
        console.log(teamData);
        io.emit('teams', teamData)
    })

    socket.on('footballScore', (footballData) => {
        console.log('football score', footballData);
        io.emit('footballScore', footballData)
    })
    socket.on('cricketScore', (cricketData) => {
        console.log(cricketData);
        io.emit('cricketScore', cricketData)
    })

    socket.on('matchFinish', (winningTeam) => {
        console.log('match Finished with team win of', winningTeam);
        io.emit('matchFinish', winningTeam)
    })
})