import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase.config';

const Register = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (pwd) => {
    if (pwd.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(pwd)) {
      return "Password must contain at least one lowercase letter";
    }
    return "";
  };

  const handleGoogleRegister = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Registered with Google:", result.user);
        navigate("/");
      })
      .catch(error => {
        setErrorMsg(error.message);
      });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const pwdError = validatePassword(password);
    if (pwdError) {
      setPasswordError(pwdError);
      return;
    }
    setPasswordError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update user profile with name and photo URL
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || null,
      });
      console.log("User registered:", userCredential.user);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col text-center">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Already have an account? <Link to="/login" className="link link-primary">Login</Link>.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <label className="label">Name</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label className="label">Photo URL</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Photo URL (optional)"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />

              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="label">Password</label>
              <input
                type="password"
                className="input input-bordered"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}

              {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

              <button type="submit" className="btn btn-neutral mt-4 w-full">Register</button>
            </form>

            <div className="divider">OR</div>

            <button className="btn btn-outline btn-primary w-full" onClick={handleGoogleRegister}>
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

export default Register;

