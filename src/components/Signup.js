import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import './Auth.css'; // Assuming both Login and Signup will use the same styles

function Signup({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      console.log("User signed up");
    } catch (error) {
      console.error("Signup error: ", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
