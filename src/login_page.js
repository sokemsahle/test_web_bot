import React, { useState } from 'react';
import Settings from './components/Settings';
import './index.css';

const LoginPage = ({ handleLogin, News, Notice }) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isForgotPassword) {
      handleLogin();
    } else {
      // Handle forgot password send email
      alert('Password reset email sent!');
      setIsForgotPassword(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side: Login Form */}
      <div className="login-left">
        <div className="login-box">
          <div className="logo-section">
            <img src="/Logo/logo-light-transparent.png" alt="SOKAPP" className="main-logo" />
          </div>

          <form className="login-form" onSubmit={onSubmit}>
            {!isForgotPassword ? (
              <>
                <div className="input-group">
                  <label htmlFor="username">Email</label>
                  <input type="email" id="username" placeholder="yourname@email.com" required />
                </div>

                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-wrapper">
                    <input type="password" id="password" placeholder="your password" required />
                    <span className="toggle-password"></span>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="login-btn">Log In To Sokapp</button>
                  <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); setIsForgotPassword(true); }}>Forgot Password</a>
                </div>
              </>
            ) : (
              <>
                <div className="input-group">
                  <label htmlFor="reset-email">Email</label>
                  <input type="email" id="reset-email" placeholder="yourname@email.com" required />
                </div>

                <div className="form-actions">
                  <button type="submit" className="login-btn">Send Email</button>
                  <button type="button" className="back-btn" onClick={() => setIsForgotPassword(false)}>Back to Login</button>
                </div>
              </>
            )}
          </form>
        </div>


      </div>

      {/* Right Side: Updates Panel */}
      <div className="login-right">
        <div className="updates-content">
          <h1>Shamida Updates...</h1>
          
          <section className="update-item">
            <h3>Monthly News</h3>
            <p>{News}</p>
          </section>

          <section className="update-item">
            <h3>Important Notice</h3>
            <p>{Notice}</p>
          </section>

          {/*<section className="update-item">
            <h3>Inventory and Program Enrollment Data</h3>
            <p>Gain insight into the availability and use of organizational resources with Inventory data.</p>
          </section>*/}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;