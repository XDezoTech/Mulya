package xdezo.bidding.onlineBidding.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param; // Import this
import org.springframework.stereotype.Repository;
import xdezo.bidding.onlineBidding.Model.User;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Object findById(Long bidderId);

    //    @Query("SELECT u.image_url FROM usersbidders u WHERE u.email = :email")
//    Optional<String> findImageUrlByEmail(@Param("email") String email);
//
//    @Query("SELECT u FROM usersbidders u WHERE u.email = :email")
//    Optional<User> getUserByEmail(@Param("email") String email);
    @Query("SELECT u.imageUrl FROM User u WHERE u.email = :email")
    Optional<String> findImageUrlByEmail(@Param("email") String email);

    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> getUserByEmail(@Param("email") String email);


}