package com.azuris.profute.v1.repository;

import com.azuris.profute.v1.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SessionRepository extends JpaRepository<Session, Integer> {
    
}
