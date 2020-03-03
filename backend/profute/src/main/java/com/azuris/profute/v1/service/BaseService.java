package com.azuris.profute.v1.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

@Service
public abstract class BaseService<T extends Serializable> implements IBaseService<T> {

    protected abstract JpaRepository<T, Integer> getRepository();

    @Transactional
    public Optional<T> findById(Integer id) {
        return getRepository().findById(id);
    }

    @Transactional
    public List<T> findAll(){
        return getRepository().findAll();
    }

    @Transactional
    public Page<T> findAllPaginated(int page, int size) {
        return getRepository().findAll(PageRequest.of(page, size));
    }

    public T save(T t){
        return getRepository().save(t);
    }

    @Transactional
    public void remove(T t) {
        getRepository().delete(t);
    }

    public Long count() {
        return getRepository().count();
    }

}
