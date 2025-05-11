package xdezo.bidding.onlineBidding.Utils.Payment;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class SignatureGenerator {

    public static String generateSignature(String data, String secretKey) throws Exception {
        // Initialize the HMAC-SHA256 Mac instance with the secret key
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        mac.init(secretKeySpec);

        // Generate the HMAC hash
        byte[] rawHmac = mac.doFinal(data.getBytes("UTF-8"));

        // Return the base64 encoded result
        return Base64.getEncoder().encodeToString(rawHmac);
    }
}