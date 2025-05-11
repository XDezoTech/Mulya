package xdezo.bidding.onlineBidding.Controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import xdezo.bidding.onlineBidding.Model.Categories.AuctionCategory;
import xdezo.bidding.onlineBidding.Model.Auctions;
import xdezo.bidding.onlineBidding.Services.AuctionsService;
import xdezo.bidding.onlineBidding.Services.CategoryService;

@RestController
@RequestMapping("/api/seller")
public class SellerController {

    private static final Logger logger = LoggerFactory.getLogger(SellerController.class);
    private final AuctionsService auctionsService;
    private final CategoryService categoryService;

    public SellerController(AuctionsService auctionsService, CategoryService categoryService) {
        this.auctionsService = auctionsService;
        this.categoryService = categoryService;
    }

    @GetMapping("/sellerHome")
    public String getSellerHome() {
        return "Home Seller";
    }

    @PostMapping("/addAuction")
    public ResponseEntity<String> addAuction(@RequestPart Auctions auction, @RequestPart MultipartFile[] images) {
        try {
            logger.info("Received request to add auction: Title={}, Category={}",
                    auction.getTitle(),
                    auction.getCategory_title());

           auctionsService.addAuction(auction,images);
            return ResponseEntity.ok("Products Detail Saved Successfully");
        } catch (IllegalArgumentException e) {
            logger.error("Category not found: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch (Exception e) {
            logger.error("Error adding auction: {}", e.getMessage());
            return ResponseEntity.internalServerError().body("Internal server error");
        }
    }

    @PostMapping("/addCategory")
    public ResponseEntity<AuctionCategory> addCategory(@RequestBody AuctionCategory category){
        return ResponseEntity.ok(categoryService.addCategory(category));
    }
}
