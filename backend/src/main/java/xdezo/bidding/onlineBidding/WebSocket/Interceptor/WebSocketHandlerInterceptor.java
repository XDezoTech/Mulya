package xdezo.bidding.onlineBidding.WebSocket.Interceptor;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import xdezo.bidding.onlineBidding.Authentication.Services.JWTService;

import java.util.Map;

public class WebSocketHandlerInterceptor implements HandshakeInterceptor {


    private final JWTService jwtService;

    public WebSocketHandlerInterceptor(JWTService jwtService){
        this.jwtService = jwtService;
    }
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {

        if (request instanceof ServletServerHttpRequest) {
            HttpServletRequest servletRequest = ((ServletServerHttpRequest) request).getServletRequest();
            String token = servletRequest.getHeader("token");

            System.out.println(token);

            String username = jwtService.getUsername(token);
            System.out.println("Username from websocket handler interceptor  is"+username);

            if(jwtService.validateToken(token,username)) {
                attributes.put("user", username);
                System.out.println("success");
                return true;
            }
            return false;
        }
        return false;

    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}
