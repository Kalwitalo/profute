package com.azuris.profute.v1.service;

import com.azuris.profute.v1.model.Activity;
import com.azuris.profute.v1.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityService extends BaseService<Activity> implements IActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    @Override
    protected ActivityRepository getRepository() {
        return activityRepository;
    }
}
