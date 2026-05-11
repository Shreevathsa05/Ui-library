import React, { useState } from 'react';
import { SignInForm } from './SignInForm';
import { RegisterForm } from './RegisterForm';

/**
 * AuthForm — Animated Sign In / Register toggle form.
 *
 * Props:
 * - defaultMode: 'signin' | 'register'
 * - brandName: string
 * - brandLogo: ReactNode
 * - onSignIn: ({ email, password }) => void
 * - onRegister: ({ name, email, password }) => void
 * - onForgotPassword: (email) => void
 * - className: string
 *
 * Example:
 * <AuthForm
 *   brandName="Acme"
 *   brandLogo={<div style={{ width: 32, height: 32, background: '#000', borderRadius: 8 }} />}
 *   onSignIn={({ email, password }) => console.log(email, password)}
 *   onRegister={({ name, email, password }) => console.log(name, email, password)}
 * />
 */
export const AuthForm = ({
  defaultMode = 'signin',
  brandName,
  brandLogo,
  onSignIn,
  onRegister,
  onForgotPassword,
  className = '',
}) => {
  const [mode, setMode] = useState(defaultMode);
  const [animating, setAnimating] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const switchMode = (next) => {
    if (next === mode || animating) return;
    setAnimating(true);
    setErrors({});
    setTimeout(() => {
      setMode(next);
      setName(''); setEmail(''); setPassword(''); setConfirm('');
      setSubmitted(false);
      setAnimating(false);
    }, 220);
  };

  const validate = () => {
    const e = {};
    if (mode === 'register' && !name.trim()) e.name = 'Name is required.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email.';
    if (!password || password.length < 6) e.password = 'Password must be at least 6 characters.';
    if (mode === 'register' && password !== confirm) e.confirm = 'Passwords do not match.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
    if (mode === 'signin') onSignIn?.({ email, password });
    else onRegister?.({ name, email, password });
  };

  return (
    <div className={className} style={{ width: '400px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '28px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        {(brandLogo || brandName) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            {brandLogo}
            {brandName && <span style={{ fontSize: '16px', fontWeight: 700, color: '#111', letterSpacing: '-0.3px' }}>{brandName}</span>}
          </div>
        )}
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#111', margin: 0, letterSpacing: '-0.4px' }}>
          {mode === 'signin' ? 'Welcome back' : 'Create an account'}
        </h1>
        <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
          {mode === 'signin' ? 'Sign in to your account to continue.' : 'Fill in the details below to get started.'}
        </p>
      </div>

      {/* Mode Toggle */}
      <div style={{ display: 'flex', margin: '20px 28px 0', backgroundColor: '#f3f4f6', borderRadius: '10px', padding: '3px', gap: '3px' }}>
        {['signin', 'register'].map((m) => (
          <button key={m} onClick={() => switchMode(m)} style={{
            flex: 1, padding: '8px 0', fontSize: '13px', fontWeight: 600,
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
            backgroundColor: mode === m ? '#fff' : 'transparent',
            color: mode === m ? '#111' : '#9ca3af',
            boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
          }}>
            {m === 'signin' ? 'Sign In' : 'Register'}
          </button>
        ))}
      </div>

      {/* Animated form wrapper */}
      <div style={{ padding: '24px 28px 28px', opacity: animating ? 0 : 1, transform: animating ? 'translateY(6px)' : 'translateY(0)', transition: 'opacity 0.22s ease, transform 0.22s ease' }}>
        {mode === 'signin' ? (
          <SignInForm
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            errors={errors} submitted={submitted}
            onSubmit={handleSubmit}
            onForgotPassword={onForgotPassword}
            onSwitchMode={() => switchMode('register')}
          />
        ) : (
          <RegisterForm
            name={name} setName={setName}
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            confirm={confirm} setConfirm={setConfirm}
            errors={errors} submitted={submitted}
            onSubmit={handleSubmit}
            onSwitchMode={() => switchMode('signin')}
          />
        )}
      </div>
    </div>
  );
};
