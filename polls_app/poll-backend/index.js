require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const CORS_ALLOWED_ORIGINS = 'http://localhost:3000';


const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT;

const  voteRoutes = require('./routes/voteRoutes');
const pollRoutes = require('./routes/pollRoutes');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));


// MiddleWare
app.use(cors({ origin: CORS_ALLOWED_ORIGINS }));
app.use(express.json());

app.get('/', (req,res) => {
  res.json('Hello User');
});

app.use('/api/polls', pollRoutes);
app.use('/api/votes', voteRoutes);

// WebSocket connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('vote', async (voteData) => {
    const { pollId, selectedOption } = voteData;
    try {
      const updatedPoll = await handleVote(pollId, selectedOption);
      io.emit('vote', updatedPoll);
    } catch (error) {
      console.error('Error handling vote:', error);
    }
  });


  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


// Start the server
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});