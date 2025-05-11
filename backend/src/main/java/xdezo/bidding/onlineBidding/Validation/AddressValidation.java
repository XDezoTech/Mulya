package xdezo.bidding.onlineBidding.Validation;


import org.springframework.stereotype.Component;
import xdezo.bidding.onlineBidding.Model.Address;
import xdezo.bidding.onlineBidding.Model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Component
public class AddressValidation {

    Logger logger = LoggerFactory.getLogger(AddressValidation.class);

    private Address address;

    public boolean validateAddress(User user){

        if(user.getAddress()==null){
    logger.error("Invalid address details");
    return false;

        }
        else{
            if(user.getAddress().getCity()==null || user.getAddress().getCity().isEmpty()||user.getAddress().getCity().length()<2){
                logger.error("Invalid city");
                return false;
            }
            else{
                if(user.getAddress().getCountry()==null || user.getAddress().getCountry().isEmpty()||user.getAddress().getCountry().length()<2){
                    logger.error("Invalid country");
                    return false;
                }
                else{

                    if(user.getAddress().getDistrict()==null || user.getAddress().getDistrict().isEmpty()||user.getAddress().getDistrict().length()<2){
                        logger.error("Invalid district");
                        return false;
                    }
                    else {
                        if(user.getAddress().getStreet()==null || user.getAddress().getStreet().isEmpty()||user.getAddress().getStreet().length()<2){
                            logger.error("Invalid street");
                            return false;
                        }
                        else{
                            logger.info( "Valid address");
                            return true;
                        }
                    }
                }
            }
        }
    }

}
