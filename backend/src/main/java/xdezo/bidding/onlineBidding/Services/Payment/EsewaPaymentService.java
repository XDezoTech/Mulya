package xdezo.bidding.onlineBidding.Services.Payment;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import lombok.extern.slf4j.Slf4j;
import xdezo.bidding.onlineBidding.Model.Payment.PaymentsInfo;
import xdezo.bidding.onlineBidding.Utils.Payment.SignatureGenerator;

import java.util.UUID;

@Slf4j
@Service
public class EsewaPaymentService {

    private final RestTemplate restTemplate;

    @Value("${esewa.submissionUrl}")
    private String url;


    @Value("${esewa.success_url}")
    private String successUrl;

    @Value("${esewa.failure_url}")
    private String failedUrl;

    @Value("${esewa.secretKey}")
    private String secretKey;


    public EsewaPaymentService(RestTemplate restTemplate) {

        this.restTemplate = restTemplate;
    }

    public ResponseEntity<String> initiateEsewaPayment(@Valid PaymentsInfo paymentsInfo) throws Exception {

        String totalAmount = String.valueOf(paymentsInfo.getTotalAmount());
       String transactionUUID = UUID.randomUUID().toString(); // Generate unique transaction ID
        String productCode = "EPAYTEST";

        String signedData = "total_amount=" + totalAmount +
                ",transaction_uuid=" + transactionUUID +
                ",product_code=" + productCode;

        signedData = signedData.trim();

        System.out.println("transaction id is "+transactionUUID);

// Generate the signature
        String signature = SignatureGenerator.generateSignature(signedData, secretKey);
        System.out.println("Generated Signature: " + signature);

        // Log for debugging
        System.out.println("Final Signed Data: " + signedData);

        log.info("Signed Data: {}", signedData);
        log.info("Generated Signature: {}", signature);

        // Create request body
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("amount",String.valueOf(paymentsInfo.getAmount()));
        body.add("tax_amount", String.valueOf(paymentsInfo.getTaxAmount()));
        body.add("total_amount", String.valueOf(paymentsInfo.getTotalAmount()));
        body.add("transaction_uuid", transactionUUID);
        body.add("product_code", productCode);
        body.add("product_service_charge", String.valueOf(paymentsInfo.getServiceCharge()));
        body.add("product_delivery_charge", String.valueOf(paymentsInfo.getDeliveryCharge()));
        body.add("success_url", successUrl);
        body.add("failure_url", failedUrl);
        body.add("signed_field_names", "total_amount,transaction_uuid,product_code");
        body.add("signature", signature);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Log the request
        log.info("Sending request to eSewa: {}", url);
        log.info("Request Body: {}", body);

        // Create HTTP request
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);


        try {
            // Send the request to eSewa
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

            if (response.getStatusCode() == HttpStatus.FOUND) {
                String redirectUrl = response.getHeaders().getLocation().toString();
                log.info("Redirecting to: {}", redirectUrl);

                // You can perform any further logic or forward the URL to the frontend
                return ResponseEntity.ok( redirectUrl);
            } else {
                log.error("Error in payment initiation: {}", response.getBody());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment initiation failed");
            }

        } catch (Exception e) {
            log.error("Error while calling eSewa: ", e);
            throw e;
        }

    }

    public ResponseEntity<String> SuccessPayment(){


        return null;
    }
}
