import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase.config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in:", result.user);
        navigate("/");
      })
      .catch(error => {
        setErrorMsg(error.message);
      });
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("Logged in with email:", result.user);
        navigate("/");
      })
      .catch((error) => {
        setErrorMsg("Invalid email or password.");
        console.error(error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col text-center">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Don't have an account? <Link to="/register" className="link link-primary">Register</Link> instead.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleEmailLogin}>
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="label">Password</label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="mt-2">
                <a className="link link-hover text-sm">Forgot password?</a>
              </div>

              {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

              <button type="submit" className="btn btn-neutral mt-4 w-full">
                Login
              </button>
            </form>

            <div className="divider">OR</div>

            <button className="btn btn-outline btn-primary w-full" onClick={handleGoogleSignIn}>
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
