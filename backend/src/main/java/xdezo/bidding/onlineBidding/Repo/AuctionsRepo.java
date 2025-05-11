package xdezo.bidding.onlineBidding.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import xdezo.bidding.onlineBidding.Enums.AuctionStatus;
import xdezo.bidding.onlineBidding.Model.Auctions;

import java.util.List;
import java.util.Optional;

public interface AuctionsRepo extends JpaRepository<Auctions,Long> {


    List<Auctions> findAllByStatus(AuctionStatus status);


  Auctions findByTitle(String title);

    List<Auctions> findByCategory_CategoryTitle(String categoryTitle);

    @Query("SELECT a FROM Auctions a WHERE LOWER(a.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(a.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Auctions> findByTitleOrDescriptionContainingIgnoreCase(@Param("keyword") String keyword);



}
