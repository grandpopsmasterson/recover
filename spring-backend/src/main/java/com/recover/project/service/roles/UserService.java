package com.recover.project.service.roles;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.recover.project.dto.user.ShortUser;
import com.recover.project.mapper.UserMapper;
import com.recover.project.model.User;
import com.recover.project.repository.UserRepository;
import com.recover.project.utils.exceptions.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public User save(User user) {
        return userRepository.save(user);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    public List<ShortUser> getAvailableTechnicians() {
        return userRepository.findAvailableTechnicians()
            .stream()
            .map(userMapper::toShortDto)
            .collect(Collectors.toList());
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public ShortUser findById(Long userId) {
        return userRepository.findById(userId)
            .map(userMapper::toShortDto)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    public Optional<User> findByUsernameOrEmail(String username, String email) {
        return userRepository.findByUsernameOrEmail(username, email);
    }

    
}
