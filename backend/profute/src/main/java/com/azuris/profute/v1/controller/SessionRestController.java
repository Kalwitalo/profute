package com.azuris.profute.v1.controller;

import com.azuris.profute.v1.model.Session;
import com.azuris.profute.v1.model.Session;
import com.azuris.profute.v1.service.ISessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.io.Serializable;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("v1/sessions/")
public class SessionRestController {

    @Autowired
    private ISessionService sessionService;

    @GetMapping
    public ResponseEntity findAll() {
        List<Session> sessionList = sessionService.findAll();
        if (sessionList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(sessionList);
    }

    @GetMapping("/{id}")
    public ResponseEntity findBy(@PathVariable("id") Integer id) {
        Optional<Session> session = sessionService.findById(id);
        if (session.isPresent()) {
            return ResponseEntity.ok(session.get());
        }

        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Session session) {
        if (session == null) {
            return ResponseEntity.badRequest().build();
        }

        session = sessionService.save(session);

        return ResponseEntity.ok(session);
        
    }
    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") Integer id, @RequestBody Session session) {
        Optional<Session> sessionOptional = sessionService.findById(id);
        if (!sessionOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        session.setId(id);
        session = sessionService.save(session);

        return ResponseEntity.ok(session);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Integer id) {
        Optional<Session> sessionOptional = sessionService.findById(id);
        if (!sessionOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        sessionService.remove(sessionOptional.get());

        return ResponseEntity.ok().build();
    }
}
