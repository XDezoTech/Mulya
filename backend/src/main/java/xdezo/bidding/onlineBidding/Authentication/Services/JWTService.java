package xdezo.bidding.onlineBidding.Authentication.Services;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import xdezo.bidding.onlineBidding.Model.User;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Slf4j
@Service
public class JWTService {

    @Value("${SecretKey}")
    private String secretKeyString;

    private static SecretKey secret;
    private JwtParser jwtParser;

    @PostConstruct
    public void init() {
        byte[] keyBytes = Base64.getDecoder().decode(secretKeyString);
        secret = Keys.hmacShaKeyFor(keyBytes);
        jwtParser = Jwts.parser().verifyWith(secret).build();
    }

    public static String generateJWT(User user) {

        return Jwts.builder()
                .subject(user.getEmail())
                .issuer("Online Bidding System")
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+1000*60*60*24))//for 1 day
                .signWith(secret)
                .compact();
    }

    public String getUsername(String token) {
        try {
            return jwtParser.parseClaimsJws(token)  // FIXED: Changed from parseClaimsJwt to parseClaimsJws
                    .getBody().getSubject();
        } catch (Exception e) {
            log.error("Error while parsing username from JWT Token", e);
            return null;
        }
    }

    public Date getExpirationTime(String token) {
        try {
            return jwtParser.parseClaimsJws(token)  // FIXED
                    .getBody().getExpiration();
        } catch (Exception e) {
            log.error("Error while parsing expiration time from JWT Token", e);
            return null;
        }
    }

    public boolean validateToken(String token, String username) {
        try {
            Jws<Claims> claims = jwtParser.parseSignedClaims(token);
            return username.equals(claims.getPayload().getSubject()) && !isTokenExpired(token);
        } catch (Exception e) {
            return false; // Invalid token
        }
    }

    private boolean isTokenExpired(String token) {
        return jwtParser.parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }
}
