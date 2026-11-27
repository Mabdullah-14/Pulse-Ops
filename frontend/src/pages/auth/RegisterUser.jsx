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
      {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      },
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
    <div className="flex min-h-[100dvh] w-full bg-white md:h-screen md:overflow-hidden">
      {/* Split Layout: Left Side Form, Right Side Image */}
      <div className="flex min-h-[100dvh] w-full flex-col-reverse md:h-full md:flex-row">
        {/* Left Side: Form Section */}
        <div className="flex w-full flex-1 flex-col justify-center px-5 py-8 sm:px-8 md:w-1/2 md:overflow-y-auto md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Create an Account
              </h2>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Enter your details below to get started with PulseOps.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-500 sm:text-sm">
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

              <Button type="submit" loading={isPending} className="mt-2 w-full">
                Create Account
              </Button>
            </form>

            {/* Link to Login Page */}
            <p className="mt-6 text-center text-xs text-gray-600 sm:text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="relative h-44 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-56 md:h-full md:w-1/2">
          <img
            src="/images/auth-bg.jpg"
            alt="Register Illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;