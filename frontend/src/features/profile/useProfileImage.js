import { useQuery } from '@tanstack/react-query';
import { getProfileImage } from '../../services/apiUser';
import { useSelector } from 'react-redux';

export function useProfileImage() {
  const jwt = useSelector((state) => state.auth.jwt);
  const {
    data: imageUrl,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['profileImage', jwt],
    queryFn: () => getProfileImage(jwt),
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    // refetchOnWindowFocus: true, // Refetch data when window is focused
    // refetchInterval: 30000, // Refetch data every 30 seconds
    refetchOnMount: false, // Do not refetch on mount if data is fresh
  });
  return {
    imageUrl,
    isLoading,
    isError,
  };
}
