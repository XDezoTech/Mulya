import { useQuery } from '@tanstack/react-query';
import {
  getAllAuction,
  getAuctionByCategory,
  getAuctionById,
  getSearchAuction,
} from '../../services/apiAuction';

export function useGetAllAuction() {
  const {
    isLoading,
    data: auctions,
    error,
  } = useQuery({
    queryKey: ['allAuction'],
    queryFn: getAllAuction,
  });

  return { isLoading, auctions, error };
}

export function useGetAuctionByCategory(category) {
  const {
    isLoading,
    data: auctions,
    error,
  } = useQuery({
    queryKey: ['auction', category],
    queryFn: () => getAuctionByCategory(category),
  });

  return { isLoading, auctions, error };
}
export function useGetAuctionById(id) {
  const {
    isLoading,
    data: auction,
    error,
  } = useQuery({
    queryKey: ['auction', id],
    queryFn: () => getAuctionById(id),
  });

  return { isLoading, auction, error };
}
export function useSearchAuction(search) {
  const {
    isLoading,
    data: auction,
    error,
  } = useQuery({
    queryKey: ['auction', 'search', search],
    queryFn: () => getSearchAuction(search),
    enabled: Boolean(search && search.trim() !== ''),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { isLoading, auction, error };
}
