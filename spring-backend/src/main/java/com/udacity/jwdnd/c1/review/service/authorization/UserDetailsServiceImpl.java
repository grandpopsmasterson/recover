package com.udacity.jwdnd.c1.review.service.authorization;

import com.udacity.jwdnd.c1.review.model.User;
import com.udacity.jwdnd.c1.review.repository.UserRepository;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {


    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userOrEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(userOrEmail, userOrEmail)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return UserDetailsImpl.build(user);
    }

}