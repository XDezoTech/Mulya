package xdezo.bidding.onlineBidding.WebSocket.Interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import xdezo.bidding.onlineBidding.Authentication.Services.JWTService;

import java.util.List;

@Component
public class JwtAuthInterceptor implements ChannelInterceptor {

    @Autowired
    private JWTService jwtService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        System.out.println("🟢 Interceptor Triggered - Command: " + accessor.getCommand());

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            System.out.println("🔹 CONNECT frame received");

            String authHeader = accessor.getFirstNativeHeader("Authorization");
            System.out.println("🔹 Authorization Header: " + authHeader);

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String username = jwtService.getUsername(token);
                System.out.println("🔹 Extracted Username: " + username);

                if (jwtService.validateToken(token, username)) {
                    Authentication auth = new UsernamePasswordAuthenticationToken(
                            username, null, List.of(new SimpleGrantedAuthority("USER"))
                    );
                    accessor.setUser(auth);
                    System.out.println("✅ JWT Validation Successful for: " + username);
                } else {
                    System.out.println("❌ Invalid JWT Token");
                    throw new IllegalArgumentException("Invalid JWT Token");
                }
            } else {
                System.out.println("❌ Missing Authorization Header");
                throw new IllegalArgumentException("Missing Authorization Header");
            }
        }

        return message;
    }
}
