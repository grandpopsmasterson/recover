package com.recover.project.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import com.recover.project.model.BaseEntity;



// BaseRepository.java
@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity> extends JpaRepository<T, Long> {
    @Query("SELECT e FROM #{#entityName} e WHERE e.createdBy = :username")
    List<T> findByCreatedBy(@Param("username") String username);
}
