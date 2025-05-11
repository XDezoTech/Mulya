import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createAuctionApi } from '../../services/apiAuction';
export function useCreateAuction() {
  const queryClient = useQueryClient();
  const jwt = useSelector((state) => state.auth.jwt);

  const { mutate: createAuction, isLoading: isCreating } = useMutation({
    mutationFn: async (auctionData) => {
      const formData = new FormData();

      const auctionPayload = {
        title: auctionData.item_title,
        description: auctionData.item_description,
        category_title: auctionData.category,
        starting_price: auctionData.starting_price,
        reserve_price: auctionData.reserve_price,
        buy_now_price: auctionData.buy_now_price,
        bid_increment: auctionData.bid_increment_limit,
        start_time: auctionData.start_time,
        end_time: auctionData.end_time,
      };

      formData.append(
        'auction',
        new Blob([JSON.stringify(auctionPayload)], {
          type: 'application/json',
        }),
      );

      if (Array.isArray(auctionData.photos) && auctionData.photos.length > 0) {
        auctionData.photos.forEach((photo) => {
          formData.append('images', photo);
        });
      }

      return await createAuctionApi(formData, jwt);
    },

    onSuccess: () => {
      toast.success('Auction created successfully!');
      // Invalidate queries to refresh data (e.g., auctions list)
      queryClient.invalidateQueries(['auctions']);
    },
    onError: (error) => {
      const message = error.message || 'Failed to create auction';
      toast.error(message);
    },
  });

  return { createAuction, isCreating };
}
