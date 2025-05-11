package xdezo.bidding.onlineBidding.Validation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import xdezo.bidding.onlineBidding.Enums.UserRoles;
import xdezo.bidding.onlineBidding.Model.User;
import xdezo.bidding.onlineBidding.Repo.UserRepo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Optional;
import java.util.regex.Pattern;

@Component
public class UserValidation {

    private final UserRepo userRepo;
    private final Logger logger = LoggerFactory.getLogger(UserValidation.class);

    @Autowired
    public UserValidation(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public boolean validatePhoneNo(String phoneNo) {
        return phoneNo != null && phoneNo.matches("\\d{10}");
    }

 

    public boolean validatePassword(String password) {
        if (password == null || password.isEmpty()) {
            logger.error("Password is empty");
            return false;
        }
        if (password.length() < 5) {
            logger.error("Password is too short");
            return false;
        }
        logger.info("Password is valid");
        return true;
    }

    public boolean validateEmail(String emailAddress) {
        Optional<User> existingUser = userRepo.findByEmail(emailAddress);
        if (emailAddress == null || emailAddress.isEmpty()) {
            logger.error("Email address is empty");
            return false;
        }

        if (existingUser.isPresent()) {
            logger.error("Email is already used: {}", emailAddress);
            return false;
        }

        String regexPattern = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
        boolean isValid = Pattern.compile(regexPattern).matcher(emailAddress).matches();

        if (!isValid) {
            logger.error("Invalid email format");
        }
        return isValid;
    }

    public boolean validateNames(User user) {
        if (user == null || user.getFirstName() == null || user.getLastName() == null) {
            logger.error("First name and last name cannot be null");
            return false;
        }
        if (user.getFirstName().isEmpty() || user.getLastName().isEmpty()) {
            logger.error("First name and last name cannot be empty");
            return false;
        }
        if (user.getFirstName().length() < 2 || user.getLastName().length() < 2) {
            logger.error("Invalid first name or last name");
            return false;
        }
        logger.info("Valid name");
        return true;
    }



    public boolean isvalidRole(String role) {
        if (role == null || role.isEmpty()) {
            logger.error("User role cannot be empty");
            return false;
        }

        for (UserRoles userrole : UserRoles.values()) {
            if (userrole.name().equalsIgnoreCase(role)) { // Case-insensitive match
                logger.info("Valid user role: {}", role);
                return true;
            }
        }

        logger.error("Role not found:{}", role);
        return false; // Return false if no role matches
    }

}
