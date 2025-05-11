package xdezo.bidding.onlineBidding.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import xdezo.bidding.onlineBidding.Model.Categories.AuctionCategory;
import xdezo.bidding.onlineBidding.Enums.AuctionStatus;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter

public class Auctions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id", nullable = false)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, length = 500)
    private String description;

    @NotNull
    @Column(nullable = false)
    private Double starting_price;

//    @NotNull
    @Column(nullable = false)
    private Double current_price = 0.0;

    @NotNull
    @Column(nullable = false)
    private Double reserve_price;

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime start_time;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime end_time;

    @NotNull
    @ManyToOne
    @JsonBackReference("sellerId")
    @JoinColumn(name = "sellerId")
    private User seller_id;

    //@NotNull
    @Enumerated(EnumType.STRING)
    private AuctionStatus status= AuctionStatus.ACTIVE;

    @Transient
    private String category_title;

    @CreationTimestamp
    @Column(updatable = false)
    private Date created_at;



    @OneToMany(cascade = CascadeType.ALL, mappedBy = "auction", orphanRemoval = true)
    @JsonManagedReference("auctionImage")
    @ToString.Exclude
    private List<AuctionImages> image;


    @Column(nullable = false)
    private Double buy_now_price;

    @Column(nullable = false)
    private Double bid_increment;


    @OneToOne(cascade = CascadeType.ALL, mappedBy = "auction_id", orphanRemoval = true)
    @JsonManagedReference("paymentId")
    private Payments payment_id;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "auctionId", orphanRemoval = true)
    @JsonManagedReference("auctionId")
    @ToString.Exclude
    private List<Bids> bid;

    @ManyToOne
    @JsonBackReference("category")
    @JoinColumn(name = "category_id", nullable = false)
    private AuctionCategory category;
}
