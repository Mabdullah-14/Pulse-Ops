import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import PasswordInput from '../../components/common/PasswordInput';
import Button from '../../components/common/Button';
import { useRegisterUser } from '../../hooks/mutations/auth/useRegister';
import { useAuth } from '../../../context/AuthContext';

const RegisterUser = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { mutate, isPending, error: registerError, reset } = useRegisterUser();
  const { checkLoginStatus } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
    if (registerError) reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError('Enter your name, email, and password to continue.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setError('');

    mutate(
      { name: form.name.trim(), email: form.email.trim(), password: form.password },
      {
        onSuccess: (data) => {
          checkLoginStatus(data);
          navigate('/home');
        },
      }
    );
  };

  const errorMessage = error || registerError?.message;

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-white overflow-hidden">
      {/* Split Layout: Left Side Form, Right Side Image */}
      <div className="flex w-full h-full flex-col-reverse md:flex-row">

        {/* Left Side: Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 lg:px-32">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your details below to get started with PulseOps.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500 border border-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField
              label="Full Name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Muhammad Abdullah"
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            <PasswordInput
              label="Password"
              name="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />

            <Button type="submit" loading={isPending} className="mt-2">
              Create Account
            </Button>
          </form>

          {/* Link to Login Page */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Side: Illustration */}
        <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-slate-100">
          <img
            src="/images/auth-bg.jpg"
            alt="Register Illustration"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default RegisterUser;
