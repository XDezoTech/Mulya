import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaEnvelope, FaLock, FaShieldAlt, FaBolt } from 'react-icons/fa';

function Login({ onClose, onSwitchToSignup }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login, isLoggingIn } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = (data) => {
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          navigate('/');
        },
      },
    );
    onClose?.();
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="slide-in-left relative w-[85vw]">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 cursor-pointer text-gray-400 hover:text-gray-600"
        type="button"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="flex h-[800px] w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out">
        {/* Left Section - Decorative */}
        <div className="from-brand-600 to-brand-800 hidden w-1/2 bg-gradient-to-br p-12 lg:block">
          <div className="flex h-full flex-col justify-between text-white">
            <div>
              <h2 className="text-3xl font-bold">Welcome Back!</h2>
              <p className="text-brand-100 mt-4 text-lg">
                Sign in to access your account and continue your journey with
                us.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-brand-500/20 rounded-full p-3">
                  <FaShieldAlt className="h-6 w-6 text-white" />
                </div>
                <p className="text-brand-100">Secure and encrypted login</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-brand-500/20 rounded-full p-3">
                  <FaBolt className="h-6 w-6 text-white" />
                </div>
                <p className="text-brand-100">Fast and easy access</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full flex-col justify-center p-8 lg:p-12"
          >
            <div className="mx-auto w-full max-w-md space-y-6">
              <div className="text-center">
                <h1 className="animate-fade-in-up text-3xl font-bold text-gray-900">
                  Sign in
                </h1>
                <p className="mt-2 text-base text-gray-600">
                  Welcome back! Please enter your details
                </p>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="animate-fade-in-up flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-gray-300 bg-white px-6 py-4 text-base font-medium text-gray-700 transition-colors delay-200 hover:bg-gray-50"
              >
                <FcGoogle className="text-2xl" />
                Continue with Google
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-base text-gray-500">
                    or continue with email
                  </span>
                </div>
              </div>

              <div className="animate-fade-in-up space-y-4 delay-300">
                {/* Email Input */}
                <div>
                  <label className="block text-base font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Invalid email address',
                        },
                      })}
                      className="focus:border-brand-500 focus:ring-brand-500 block w-full rounded-lg border-gray-300 py-3 pl-12 text-base"
                      placeholder="name@company.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-base font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                      className="focus:border-brand-500 focus:ring-brand-500 block w-full rounded-lg border-gray-300 py-3 pl-12 text-base"
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember me and Forgot password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('remember')}
                      className="text-brand-600 focus:ring-brand-500 h-4 w-4 rounded border-gray-300"
                    />
                    <label className="ml-2 text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-brand-600 hover:text-brand-500 cursor-pointer text-sm font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="bg-brand-600 hover:bg-brand-700 focus:ring-brand-500 animate-fade-in-up flex w-full cursor-pointer items-center justify-center rounded-lg px-6 py-4 text-base font-semibold text-white transition-colors delay-400 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>

              {/* Sign up link */}
              <p className="text-center text-sm text-gray-600">
                Dont have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="text-brand-600 hover:text-brand-500 cursor-pointer font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
