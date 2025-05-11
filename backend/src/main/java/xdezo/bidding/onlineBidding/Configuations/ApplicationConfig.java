package xdezo.bidding.onlineBidding.Configuations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;
import xdezo.bidding.onlineBidding.Authentication.Filters.JwtFilter;

import java.util.logging.Logger;

@Configuration
@EnableWebSecurity
public class ApplicationConfig {

    @Autowired
    private UserDetailsService userDetailService;

    @Autowired
    private JwtFilter jwtFilter;

    private final Logger logger = Logger.getLogger(ApplicationConfig.class.getName());

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        // public endpoints (including images)
                        .requestMatchers("/api/public/**", "/api/payment/**", "/ws/**", "/Images/**")
                        .permitAll()
                        // bidder endpoints
                        .requestMatchers("/api/bidder/**", "/app/mail/**")
                        .hasRole("BIDDER")
                        // seller endpoints
                        .requestMatchers("/api/seller/**")
                        .hasRole("SELLER")
                        // admin endpoints
                        .requestMatchers("/api/admin/**")
                        .hasRole("ADMIN")
                        // everything else needs auth
                        .anyRequest()
                        .authenticated()
                )
                // stateless session; no HTTP Basic popup
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        provider.setUserDetailsService(userDetailService);
        return provider;
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // Thymeleaf email template configuration
    @Bean
    public TemplateEngine emailTemplateEngine() {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(emailTemplateResolver());
        return templateEngine;
    }

    @Bean
    public ITemplateResolver emailTemplateResolver() {
        ClassLoaderTemplateResolver resolver = new ClassLoaderTemplateResolver();
        resolver.setPrefix("templates/");
        resolver.setSuffix(".html");
        resolver.setTemplateMode("HTML");
        resolver.setCharacterEncoding("UTF-8");
        resolver.setCacheable(false);
        return resolver;
    }
}
