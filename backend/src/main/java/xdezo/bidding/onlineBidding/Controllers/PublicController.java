package xdezo.bidding.onlineBidding.Controllers;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import xdezo.bidding.onlineBidding.Model.Auctions;
import xdezo.bidding.onlineBidding.Model.DTO.AllAuctionsDTO;
import xdezo.bidding.onlineBidding.Model.DTO.LoginResponseDTO;
import xdezo.bidding.onlineBidding.Model.DTO.UserRegistrationDTO;
import xdezo.bidding.onlineBidding.Model.User;
import xdezo.bidding.onlineBidding.Services.AuctionsService;
import xdezo.bidding.onlineBidding.Services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;


@RestController
@RequestMapping("/api/public")
@Slf4j
public class PublicController {

    private static final Logger logger = LoggerFactory.getLogger(PublicController.class);
    private final UserService userService;
    private final AuctionsService auctionsService;

    @Autowired
    public PublicController(UserService userService, AuctionsService auctionsService) {
        this.userService = userService;
        this.auctionsService = auctionsService;
    }

    @GetMapping("/home")
    public ResponseEntity<String> getHome() {
        logger.info("GET request received at /api/home");
        return ResponseEntity.ok("Home by Sudeep Subedi");
    }

    @PostMapping(
            value = "/register",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<LoginResponseDTO> register(@RequestPart("user") UserRegistrationDTO userDto,
                                                     @RequestPart(value = "image", required = false) MultipartFile profileImage) {
        try {
            logger.info("POST request received at /api/register with user: {}", userDto);
            LoginResponseDTO response = userService.registerUser(userDto, profileImage);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            logger.error("Validation error during registration: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            logger.error("Error during registration: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(
            value    = "/login",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<LoginResponseDTO> login(@RequestBody User user) {
        try {
            LoginResponseDTO resp = userService.loginUser(user);
            return ResponseEntity.ok(resp);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/allAuctions")
    public ResponseEntity<List<AllAuctionsDTO>> getAllItems(){

    List<AllAuctionsDTO> allItems =  auctionsService.getAllItems();
        System.out.println(allItems);
        return ResponseEntity.ok(allItems);
    }


    @GetMapping("/categoryWiseAuctions/{categoryName}")
    public ResponseEntity<List<AllAuctionsDTO>> getByCategories(@PathVariable String categoryName)
    {

        try{

            List<AllAuctionsDTO> categoryItems =  auctionsService.getByCategories(categoryName);
            System.out.println(categoryItems);
            return ResponseEntity.ok(categoryItems);

        }
        catch(Exception e){

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/getAuctionById/{auctionId}")
    public ResponseEntity<AllAuctionsDTO> getAuctionById(@PathVariable Long auctionId) {
        try {
            AllAuctionsDTO dto = auctionsService.getAuctionById(auctionId);
            return ResponseEntity.ok(dto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/SearchItem/{search}")
    public ResponseEntity<List<AllAuctionsDTO>> getBySearchItem(@PathVariable String search)
    {
        try
        {
            List<AllAuctionsDTO> searchItems =  auctionsService.getBySearchData(search);
            System.out.println(searchItems);
            return ResponseEntity.ok(searchItems);

        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }

    }



}
