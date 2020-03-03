package com.azuris.profute.v1.controller;

import com.azuris.profute.v1.model.Team;
import com.azuris.profute.v1.service.ITeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("v1/teams/")
public class TeamRestController {

    @Autowired
    private ITeamService teamService;

    @GetMapping
    public ResponseEntity findAll() {
        List<Team> teamList = teamService.findAll();
        if (teamList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(teamList);
    }

    @GetMapping("/{id}")
    public ResponseEntity findBy(@PathVariable("id") Integer id) {
        Optional<Team> team = teamService.findById(id);
        if (team.isPresent()) {
            return ResponseEntity.ok(team.get());
        }

        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Team team) {
        if (team == null) {
            return ResponseEntity.badRequest().build();
        }

        team = teamService.save(team);

        return ResponseEntity.ok(team);
        
    }
    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") Integer id, @RequestBody Team team) {
        Optional<Team> teamOptional = teamService.findById(id);
        if (!teamOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        team.setId(id);
        team = teamService.save(team);

        return ResponseEntity.ok(team);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Integer id) {
        Optional<Team> teamOptional = teamService.findById(id);
        if (!teamOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        teamService.remove(teamOptional.get());

        return ResponseEntity.ok().build();
    }
}
