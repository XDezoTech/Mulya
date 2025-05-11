package xdezo.bidding.onlineBidding.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xdezo.bidding.onlineBidding.Model.Notifications;


@Repository
public interface NotificationRepo extends JpaRepository<Notifications,Long> {
}
