// import React, { useState } from 'react';

// function App() {
//   const [response, setResponse] = useState('');
//   const [getResponse, setGetResponse] = useState('');


//   const handleButtonClick = async () => {
//     const apiUrl = 'https://cookie-check-production.up.railway.app/set-cookie'; // Replace with your backend API URL

//     try {
//       const res = await fetch(apiUrl, {
//         method: 'GET',
//         credentials: 'include', // Include cookies in the request
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       setResponse(`Response: ${JSON.stringify(data)}`);
//     } catch (error) {
//       setResponse(`Error: ${error.message}`);
//     }
//   };

//   const handleGetButtonClick = async () => {
//     const apiUrl = 'https://cookie-check-production.up.railway.app/get-cookie'; // Replace with your backend API URL

//     try {
//       const res = await fetch(apiUrl, {
//         method: 'GET',
//         credentials: 'include', // Include cookies in the request
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       setGetResponse(`Response: ${JSON.stringify(data)}`);
//     } catch (error) {
//       setGetResponse(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <h1>API Request Example</h1>
//       <button onClick={handleButtonClick}>Send Request</button>
//       <p>Send Request: {response}</p>
//       <button onClick={handleGetButtonClick}>Send Request</button>
//       <p>Send Request: {getResponse}</p>
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, gql, ApolloProvider, useMutation, useQuery } from '@apollo/client';

// Create Apollo Client instance
const client = new ApolloClient({
  uri: 'https://cookie-check-production.up.railway.app/graphql', // Your GraphQL endpoint
  cache: new InMemoryCache(),
});

const SET_COOKIE_MUTATION = gql`
  mutation SetCookie {
    setCookie
  }
`;

const GET_COOKIE_QUERY = gql`
  query GetCookie {
    getCookie
  }
`;

function App() {
  const [response, setResponse] = useState('');
  const [getResponse, setGetResponse] = useState('');

  const [setCookie] = useMutation(SET_COOKIE_MUTATION, {
    onCompleted: (data) => {
      setResponse(`Response: ${JSON.stringify(data)}`);
    },
    onError: (error) => {
      setResponse(`Error: ${error.message}`);
    }
  });

  const { data, error, refetch } = useQuery(GET_COOKIE_QUERY, {
    onCompleted: (data) => {
      setGetResponse(`Response: ${JSON.stringify(data)}`);
    },
    onError: (error) => {
      setGetResponse(`Error: ${error.message}`);
    },
    skip: true, // Prevent auto-fetch when the component mounts
  });

  const handleSetCookie = () => {
    setCookie();
  };

  const handleGetCookie = async () => {
    try {
      await refetch(); // Manually trigger the network call to get the cookie
      if (data) {
        setGetResponse(`Response: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      setGetResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>GraphQL Request Example</h1>
      <button onClick={handleSetCookie}>Set Cookie</button>
      <p>{response}</p>
      <button onClick={handleGetCookie}>Get Cookie</button>
      <p>{getResponse}</p>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

