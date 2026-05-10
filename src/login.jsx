import "./login.css";
import { useState } from "react";

function Login() {

  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="container">

      <div className="overlay"></div>

      <div className="content">

        <div className="left-section">

          <p className="tag">TRAVELOOP</p>

          <h1>
            Plan Your <br />
            Elite Trip
          </h1>

          <p className="description">
            Experience travel like never before
            with curated destinations and smart itinerary planning.
          </p>

        </div>

        <div className="right-section">

          <div className="login-card">

            <h2>
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>

            <p className="subtitle">
              {
                isSignup
                ? "Create your travel account"
                : "Login to continue your journey"
              }
            </p>

            <form>

              {
                isSignup &&
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Full Name"
                  />
                </div>
              }

              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email Address"
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                />
              </div>

              {
                isSignup &&
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
              }

              <button type="submit">
                {
                  isSignup
                  ? "Create Account"
                  : "Login"
                }
              </button>

            </form>

            <p className="bottom-text">

              {
                isSignup
                ? "Already have an account?"
                : "Don’t have an account?"
              }

              <span
                onClick={() => setIsSignup(!isSignup)}
              >

                {
                  isSignup
                  ? " Login"
                  : " Sign Up"
                }

              </span>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;