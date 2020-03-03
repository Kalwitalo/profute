package com.azuris.profute.v1.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface IBaseService<T> {

    Optional<T> findById(Integer id);

    List<T> findAll();

    Page<T> findAllPaginated(int page, int size);

    T save(T t);

    void remove(T t);

    Long count();

}
