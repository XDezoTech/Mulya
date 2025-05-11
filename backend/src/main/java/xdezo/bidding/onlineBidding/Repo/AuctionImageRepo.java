package xdezo.bidding.onlineBidding.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import xdezo.bidding.onlineBidding.Model.AuctionImages;

import java.util.List;

public interface AuctionImageRepo extends JpaRepository<AuctionImages, Long> {

    @Query("SELECT ai.imageUrl FROM AuctionImages ai WHERE ai.auction.id = :auctionId")
    List<String> findImageUrlByAuction_Id(Long auctionId);
}
