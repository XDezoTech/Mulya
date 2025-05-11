package xdezo.bidding.onlineBidding.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xdezo.bidding.onlineBidding.Model.Transaction;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction,Long> {

}
