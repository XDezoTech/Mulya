package xdezo.bidding.onlineBidding.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import xdezo.bidding.onlineBidding.Enums.UserRoles;
import xdezo.bidding.onlineBidding.Model.DTO.LoginResponseDTO;
import xdezo.bidding.onlineBidding.Model.DTO.UserRegistrationDTO;
import xdezo.bidding.onlineBidding.Model.User;
import xdezo.bidding.onlineBidding.Repo.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import xdezo.bidding.onlineBidding.Services.BidderServices.BidderImageService;
import xdezo.bidding.onlineBidding.Validation.AddressValidation;
import xdezo.bidding.onlineBidding.Validation.UserValidation;
import xdezo.bidding.onlineBidding.Authentication.Services.JWTService;

import java.util.Optional;

@Service
public class UserService {

    private final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final AuthenticationManager authManager;
    private final UserRepo userRepo;
    private final UserValidation userValidation;
    private final BidderImageService imageService;
    private final AddressValidation addressValidation;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    @Value("${serverPath}")
    private String serverPath;

    @Value("${ProfileImagePath}")
    private String uploadDir;

    @Autowired
    public UserService(AuthenticationManager authManager, UserRepo userRepo,
                       UserValidation userValidation, AddressValidation addressValidation, BidderImageService imageService) {
        this.authManager = authManager;
        this.userRepo = userRepo;
        this.userValidation = userValidation;
        this.addressValidation = addressValidation;
        this.imageService = imageService;
    }

    @Transactional
    public LoginResponseDTO registerUser(UserRegistrationDTO dto, MultipartFile image) {
        // Basic validation
        if (!userValidation.validatePassword(dto.getPassword())) {
            logger.error("Invalid password");
            throw new IllegalArgumentException("Invalid password");
        }

        if (!userValidation.validateEmail(dto.getEmail())) {
            logger.error("Invalid email address");
            throw new IllegalArgumentException("Invalid email address");
        }

        if (dto.getFirstName() == null || dto.getLastName() == null) {
            logger.error("First name or last name is missing");
            throw new IllegalArgumentException("Invalid names");
        }

        try {
            // Save image and get filename
            String fileName = imageService.bidderImage(image);

            // Build User entity from DTO
            User user = User.builder()
                    .email(dto.getEmail())
                    .password(passwordEncoder.encode(dto.getPassword()))
                    .firstName(dto.getFirstName())
                    .lastName(dto.getLastName())
                    .imageUrl(fileName)
                    .role(UserRoles.valueOf("BIDDER"))
                    .build();
            userRepo.save(user);

            // Generate JWT token
            String jwt = JWTService.generateJWT(user);

            // Build and return LoginResponseDTO


            return new LoginResponseDTO(
                    jwt,
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    this.finalImageUrl(fileName),
                    user.getRole()
//                    user.role(UserRoles.valueOf("BIDDER"))
            );

        } catch (Exception e) {
            logger.error("Exception during registration: {}", e.toString());
            throw new RuntimeException("Exception occurred during registration");
        }
    }


    private String finalImageUrl(String imageName){

        return serverPath+uploadDir+imageName;
    }

    public LoginResponseDTO loginUser(User user) {
        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );
            if (!auth.isAuthenticated()) {
                throw new BadCredentialsException("Bad credentials");
            }

            // load full user details from DB
            User dbUser = userRepo.findByEmail(user.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // generate JWT
            String jwt = JWTService.generateJWT(dbUser);

            // build and return DTO

             String ImageName = dbUser.getImageUrl();

            return new LoginResponseDTO(
                    jwt,
                    dbUser.getFirstName(),
                    dbUser.getLastName(),
                    dbUser.getEmail(),
                    this.finalImageUrl(ImageName),
                    dbUser.getRole()
            );
        } catch (Exception e) {
            logger.error("Authentication failed: {}", e.getMessage());
            throw e;  // or wrap in your custom exception
        }
    }
}
