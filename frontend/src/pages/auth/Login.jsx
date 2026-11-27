import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import PasswordInput from '../../components/common/PasswordInput';
import Button from '../../components/common/Button';
import { useLogin } from '../../hooks/mutations/auth/useLogin';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { mutate, isPending, error: loginError, reset } = useLogin();
  const { checkLoginStatus } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) {
      setError('');
    }
    if (loginError) {
      reset();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Enter your email and password to continue.');
      return;
    }
    setError('');

    mutate(
      { email: form.email, password: form.password },
      {
        onSuccess: (data) => {
          checkLoginStatus(data);
          navigate('/home');
        },
      }
    );
  };

  const errorMessage = error || loginError?.message;

  return (
    <div className="flex min-h-[100dvh] w-full bg-white md:h-screen md:overflow-hidden">
      {/* Split Layout: Left Side Form, Right Side Image */}
      <div className="flex min-h-[100dvh] w-full flex-col-reverse md:h-full md:flex-row">
        {/* Left Side: Form Section */}
        <div className="flex w-full flex-1 flex-col justify-center px-5 py-8 sm:px-8 md:w-1/2 md:overflow-y-auto md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome Back
              </h2>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Please enter your details to login to PulseOps.
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
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
              />

              <Button type="submit" loading={isPending} className="mt-2 w-full">
                Login
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-gray-600 sm:text-sm">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="relative h-44 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-56 md:h-full md:w-1/2">
          <img
            src="/images/auth-bg.jpg"
            alt="Login Illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;