import { useMutation } from '@tanstack/react-query';
import { signupApi } from '../../services/authapi';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from './AuthSlice';

export function useSignup() {
  const dispatch = useDispatch();

  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      console.log('Signup response:', data); // Log full response for debugging

      if (!data || !data.token) {
        throw new Error('Invalid response from server');
      }

      // Dispatch full user data to Redux
      dispatch(
        loginSuccess({
          token: data.token,
          userId: data.email, // Use email as userId
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          imageUrl: data.imageUrl,
          role: data.role,
        }),
      );

      toast.success('Signup successful!');
    },
    onError: (error) => {
      console.error('Signup error:', error);
      dispatch(loginFailure({ error: error.message }));
      toast.error(error.message || 'Signup failed');
    },
  });

  return { signup, isSigningUp };
}
