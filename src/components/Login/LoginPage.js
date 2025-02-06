// import React, { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './LoginStyle.css';

// const LoginPage = ({ onLogin }) => {
//   const usernameRef = useRef();
//   const passwordRef = useRef();
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const username = usernameRef.current.value;
//     const password = passwordRef.current.value;

//     try {
//       const response = await fetch('https://fakestoreapi.com/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Invalid username or password');
//       }

//       const data = await response.json();
//       localStorage.setItem('token', data.token); 
//       onLogin();
//       toast.success('Login successful!');
//       navigate('/products');
//     } catch (error) {
//       setErrorMessage(error.message);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="login-page">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2>Welcome Back!</h2>
//         {errorMessage && <p className="error">{errorMessage}</p>}
        
//         <div className="input-group">
//           <label>Username</label>
//           <input
//             type="text"
//             placeholder="Enter your username"
//             ref={usernameRef}
//           />
//         </div>

//         <div className="input-group">
//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             ref={passwordRef}
//           />
//         </div>

//         <button className="submit-btn" type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginStyle.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "om@in" && password === "om") {
      onLogin();
      toast.success('Login successful!');
      navigate('/products');
    } else {
      setErrorMessage('Invalid username or password');
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Welcome Back!</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}

        <div className="input-group">
          <label>Username</label>
          <input 
            type="text" 
            placeholder="Enter your username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button className="submit-btn" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

