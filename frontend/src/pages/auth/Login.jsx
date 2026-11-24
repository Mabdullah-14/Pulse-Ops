import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import InputField from '../../components/common/InputField'
import PasswordInput from '../../components/common/PasswordInput'
import Button from '../../components/common/Button'
import { useLogin } from '../../hooks/mutations/auth/useLogin'
import { useAuth } from '../../../context/AuthContext'
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { mutate, isPending, error: loginError, reset } = useLogin();
  const { checkLoginStatus } = useAuth()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) {
      setError('')
    }
    if (loginError) {
      reset()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError("Enter your email and password to continue.");
      return;
    }
    setError('')

    mutate(
      { email: form.email, password: form.password },
      {
        onSuccess: (data) => {
          checkLoginStatus(data)
          navigate('/home')
        }
      }
    )
  }

  const errorMessage = error || loginError?.message;

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-white overflow-hidden">

      {/* Split Layout: Left Side Form, Right Side Image */}
      <div className="flex w-full h-full flex-col-reverse md:flex-row">

        {/* Left Side: Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 lg:px-32">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-1">Please enter your details to login to PulseOps.</p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500 border border-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField
              label="Email"
              name="email"
              type='email'
              autoComplete='email'
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

            <Button type="submit" loading={isPending} className="mt-2">
              Login
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Dont  have an account? {' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>

        <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-slate-100">
          <img
            src="/images/auth-bg.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  )
}

export default Login