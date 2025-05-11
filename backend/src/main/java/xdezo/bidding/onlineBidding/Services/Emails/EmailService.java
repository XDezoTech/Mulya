package xdezo.bidding.onlineBidding.Services.Emails;


import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import xdezo.bidding.onlineBidding.Utils.UserDetailHolder;

import java.util.Date;

@Slf4j
@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;


    @Autowired
    private TemplateEngine templateEngine;

    public String sendSimpleMail(){

        try{
            String to = UserDetailHolder.getUsername();

            Context context = new Context();
                context.setVariable("email",to);
                context.setVariable("date", new Date());


            String htmlContent = templateEngine.process("EmailTemplate",context);

            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);



            String subject = "This is subject";

            helper.setFrom("sudeepsubedi72@gmail.com");
            helper.setTo(to);
            helper.setText(htmlContent,true);
            helper.setSubject(subject);


            javaMailSender.send(message);
            return "success";
        }
        catch (Exception e){
            log.error("error in email service {}",e);
            return "failed";
        }
    }
}
