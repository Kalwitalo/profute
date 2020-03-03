package com.azuris.profute.v1.service;

import com.azuris.profute.v1.model.Macrocycle;

import java.util.List;
import java.util.Optional;

public interface IMacrocycleService {
    List<Macrocycle> findAll();
    Optional<Macrocycle> findById(Integer id);
}
