package xdezo.bidding.onlineBidding.WebSocket;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import xdezo.bidding.onlineBidding.Authentication.Services.JWTService;
import xdezo.bidding.onlineBidding.WebSocket.Interceptor.JwtAuthInterceptor;
import xdezo.bidding.onlineBidding.WebSocket.Interceptor.WebSocketHandlerInterceptor;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

    private  final JWTService jwtService;

    @Autowired
    private JwtAuthInterceptor jwtAuthInterceptor;

    WebSocketConfiguration(JWTService jwtService){
        this.jwtService = jwtService;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .addInterceptors(new WebSocketHandlerInterceptor(jwtService))
               ;

    }


    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        registry.enableSimpleBroker("/topic","/queue");
        registry.setApplicationDestinationPrefixes("/app");
        registry.setUserDestinationPrefix("/user");
    }

//
//    @Override
//    public void configureClientInboundChannel(ChannelRegistration registration) {
//        System.out.println("✅ Registering JWT Auth Interceptor for Inbound");
//        registration.interceptors(jwtAuthInterceptor);  // Register interceptor
//    }
//
//    @Override
//    public void configureClientOutboundChannel(ChannelRegistration registration) {
//        System.out.println("✅ Registering JWT Auth Interceptor for Outbound");
//        registration.interceptors(jwtAuthInterceptor);  // Register interceptor
//    }




}
