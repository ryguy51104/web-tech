import React, { useState } from 'react';
import axios from 'axios';

const AddData = () => {
  // State for each input field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState(''); // For storing error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation: check if any field is empty
    if (!firstName || !lastName || !email || !password || !age) {
      setError('Please fill in all fields');
      return;
    }

    // Create an object with all the data
    const userData = { firstName, lastName, email, password, age };

    try {
      // Send the POST request to the backend
      await axios.post('http://localhost:5000/add', userData);
      alert('Data added successfully');
      setError(''); // Reset error on successful submission
    } catch (err) {
      console.error('Error adding data', err);
      alert('Error adding data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button type="submit">Add Data</button>
    </form>
  );
};

export default AddData;
