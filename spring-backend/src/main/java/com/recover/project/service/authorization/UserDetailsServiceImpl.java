package com.recover.project.service.authorization;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.recover.project.model.User;
import com.recover.project.repository.UserRepository;

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