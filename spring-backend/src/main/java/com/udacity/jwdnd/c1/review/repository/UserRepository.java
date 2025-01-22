package com.udacity.jwdnd.c1.review.repository;

import com.udacity.jwdnd.c1.review.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);
}
