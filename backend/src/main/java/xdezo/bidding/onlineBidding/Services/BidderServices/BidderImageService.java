package xdezo.bidding.onlineBidding.Services.BidderServices;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import xdezo.bidding.onlineBidding.Repo.UserRepo;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@Slf4j
public class BidderImageService {

    @Value("${ProfileImagePath}")
    private String path;
    @Autowired
    private UserRepo userRepo;
    private static final List<String> ALLOWED_CONTENT_TYPES = List.of("image/jpeg", "image/png", "image/jpg");
    public String bidderImage( MultipartFile file) throws IOException {


        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Invalid image type. Only JPG and PNG are allowed.");
        }
        //get file name
        String fileName = System.currentTimeMillis()+file.getOriginalFilename();

        //full path
        String fullPath = path+File.separator+fileName;


        //create folder if not exist;
        File f = new File(path);
        if(!f.exists()){
            f.mkdirs();
        }

        //copy file to new path;

        Files.copy(file.getInputStream(), Paths.get(fullPath));
        return fileName;
    }
}