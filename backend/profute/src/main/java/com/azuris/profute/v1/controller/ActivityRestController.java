package com.azuris.profute.v1.controller;

import com.azuris.profute.v1.model.Activity;
import com.azuris.profute.v1.service.IActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("v1/activities/")
public class ActivityRestController {

    @Autowired
    private IActivityService activityService;

    @GetMapping
    public ResponseEntity findAll() {
        List<Activity> activityList = activityService.findAll();
        if (activityList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(activityList);
    }

    @GetMapping("/{id}")
    public ResponseEntity findBy(@PathVariable("id") Integer id) {
        Optional<Activity> activity = activityService.findById(id);
        if (activity.isPresent()) {
            return ResponseEntity.ok(activity.get());
        }

        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Activity activity) {
        if (activity == null) {
            return ResponseEntity.badRequest().build();
        }

        activity = activityService.save(activity);

        return ResponseEntity.ok(activity);
        
    }
    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") Integer id, @RequestBody Activity activity) {
        Optional<Activity> activityOptional = activityService.findById(id);
        if (!activityOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        activity.setId(id);
        activity = activityService.save(activity);

        return ResponseEntity.ok(activity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Integer id) {
        Optional<Activity> activityOptional = activityService.findById(id);
        if (!activityOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        activityService.remove(activityOptional.get());

        return ResponseEntity.ok().build();
    }
}
