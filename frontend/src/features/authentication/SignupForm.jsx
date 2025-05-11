import { useForm } from 'react-hook-form';
import { useSignup } from './useSignup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaShieldAlt,
  FaBolt,
  FaCamera,
} from 'react-icons/fa';

function SignupForm({ onClose, onSwitchToLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signup, isSigningUp } = useSignup();
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      profilePicture: null,
    },
  });

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setProfileImage(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewUrl(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const onSubmit = (data) => {
    console.log(profileImage);
    signup(
      {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        profilePicture: profileImage, // Pass the selected profile image
      },
      {
        onSuccess: () => {
          navigate('/');
        },
      },
    );
    onClose?.();
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  return (
    <div
      className="slide-in-right relative w-[85vw]"
      style={{
        backfaceVisibility: 'hidden',
        perspective: '1000px',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600"
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

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full flex-col justify-center p-8 lg:p-12"
          >
            <div className="mx-auto w-full max-w-md space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  Create Account
                </h1>
                <p className="mt-2 text-base text-gray-600">
                  Join our community today
                </p>
              </div>

              {/* Profile Picture Upload */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-gray-200">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-50">
                        <FaUser className="h-12 w-12 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="profilePicture"
                    className="bg-brand-600 hover:bg-brand-700 absolute right-0 bottom-0 cursor-pointer rounded-full p-3 text-white"
                  >
                    <FaCamera className="h-5 w-5" />
                  </label>
                  <input
                    type="file"
                    id="profilePicture"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      setProfileImage(file);
                      const reader = new FileReader();
                      reader.onloadend = () => setPreviewUrl(reader.result);
                      reader.readAsDataURL(file);
                    }}
                  />
                </div>
              </div>

              {/* Google Signup Button */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-gray-300 bg-white px-6 py-4 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <FcGoogle className="text-2xl" />
                Sign up with Google
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-base text-gray-500">
                    or
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-medium text-gray-700">
                      First Name
                    </label>
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        {...register('firstName', {
                          required: 'First name is required',
                        })}
                        className="focus:border-brand-500 focus:ring-brand-500 block w-full rounded-lg border-gray-300 py-3 pl-12 text-base"
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700">
                      Last Name
                    </label>
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        {...register('lastName', {
                          required: 'Last name is required',
                        })}
                        className="focus:border-brand-500 focus:ring-brand-500 block w-full rounded-lg border-gray-300 py-3 pl-12 text-base"
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

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
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-base font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        {...register('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: (value) =>
                            value === watch('password') ||
                            'Passwords do not match',
                        })}
                        className="focus:border-brand-500 focus:ring-brand-500 block w-full rounded-lg border-gray-300 py-3 pl-12 text-base"
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSigningUp}
                className="bg-brand-600 hover:bg-brand-700 focus:ring-brand-500 flex w-full cursor-pointer items-center justify-center rounded-lg px-6 py-4 text-base font-semibold text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
              >
                {isSigningUp ? (
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
                    <span>Creating account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Login link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-brand-600 hover:text-brand-500 cursor-pointer font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
        <div className="from-brand-600 to-brand-800 hidden w-1/2 bg-gradient-to-br p-12 lg:block">
          <div className="flex h-full flex-col justify-between text-white">
            <div>
              <h2 className="text-3xl font-bold">Join Us Today!</h2>
              <p className="text-brand-100 mt-4 text-lg">
                Create your account and start your journey with us.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-brand-500/20 rounded-full p-3">
                  <FaShieldAlt className="h-6 w-6 text-white" />
                </div>
                <p className="text-brand-100">
                  Secure and encrypted registration
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-brand-500/20 rounded-full p-3">
                  <FaBolt className="h-6 w-6 text-white" />
                </div>
                <p className="text-brand-100">Quick and easy setup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
