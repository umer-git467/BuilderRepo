const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();
const cors = require('cors');
const Routes = require('./routes/Routes');
const ChatMessage = require('./Model/chatMessage');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const port = process.env.PORT || 5006;

app.use('/', Routes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (room) => {
    socket.join(room);
  });

  socket.on('sendMessage', async (data) => {
    try {
      // Determine sender and receiver models based on user roles
      const newMessage = new ChatMessage({
        sender: data.sender,
        senderModel: data.senderModel, // 'Client' or 'Builder'
        receiver: data.receiver,
        receiverModel: data.senderModel === 'Client' ? 'Builder' : 'Client', // Opposite of sender
        message: data.message
      });

      await newMessage.save();
      
      const populatedMessage = await ChatMessage.findById(newMessage._id)
        .populate('sender', 'firstName lastName businessname')
        .populate('receiver', 'firstName lastName businessname');

      // Emit to both sender and receiver rooms
      io.to(`${data.sender}-${data.receiver}`).emit('message', populatedMessage);
      io.to(`${data.receiver}-${data.sender}`).emit('message', populatedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
