package com.azuris.profute.v1.repository;

import com.azuris.profute.v1.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TeamRepository extends JpaRepository<Team, Integer> {
    
}
