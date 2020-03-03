package com.azuris.profute.v1.service;

import com.azuris.profute.v1.repository.MacrocycleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MacrocycleService extends BaseService implements IMacrocycleService {

    @Autowired
    private MacrocycleRepository macrocycleRepository;

    @Override
    protected MacrocycleRepository getRepository() {
        return macrocycleRepository;
    }
}
