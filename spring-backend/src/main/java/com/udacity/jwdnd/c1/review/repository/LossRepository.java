package com.udacity.jwdnd.c1.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.udacity.jwdnd.c1.review.model.Loss;

public interface LossRepository extends JpaRepository<Loss, Long> {
    
}
