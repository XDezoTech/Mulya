package xdezo.bidding.onlineBidding.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xdezo.bidding.onlineBidding.Model.Address;

import java.util.Optional;

@Repository
public interface AddressRepo extends JpaRepository<Address,Long> {

    @Override
    Optional<Address> findById(Long id);

    boolean existsById(Long id); // Returns true if address exists
}
