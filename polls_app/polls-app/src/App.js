// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import PollCreation from './components/PollCreation';
import PollListing from './components/PollListing';

const socket = io('http://localhost:5000'); 

const App = () => {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all active polls on component mount
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await axios.get('/api/polls');
      setPolls(response.data);
    } catch (error) {
      console.error('Error fetching polls:', error);
    }
  };

  const handleVote = async (pollId, selectedOption) => {
    try {
      await axios.post(`/api/votes/${pollId}`, { selectedOption });
    } catch (error) {
      setError('Error submitting your vote. Please try again.');
    }
  };

  socket.on('vote', (updatedPoll) => {
    // Update the live results when a new vote is received
    setPolls((prevPolls) =>
      prevPolls.map((poll) => (poll._id === updatedPoll._id ? updatedPoll : poll))
    );
  });

  return (
    <div>
      {/* Render components for Poll Creation and Poll Listing */}
      <PollCreation setError={setError} fetchPolls={fetchPolls} />
      <PollListing polls={polls} handleVote={handleVote} />
      {error && <div>{error}</div>}
    </div>
  );
};

export default App;