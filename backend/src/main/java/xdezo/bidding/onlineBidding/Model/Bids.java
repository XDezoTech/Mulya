package xdezo.bidding.onlineBidding.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bids {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference("auctionId")
    @JoinColumn(name = "auction_id", nullable = false)
    private Auctions auctionId;

    @ManyToOne
    @JsonBackReference("bids")
    @JoinColumn(name = "bidder_id", nullable = false)
    private User bidder_id;


    @Column(nullable = false)
    private double bidAmount;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime bidTime;

    @Transient
    @JsonProperty("auctionTitle")
    private String auctionTitle;

    @NotNull
    private boolean is_auto_bid;

    @Column(length = 20, name = "autoBidLimit")
    private double auto_bid_limit;
}
