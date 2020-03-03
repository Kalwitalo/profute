package com.azuris.profute.v1.service;

import com.azuris.profute.v1.model.Session;
import com.azuris.profute.v1.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionService extends BaseService<Session> implements ISessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Override
    protected SessionRepository getRepository() {
        return sessionRepository;
    }
}
