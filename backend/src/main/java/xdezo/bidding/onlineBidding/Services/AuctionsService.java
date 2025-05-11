package xdezo.bidding.onlineBidding.Services;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import xdezo.bidding.onlineBidding.Enums.AuctionStatus;
import xdezo.bidding.onlineBidding.Model.Categories.AuctionCategory;
import xdezo.bidding.onlineBidding.Model.Auctions;
import xdezo.bidding.onlineBidding.Model.AuctionImages;
import xdezo.bidding.onlineBidding.Model.DTO.AllAuctionsDTO;
import xdezo.bidding.onlineBidding.Model.User;
import xdezo.bidding.onlineBidding.Repo.AuctionImageRepo;
import xdezo.bidding.onlineBidding.Repo.AuctionsRepo;
import xdezo.bidding.onlineBidding.Repo.CategoryRepo;
import xdezo.bidding.onlineBidding.Repo.UserRepo;
import xdezo.bidding.onlineBidding.Utils.UserDetailHolder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
public class AuctionsService {

    private final AuctionsRepo auctionsRepo;
    private final CategoryRepo categoryRepo;
    private final UserRepo userRepo;
    private final AuctionImageRepo auctionImageRepo;

    public AuctionsService(AuctionsRepo auctionsRepo,AuctionImageRepo auctionImageRepo, CategoryRepo categoryRepo, UserRepo userRepo) {
        this.auctionsRepo = auctionsRepo;
        this.categoryRepo = categoryRepo;
        this.userRepo = userRepo;
        this.auctionImageRepo = auctionImageRepo;
    }

    @Value("${ProductImagePath}")
    private String uploadDir;

    @Value(("${serverPath}"))
    private String serverPath;

    @Value("${ProfileImagePath}")
    private String profileImagePath;


    private String SellerImage(String imageName)
    {
        return serverPath+profileImagePath+imageName;
    }
    private static final List<String> ALLOWED_CONTENT_TYPES = List.of("image/jpeg", "image/png", "image/jpg");
    // Read-only transaction for fetching data

    // Transactional method for adding an auction
    @Transactional(rollbackFor = Exception.class)
    public Auctions addAuction(Auctions auction, MultipartFile[] images) throws IOException {
        // Handle category association

        String categoryTitle = auction.getCategory_title().toUpperCase();
        AuctionCategory category = categoryRepo.findByCategoryTitle(categoryTitle);

        System.out.println(category);
        auction.setTitle(auction.getTitle().toUpperCase());

        User seller = userRepo.findByEmail(UserDetailHolder.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found!"));
        auction.setSeller_id(seller);

        if (category == null) {
            throw new IllegalArgumentException("Category not found!");
        }

        auction.setCategory(category);
        Auctions auctionss = auctionsRepo.save(auction);
        // Handle images association

        try{
            for (MultipartFile file : images) {
                String fileName = System.currentTimeMillis()+ "_" + file.getOriginalFilename();
                String contentType = file.getContentType();
                if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
                    throw new IllegalArgumentException("Invalid image type. Only JPG and PNG are allowed.");
                }

                //full path
                String fullPath = uploadDir+ File.separator+fileName;


                //create folder if not exist;
                File f = new File(uploadDir);
                if(!f.exists()){
                    f.mkdirs();
                }

                //copy file to new path;

                Files.copy(file.getInputStream(), Paths.get(fullPath));

                AuctionImages imageDetail = new AuctionImages();
                imageDetail.setImageUrl(fileName);
                imageDetail.setAuction(auction);
                auctionImageRepo.save(imageDetail);
            }
            return auctionss;
        }
        catch (Exception e){
            log.error("error while saving multiple images");
            return null;
        }



    }



    private AllAuctionsDTO mapAuctionToDTO(Auctions auction) {
        Long id = auction.getId();
        AllAuctionsDTO dto = new AllAuctionsDTO();

        dto.setAuctionTitle(auction.getTitle());
        dto.setAuctionId(id);
        dto.setDescription(auction.getDescription());
        dto.setCurrentPrice(auction.getCurrent_price());
        dto.setReservePrice(auction.getReserve_price());
        dto.setCategory(auction.getCategory().getCategoryTitle());
        dto.setStartTime(auction.getStart_time());
        dto.setEndTime(auction.getEnd_time());
        dto.setSellersName(auction.getSeller_id().getFirstName() + " " + auction.getSeller_id().getLastName());
        dto.setBidIncrement(auction.getBid_increment());
        dto.setSellerImageUrl(this.SellerImage(auction.getSeller_id().getImageUrl()));

        List<String> imageNames = auctionImageRepo.findImageUrlByAuction_Id(id);
        List<String> imagesUrl = new ArrayList<>();
        for (String imageName : imageNames) {
            imagesUrl.add(serverPath + uploadDir + imageName);
        }
        dto.setAuctionImages(imagesUrl);

        return dto;
    }

    @Transactional(readOnly = true)
    public List<AllAuctionsDTO> getAllItems() {
        List<Auctions> auctions = auctionsRepo.findAllByStatus(AuctionStatus.ACTIVE);
        return auctions.stream().map(this::mapAuctionToDTO).toList();
    }

    public List<AllAuctionsDTO> getByCategories(String categoryName) {
        List<Auctions> auctions = auctionsRepo.findByCategory_CategoryTitle(categoryName.toUpperCase());
        return auctions.stream().map(this::mapAuctionToDTO).toList();
    }
    public AllAuctionsDTO getAuctionById(Long auctionId) {
        Auctions a = auctionsRepo.findById(auctionId)
                .orElseThrow(() -> new EntityNotFoundException("Auction not found with id " + auctionId));
        return mapAuctionToDTO(a);
    }

    public List<AllAuctionsDTO> getBySearchData(String search){
        List<Auctions> auctions = auctionsRepo.findByTitleOrDescriptionContainingIgnoreCase(search);
        return auctions.stream().map(this::mapAuctionToDTO).toList();
    }
//    private AllAuctionsDTO mapToDto(Auctions a) {
//        AllAuctionsDTO dto = new AllAuctionsDTO();
//        dto.setAuctionTitle(a.getTitle());
//        dto.setAuctionId(a.getId());
//        dto.setDescription(a.getDescription());
//        dto.setCurrentPrice(a.getCurrent_price());
//        dto.setReservePrice(a.getReserve_price());
//        dto.setCategory(a.getCategory().getCategoryTitle());
//        dto.setSellersName(a.getSeller_id().getFullName());
//        dto.setSellerImageUrl(a.getSeller_id().getImageUrl());
//        dto.setStartTime(a.getStart_time());
//        dto.setEndTime(a.getEnd_time());
//        dto.setBidIncrement(a.getBid_increment());
//        dto.setAuctionImages(
//                a.getImage().stream()
//                        .map(img -> img.getImageUrl())
//                        .collect(Collectors.toList())
//        );
//        return dto;
//    }


}
