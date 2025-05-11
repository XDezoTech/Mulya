package xdezo.bidding.onlineBidding.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import xdezo.bidding.onlineBidding.Model.Bids;

import java.util.List;

public interface BidsRepo extends JpaRepository<Bids, Long> {


    @Query("SELECT u FROM Bids u WHERE u.bidder_id.email = ?1 AND u.auctionId.title = ?2")
    List<Bids> findAllBids(String email, String title);
}
