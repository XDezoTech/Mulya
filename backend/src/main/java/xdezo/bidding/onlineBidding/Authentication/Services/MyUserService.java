package xdezo.bidding.onlineBidding.Authentication.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import xdezo.bidding.onlineBidding.Model.User;
import xdezo.bidding.onlineBidding.Authentication.Principal.UserPrincipal;
import xdezo.bidding.onlineBidding.Repo.UserRepo;

@Service
public class MyUserService implements UserDetailsService {

    @Autowired
    UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       User user = userRepo.findByEmail(username).orElse(null);

        if(user==null){
            System.out.println("No username Found");
            throw new UsernameNotFoundException("No username Found");

        }
        else{
            return new UserPrincipal(user);
        }
    }
}
