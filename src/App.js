import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState('');

  const handleButtonClick = async () => {
    const apiUrl = 'http://localhost:8000/get-cookie'; // Replace with your backend API URL

    try {
      const res = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(`Response: ${JSON.stringify(data)}`);
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>API Request Example</h1>
      <button onClick={handleButtonClick}>Send Request</button>
      <p>{response}</p>
    </div>
  );
}

export default App;
