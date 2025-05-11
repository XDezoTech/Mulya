package xdezo.bidding.onlineBidding.Model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private MultipartFile image;
}