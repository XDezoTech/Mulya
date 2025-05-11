import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../../services/authapi';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from './AuthSlice';

export function useLogin() {
  const dispatch = useDispatch();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log('Login response:', data); // Log full response for debugging

      if (!data || !data.token) {
        console.error('Invalid response from server:', data);
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

      toast.success('Login successful!');
    },
    onError: (error) => {
      console.error('Login error:', error);
      dispatch(loginFailure({ error: error.message }));
      toast.error(error.message || 'Login failed');
    },
  });

  return { login, isLoggingIn };
}
