package xdezo.bidding.onlineBidding.Controllers;


import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import xdezo.bidding.onlineBidding.Model.Bids;
import xdezo.bidding.onlineBidding.Services.BidderServices.BidService;
import xdezo.bidding.onlineBidding.Services.BidderServices.BidderImageService;
import xdezo.bidding.onlineBidding.Utils.UserDetailHolder;

@RestController
@RequestMapping("/api/bidder")
@Slf4j
public class BidderController {

    @Autowired
    private  BidService bidService;
    @Autowired
    private BidderImageService bidderImageService;


    @PostMapping("/addBid")
    public ResponseEntity<String> addBid(@Valid @RequestBody Bids bid){
try{
    return ResponseEntity.ok(bidService.addBid(bid));

}
catch(Exception e){
    System.out.println(e);

    return null;
}
    }

    @GetMapping("/allHistory")
    public ResponseEntity<String> myBidHistory(@RequestBody String auctionTitle){

        try{
            String bidsHistory = bidService.showBidHistory(UserDetailHolder.getUsername(), auctionTitle).toString();
            System.out.println(bidsHistory);
            return ResponseEntity.ok(bidsHistory);
        }
        catch (Exception e){
           return ResponseEntity.ok("error, catch block activated");
        }
    }


}
