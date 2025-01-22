package com.udacity.jwdnd.c1.review.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.udacity.jwdnd.c1.review.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findTop10ByRecipientUsernameOrderByTimestampDesc(String username);
    List<Notification> findByRecipientUsernameOrderByTimestampDesc(String username, Pageable pageable);
    long countByRecipientUsernameAndReadFalse(String username);
}

