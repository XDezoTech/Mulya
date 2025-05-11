package xdezo.bidding.onlineBidding.Authentication.Filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import xdezo.bidding.onlineBidding.Authentication.Services.JWTService;
import xdezo.bidding.onlineBidding.Authentication.Services.MyUserService;
import xdezo.bidding.onlineBidding.Utils.UserDetailHolder;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private MyUserService userDetailsService;

    private String userName;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if(authHeader != null && authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7);
            username = jwtService.getUsername(token);
        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){


            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtService.validateToken(token, userDetails.getUsername())) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);

                UserDetailHolder.setUsername(username);
            }
            else{
                System.out.println("session expired");
                response.setContentType("text/plain");
                response.getWriter().write("Session expired");
                response.setStatus(401);
            }
        }

        filterChain.doFilter(request, response);
        UserDetailHolder.clear();
            }
}
