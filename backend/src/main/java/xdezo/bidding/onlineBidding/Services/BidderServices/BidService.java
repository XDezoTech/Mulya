package xdezo.bidding.onlineBidding.Services.BidderServices;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xdezo.bidding.onlineBidding.Model.Auctions;
import xdezo.bidding.onlineBidding.Model.Bids;
import xdezo.bidding.onlineBidding.Model.User;
import xdezo.bidding.onlineBidding.Repo.AuctionsRepo;
import xdezo.bidding.onlineBidding.Repo.BidsRepo;
import xdezo.bidding.onlineBidding.Repo.UserRepo;
import xdezo.bidding.onlineBidding.Utils.UserDetailHolder;

import java.util.List;


@Slf4j
@Service
public class BidService{

    @Autowired
    private BidsRepo bidsRepo;

    @Autowired
    private AuctionsRepo auctionsRepo;

    @Autowired
    private UserRepo userRepo;

    public String addBid(Bids bid) {
        System.out.println("Received bid: " + bid);
        System.out.println("Auction Title: " + bid.getAuctionTitle());

        try{
            if (bid.getAuctionTitle() == null || bid.getAuctionTitle().isEmpty()) {
                return "Auction title is missing in request";
            }



          Auctions auction =  auctionsRepo.findByTitle(bid.getAuctionTitle().toUpperCase());

            if (auction == null) {
                return "Invalid auction";
            }
            if(auction.getStatus().toString().equals("CLOSED")){

                return "Auction Closed";
            }


            User bidder = userRepo.findByEmail(UserDetailHolder.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));


            bid.setBidder_id(bidder);
            bid.setAuctionId(auction);
            bidsRepo.save(bid);

            return "Bid placed successfully";
        }
        catch (Exception e){
            log.error("e: ", e);
            return "null";
        }


    }

    public List<Bids> showBidHistory(String username, String title){

        return bidsRepo.findAllBids(username, title);
    }


}
