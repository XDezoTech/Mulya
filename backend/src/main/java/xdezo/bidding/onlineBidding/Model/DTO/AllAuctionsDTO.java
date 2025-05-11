package xdezo.bidding.onlineBidding.Model.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllAuctionsDTO {

    private String AuctionTitle;
    private Long AuctionId;
    private String Description;
    private Double CurrentPrice;
    private Double ReservePrice;
    private String Category;
    private String SellersName;
    private String SellerImageUrl;
    private LocalDateTime StartTime;
    private LocalDateTime EndTime;
    private Double BidIncrement;
    private List<String> AuctionImages;
}
