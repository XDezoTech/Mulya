package xdezo.bidding.onlineBidding.Model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import xdezo.bidding.onlineBidding.Enums.UserRoles;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {
    private String token;
    private String firstName;
    private String lastName;
    private String email;
    private String imageUrl;
    private UserRoles role;
}
