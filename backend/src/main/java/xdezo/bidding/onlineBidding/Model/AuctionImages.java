package xdezo.bidding.onlineBidding.Model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuctionImages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JsonBackReference("auctionImage")
    @JoinColumn(name = "auction_id")
    private Auctions auction;


    @NotBlank
    private String imageUrl;
}
