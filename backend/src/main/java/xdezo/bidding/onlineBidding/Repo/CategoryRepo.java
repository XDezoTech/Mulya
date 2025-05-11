package xdezo.bidding.onlineBidding.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import xdezo.bidding.onlineBidding.Model.Categories.AuctionCategory;

public interface CategoryRepo extends JpaRepository<AuctionCategory,Long> {


    AuctionCategory findByCategoryTitle(String categoryTitle);


}
