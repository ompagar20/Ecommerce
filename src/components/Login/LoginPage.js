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


import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import './LoginStyle.css';

const LoginPage = ({ onLogin }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const defaultUsername = 'om@in';
  const defaultPassword = 'om';

  // Handle Enter key navigation
  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else {
        document.getElementById('login-btn').click(); // Triggers form submission
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username === defaultUsername && password === defaultPassword) {
      localStorage.setItem('token', 'default-token');
      onLogin();
      toast.success('Login successful!');
      navigate('/products');
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Welcome Back!</h2>

        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            ref={usernameRef}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              ref={passwordRef}
              onKeyDown={(e) => handleKeyDown(e, null)}
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
        </div>

        <button id="login-btn" className="submit-btn" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;



