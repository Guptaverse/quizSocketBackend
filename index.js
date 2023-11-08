const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const server = require("http").createServer(app); 
const io = require("socket.io")(server); 

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/quiz", require("./routes/quizRoutes"));

app.get("/", (req, res) => {
  res.send("hello");
});

// Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected!");

  // // For the teacher to send a message to students in a room
  // socket.on("teacherMessage", (data) => {
  //   const { roomId, message } = data;
  //   io.to(roomId).emit("message", message);
  // });

  // Student joins the room
  socket.on("joinRoom", (data) => {
    const { roomId, studentName } = data;
    socket.join(roomId);
    io.to(roomId).emit("newStudent", studentName);
  });
  socket.on('message', (data) => {
    const { roomId } = data;
    // Emit the message to everyone in the specified room
    io.to(roomId).emit('newMessage', data.text);
  });
  socket.on('leaveRoom', (roomId) => {
    // Logic to break the connection
    socket.leave(roomId);
    console.log(`User Eliminated: ${roomId}`);
  });
});


mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => {
    server.listen(4000, () => {
      console.log(`listening on port ${4000}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
