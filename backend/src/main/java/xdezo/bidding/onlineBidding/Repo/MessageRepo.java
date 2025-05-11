package xdezo.bidding.onlineBidding.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xdezo.bidding.onlineBidding.Model.Message;


@Repository
public interface MessageRepo extends JpaRepository<Message,Long> {
}
