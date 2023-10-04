import React, { useState } from 'react';
import axios from 'axios';

const PollCreation = ({ setError, fetchPolls }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    const newPoll = {
      question,
      options,
    };
    try {
      await axios.post('/', newPoll);
      console.log('Response:', newPoll.data);

      setError(null);
      setQuestion(newPoll.question);
      setOptions(newPoll.options);
      fetchPolls();
    } catch (error) {
      setError('Error creating the poll. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create a New Poll</h2>
      <form onSubmit={handleCreatePoll}>
        <label>
          Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </label>
        <ul>
          {options.map((option, index) => (
            <li key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
            </li>
          ))}
        </ul>
        <button type="button" onClick={handleAddOption}>
          Add Option
        </button>
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
};

export default PollCreation;