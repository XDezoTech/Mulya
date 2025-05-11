package xdezo.bidding.onlineBidding.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xdezo.bidding.onlineBidding.Model.Review;


@Repository
public interface ReviewRepo extends JpaRepository<Review,Long> {
}
