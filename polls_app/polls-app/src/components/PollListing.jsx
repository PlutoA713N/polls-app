import React from 'react';

const PollListing = ({ polls, handleVote }) => {
  return (
    <div>
      <h2>Active Polls</h2>
      {polls.length === 0 ? (
        <p>No active polls available.</p>
      ) : (
        <ul>
          {polls.map((poll) => (
            <li key={poll._id}>
              <h3>{poll.question}</h3>
              <ul>
                {poll.options.map((option) => (
                  <li key={option.optionText}>
                    {option.optionText} - {option.votes} votes
                    <button onClick={() => handleVote(poll._id, option.optionText)}>Vote</button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PollListing;