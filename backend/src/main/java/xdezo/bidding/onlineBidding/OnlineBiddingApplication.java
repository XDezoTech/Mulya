package xdezo.bidding.onlineBidding;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.autoconfigure.domain.EntityScan;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//@EnableJpaRepositories("xdezo.bidding.onlineBidding.Repo")
//@EntityScan("xdezo.bidding.onlineBidding.Model")
public class OnlineBiddingApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineBiddingApplication.class, args);
	}

}
