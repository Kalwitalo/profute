package com.azuris.profute.v1.service;

import com.azuris.profute.v1.model.Team;
import com.azuris.profute.v1.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamService extends BaseService<Team> implements ITeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Override
    protected TeamRepository getRepository() {
        return teamRepository;
    }
}
