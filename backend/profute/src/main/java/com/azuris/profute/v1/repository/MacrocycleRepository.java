package com.azuris.profute.v1.repository;

import com.azuris.profute.v1.model.Macrocycle;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MacrocycleRepository extends JpaRepository<Macrocycle, Integer> {
    Macrocycle findFirstByGoals(String goals);
}
