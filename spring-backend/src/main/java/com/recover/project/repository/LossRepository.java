package com.recover.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recover.project.model.Loss;

public interface LossRepository extends JpaRepository<Loss, Long> {
    
}
