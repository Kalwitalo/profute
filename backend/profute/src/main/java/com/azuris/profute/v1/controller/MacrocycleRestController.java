package com.azuris.profute.v1.controller;

import com.azuris.profute.v1.model.Macrocycle;
import com.azuris.profute.v1.service.IMacrocycleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("v1/macrocycles/")
public class MacrocycleRestController {

    @Autowired
    private IMacrocycleService macrocycleService;

    @GetMapping
    public ResponseEntity findAll() {
        List<Macrocycle> macrocycleList = macrocycleService.findAll();
        if (macrocycleList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(macrocycleList);
    }
}
