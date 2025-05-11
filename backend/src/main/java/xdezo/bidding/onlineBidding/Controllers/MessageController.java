package xdezo.bidding.onlineBidding.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import xdezo.bidding.onlineBidding.Model.Message;

@RestController
public class MessageController {

    @Autowired
    private   SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/app/public")
    @SendTo("/topic/messages")
    public String sendMessage(@Payload String message) {
        System.out.println(" Received message: " + message);
        return "Server: " + message;
    }



    @MessageMapping("/private") // Client sends message to "/app/private-message"
    public void sendPrivateMessage(@Payload Message message) {
        String destination = "/user/" + message.getReceiver() + "/private/messages";
        messagingTemplate.convertAndSend(destination, message);
    }
}
